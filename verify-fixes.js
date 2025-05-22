// Verify that all fixes have been implemented
console.log("🔍 Verifying fixes implementation...")

const fs = require("fs")
const path = require("path")

// Files that should exist after our fixes
const requiredFiles = [
  "lib/env.ts",
  "lib/image-utils.ts",
  "components/responsive-image.tsx",
  "lib/lazy-loading.ts",
  "DEPLOYMENT.md",
  "components/skip-link.tsx",
  "lib/a11y-checker.ts",
]

// Check if files exist
console.log("\n📁 Checking for required files...")
const missingFiles = []

requiredFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file)
  }
})

if (missingFiles.length === 0) {
  console.log("✅ All required files exist")
} else {
  console.error("❌ Missing files:", missingFiles.join(", "))
}

// Check for environment variable handling
console.log("\n🔧 Checking for environment variable handling...")
const apiFile = path.join(process.cwd(), "app/api/contact/route.ts")

if (fs.existsSync(apiFile)) {
  const apiContent = fs.readFileSync(apiFile, "utf8")

  if (apiContent.includes('getEnv("RESEND_API_KEY")')) {
    console.log("✅ API route is using environment utility")
  } else {
    console.warn("⚠️ API route may not be using environment utility")
  }

  if (apiContent.includes("try {") && apiContent.includes("catch (emailError)")) {
    console.log("✅ API route has proper error handling")
  } else {
    console.warn("⚠️ API route may not have proper error handling")
  }
} else {
  console.error("❌ API route file not found")
}

// Check for image alt text
console.log("\n🖼️ Checking for image alt text...")
const imageFiles = [
  "components/testimonial-section.tsx",
  "components/founder-bio.tsx",
  "components/differentiation-section.tsx",
]

let altTextIssues = 0

imageFiles.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, "utf8")

    if (content.includes("alt={") && !content.includes('alt=""')) {
      console.log(`✅ ${file} has proper alt text`)
    } else {
      console.warn(`⚠️ ${file} may not have proper alt text`)
      altTextIssues++
    }
  }
})

if (altTextIssues === 0) {
  console.log("✅ All checked image components have proper alt text")
}

// Check for dark mode contrast fixes
console.log("\n🌙 Checking for dark mode contrast fixes...")
const cssFile = path.join(process.cwd(), "app/globals.css")

if (fs.existsSync(cssFile)) {
  const cssContent = fs.readFileSync(cssFile, "utf8")

  if (cssContent.includes("--muted-foreground: 0 0% 73.9%")) {
    console.log("✅ Dark mode contrast has been improved")
  } else {
    console.warn("⚠️ Dark mode contrast may not have been improved")
  }
} else {
  console.error("❌ CSS file not found")
}

console.log("\n✅ Verification complete!")
