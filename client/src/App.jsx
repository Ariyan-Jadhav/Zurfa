import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitle from "./pages/BlogTitle";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RePexel from "./pages/RePexel";
import Docs from "./pages/Docs";
import ReviewResume from "./pages/ReviewResume";
import CodeOpt from "./pages/CodeOpt";
import { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="docs" element={<Docs />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitle />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RePexel />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="code" element={<CodeOpt />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
