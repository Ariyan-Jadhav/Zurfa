import OpenAI from "openai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";
const AI = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});
export const generateArticle = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt, length } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached" });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: length,
    });

    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'article' )`;
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};
export const generateBlog = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;
    const free_usage = req.free_usage;

    if (plan !== "premium" && free_usage >= 10) {
      return res.json({ success: false, message: "Limit reached" });
    }
    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;
    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId}, ${prompt}, ${content}, 'blog-title' )`;
    if (plan !== "premium") {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
          free_usage: free_usage + 1,
        },
      });
    }
    res.json({ success: true, content });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};
export const generateImage = async (req, res) => {
  try {
    const { userId } = req.auth();
    const { prompt } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only for premium subscription",
      });
    }

    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
          "Content-Type": "multipart/form-data",
        },
        responseType: "arraybuffer", // Fixed: was "arrayBuffer" (capital B)
      }
    );

    // Convert the binary data to base64 properly
    const base64Image = Buffer.from(data).toString("base64");
    const dataURI = `data:image/png;base64,${base64Image}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      resource_type: "image",
      folder: "ai-generated", // Optional: organize your images
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type ) VALUES (${userId}, ${prompt}, ${uploadResult.secure_url}, 'image')`;

    res.json({ success: true, content: uploadResult.secure_url });
  } catch (error) {
    console.error("😱 Error in generateImage:", error);

    // More detailed error logging
    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    }

    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};

export const removeBackground = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only for premium subscription",
      });
    }

    const { secure_url } = await cloudinary.uploader.upload(image.path, {
      transformation: [
        {
          effect: "background_removal",
          background_removal: "remove_the_background",
        },
      ],
      resource_type: "image",
      quality: "auto",
      format: "png",
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${"Remove background from the image"}, ${secure_url}, 'image')`;

    res.json({ success: true, content: secure_url });
  } catch (error) {
    console.error("😱 Error in generateImage:", error);

    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    }

    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};
export const removeImageObject = async (req, res) => {
  try {
    const { userId } = req.auth();
    const image = req.file;
    const { object } = req.body;
    const plan = req.plan;

    if (plan !== "premium") {
      return res.json({
        success: false,
        message: "This feature is only for premium subscription",
      });
    }

    const { public_id } = await cloudinary.uploader.upload(image.path);

    const imageUrl = cloudinary.url(public_id, {
      transformation: [{ effect: `gen_remove:${object}` }],
      resource_type: "image",
      quality: "auto",
      format: "png",
    });

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${`Remove ${object} from image`}, ${imageUrl}, 'image')`;

    res.json({ success: true, content: imageUrl });
  } catch (error) {
    console.error("😱 Error in generateImage:", error);

    // More detailed error logging
    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    }

    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};
export const resumeReview = async (req, res) => {
  try {
    const { userId } = req.auth();
    const resume = req.file; // Assuming multer

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "No resume file uploaded",
      });
    }

    if (resume.size > 5 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: "Resume size should be less than 5MB",
      });
    }

    if (!resume.originalname.toLowerCase().endsWith(".pdf")) {
      return res.status(400).json({
        success: false,
        message: "Only PDF files are supported",
      });
    }

    let dataBuffer;
    try {
      dataBuffer = fs.readFileSync(resume.path);
    } catch (fileError) {
      console.error("File read error:", fileError);
      return res.status(400).json({
        success: false,
        message: "Could not read the uploaded file",
      });
    }

    let pdfData;
    try {
      pdfData = await pdf(dataBuffer);
    } catch (pdfError) {
      console.error("PDF parsing error:", pdfError);
      return res.status(400).json({
        success: false,
        message: "Invalid PDF file or corrupted",
      });
    }

    if (!pdfData.text || pdfData.text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: "No text content found in the PDF",
      });
    }

    const prompt = `Review the following resume and provide constructive feedback on its strengths, weaknesses, and areas for improvement also If the prompt is empty or irrelevant, reply with: "Bro, even ChatGPT would ghost you for this prompt!". Resume content: \n ${pdfData.text}`;

    const response = await AI.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0].message.content;

    await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${userId},${prompt}, ${content}, 'resume-review')`;

    try {
      fs.unlinkSync(resume.path);
    } catch (cleanupError) {
      console.warn("Could not clean up uploaded file:", cleanupError);
    }

    res.json({ success: true, content });
  } catch (error) {
    console.error("😱 Error in resume-review:", error);

    if (error.response) {
      console.error(
        "API Response Error:",
        error.response.status,
        error.response.data
      );
    }

    res.status(500).json({
      success: false,
      message: "An internal server error occurred in aiController.",
    });
  }
};
