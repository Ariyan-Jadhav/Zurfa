import React from "react";
import { Link } from "react-router-dom";

function Docs() {
  const features = [
    {
      title: "Pixel Flex (Premium)",
      description:
        "Generates high-quality images from textual prompts using advanced AI models. Supports multiple styles (realistic, ghibli, anime, 3D), aspect ratios, seeds, and negative prompts. You can control output size, number of variations, and the level of creativity. Ideal for concept art, hero images, and quick mockups. Exports: PNG/WebP/JPEG. (Premium subscription required for full-resolution and commercial license.)",
    },
    {
      title: "Pixel Purify (Premium)",
      description:
        "Removes backgrounds and unwanted objects from images automatically while preserving edges, hair details and natural shadows. Offers quick auto-masking plus an optional manual mask upload for fine-grained control. Outputs include transparent PNGs and smart crops. Great for product shots, profile photos, or preparing assets for design. (Premium subscription unlocks batch processing and higher-quality edge refinement.)",
    },
    {
      title: "RePixel (Coming Soon) (Premium)",
      description:
        "Upscales, regenerates, and expands images to enhance and enlarge them without losing quality. Features face-aware upscaling, content-aware outpainting (uncropping / canvas expansion), and targeted inpainting to regenerate regions of an image. Choose 2× / 4× upscales, preserve texture, and optionally supply reference images for style matching. (Planned as a premium capability—high-res exports reserved for subscribers.)",
    },
    {
      title: "Loop Daddy",
      description:
        "Creates and optimizes code in any programming language to accelerate development. Generates idiomatic implementations, refactors snippets for readability and performance, and can produce unit-test-ready code. Supports language selection, desired complexity level, and optional commentary/explanations. Perfect for prototyping, refactoring, and learning patterns quickly.",
    },
    {
      title: "Type Lord",
      description:
        "Writes articles and long-form content with user-controlled word count and tone. Options include formal / casual / technical / marketing tones, SEO optimization hints, and keyword seeding. Use it to generate blog drafts, landing page copy, or social posts — with a built-in consistency check to keep voice uniform across multiple pieces.",
    },
    {
      title: "CV Doctor",
      description:
        "Reviews resumes (.pdf uploads) and returns structured feedback on strengths, weaknesses, and improvement areas. Features include: ATS-compatibility scoring, bullet-by-bullet phrasing suggestions, action-verb improvements, layout & readability tips, and an overall impact score. Also provides suggested role-specific keywords to boost visibility for automated screenings.",
    },
    {
      title: "Head Liner",
      description:
        "Generates lists of blog titles tailored to the selected category, audience, and tone. Produce dozens of headline ideas ranked by clickability and relevance, with variants for SEO-optimized or social-friendly formats. Useful for brainstorming content calendars and A/B testing title options.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Midnight Mist */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 60%),
            radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
            radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)
          `,
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-white font-sans d-font">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-block text-indigo-300 hover:text-indigo-100 font-medium"
          >
            &larr; Back to Home
          </Link>
        </div>

        <header className="mb-12 w-full items-center flex flex-col justify-center text-center">
          <div>
            <img src="/logo.png" className="h-[70px] " />
          </div>
          <p className="text-lg text-indigo-200 max-w-2xl mx-auto">
            Discover the powerful AI features of ZURFA designed to elevate your
            productivity and creativity.
          </p>
        </header>

        <main>
          <section className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className=" bg-[rgb(255,255,255,0.2)] bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <h2 className="text-2xl font-semibold text-white mb-3">
                  {feature.title}
                </h2>
                <p className="text-indigo-100 leading-relaxed">
                  {feature.description}
                </p>
              </article>
            ))}
          </section>
        </main>

        <footer className="mt-16 border-t border-white border-opacity-20 pt-8 text-center text-indigo-200 text-sm">
          &copy; {new Date().getFullYear()} ZURFA AI. Developed by OMJ.
        </footer>
      </div>
    </div>
  );
}

export default Docs;
