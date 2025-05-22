import { Inter, Merriweather } from "next/font/google"

// Optimize Inter font
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "sans-serif"],
})

// Optimize Merriweather font
export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  preload: true,
  variable: "--font-merriweather",
  fallback: ["Georgia", "serif"],
})

// Font loading status check
export function checkFontLoading() {
  if (typeof document !== "undefined") {
    // Add a class to the document when fonts are loaded
    document.fonts.ready.then(() => {
      document.documentElement.classList.add("fonts-loaded")
    })
  }
}
