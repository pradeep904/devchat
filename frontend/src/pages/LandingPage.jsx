import { Link } from "react-router-dom";
import {
  Sparkles,
  Github,
  Shield,
  History,
  ArrowRight,
  Bot,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Chat",
    description: "Get intelligent responses powered by Google Gemini API",
  },
  {
    icon: Shield,
    title: "VS Code Dark Theme",
    description: "Familiar dark mode interface like your favorite editor",
  },
  {
    icon: History,
    title: "Chat History",
    description: "Save and manage your conversations locally",
  },
];

export function LandingPage() {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? "bg-[#1e1e1e]" : "bg-gray-50"}`}>
      {/* Navbar */}
      <nav
        className={`
        border-b
        ${isDark ? "border-[#3e3e42] bg-[#1e1e1e]" : "border-gray-200 bg-white"}
      `}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#14b8a6] rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <span
              className={`text-xl font-bold ${isDark ? "text-[#cccccc]" : "text-gray-800"}`}
            >
              DevChat AI
            </span>
          </div>
          <Link
            to="/chat"
            className={`
              px-4 py-2 rounded-lg font-medium transition-colors duration-200
              ${
                isDark
                  ? "bg-[#14b8a6] hover:bg-[#0d9488] text-white"
                  : "bg-teal-500 hover:bg-teal-600 text-white"
              }
            `}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div
            className={`
            inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6
            ${isDark ? "bg-[#2d2d30]" : "bg-teal-50"}
          `}
          >
            <Sparkles
              className={`w-4 h-4 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
            />
            <span
              className={`text-sm font-medium ${isDark ? "text-[#cccccc]" : "text-gray-600"}`}
            >
              Powered by Google Gemini
            </span>
          </div>

          <h1
            className={`
            text-4xl md:text-6xl font-bold mb-6
            ${isDark ? "text-[#cccccc]" : "text-gray-800"}
          `}
          >
            Your AI Coding
            <br />
            <span className="text-[#14b8a6]">Assistant</span>
          </h1>

          <p
            className={`
            text-lg md:text-xl mb-8 max-w-2xl mx-auto
            ${isDark ? "text-[#858585]" : "text-gray-500"}
          `}
          >
            Get help with coding, debugging, and learning new technologies.
            Built with React and designed to feel like home.
          </p>

          <Link
            to="/chat"
            className={`
              inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg
              transition-all duration-200
              ${
                isDark
                  ? "bg-[#14b8a6] hover:bg-[#0d9488] text-white hover:scale-105"
                  : "bg-teal-500 hover:bg-teal-600 text-white hover:scale-105"
              }
            `}
          >
            Start Chatting
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2
            className={`
            text-3xl font-bold text-center mb-4
            ${isDark ? "text-[#cccccc]" : "text-gray-800"}
          `}
          >
            Features
          </h2>
          <p
            className={`
            text-center mb-12 max-w-xl mx-auto
            ${isDark ? "text-[#858585]" : "text-gray-500"}
          `}
          >
            Everything you need for a great coding assistant experience
          </p>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-2xl border
                  transition-all duration-300
                  ${
                    isDark
                      ? "bg-[#2d2d30] border-[#3e3e42] hover:border-[#14b8a6]"
                      : "bg-white border-gray-200 hover:border-teal-400 hover:shadow-lg"
                  }
                `}
              >
                <div
                  className={`
                  w-12 h-12 rounded-xl flex items-center justify-center mb-4
                  ${isDark ? "bg-[#1e1e1e]" : "bg-teal-50"}
                `}
                >
                  <feature.icon
                    className={`w-6 h-6 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
                  />
                </div>
                <h3
                  className={`text-xl font-semibold mb-2 ${isDark ? "text-[#cccccc]" : "text-gray-800"}`}
                >
                  {feature.title}
                </h3>
                <p className={isDark ? "text-[#858585]" : "text-gray-500"}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`
        border-t py-8 px-4
        ${isDark ? "border-[#3e3e42]" : "border-gray-200"}
      `}
      >
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Bot
              className={`w-5 h-5 ${isDark ? "text-[#4ec9b0]" : "text-teal-500"}`}
            />
            <span
              className={`font-medium ${isDark ? "text-[#cccccc]" : "text-gray-700"}`}
            >
              DevChat AI
            </span>
          </div>
          <div
            className={`text-sm ${isDark ? "text-[#858585]" : "text-gray-500"}`}
          >
            Built with React + Vite + Tailwind CSS
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={
                isDark
                  ? "text-[#858585] hover:text-[#cccccc]"
                  : "text-gray-400 hover:text-gray-600"
              }
            >
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
