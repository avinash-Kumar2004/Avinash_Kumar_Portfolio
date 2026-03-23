import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import Navbar from "./components/Navbar";
import PageLayout from "./components/PageLayout";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experienceing";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import BlogPost from "./Blog/BlogData";
import ScrollToTop from "./components/ScrollToTop";

/* ── Dark Mode Context ── */
export const ThemeContext = createContext(null);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function App() {
  const [dark, setDark] = useState(() => {
    try { return localStorage.getItem("ak-theme") === "dark"; }
    catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem("ak-theme", dark ? "dark" : "light"); } catch {}
    if (dark) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [dark]);

  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <BrowserRouter>
       <ScrollToTop />
        {/* Navbar fixed rehta hai — hamesha upar */}
        <Navbar />
        <Routes>
          {/* Home — Hero.jsx mein pt-[64px] pehle se hai */}
          <Route path="/" element={<Home />} />

          {/* Baaki pages — PageLayout se wrap karo */}
          <Route path="/about" element={
            <PageLayout><About /></PageLayout>
          } />
          <Route path="/experience" element={
            <PageLayout><Experience /></PageLayout>
          } />
          <Route path="/projects" element={
            <PageLayout><Projects /></PageLayout>
          } />
          <Route path="/skills" element={
            <PageLayout><Skills /></PageLayout>
          } />
          <Route path="/blog" element={
            <PageLayout><Blog /></PageLayout>
          } />
          <Route path="/contact" element={
            <PageLayout><Contact /></PageLayout>
          } />
          <Route path="/blog/:slug" element={
  <PageLayout><BlogPost /></PageLayout>
} />
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}