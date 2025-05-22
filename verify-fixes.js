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

// Check that all images in components/ have descriptive alt text
console.log("\n🖼️ Checking for image alt text in components...")

function getComponentFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...getComponentFiles(fullPath))
    } else if (entry.isFile() && fullPath.match(/\.tsx?$/)) {
      files.push(fullPath)
    }
  }
  return files
}

const componentDir = path.join(process.cwd(), "components")
const componentFiles = getComponentFiles(componentDir)

let altTextIssues = []

componentFiles.forEach((file) => {
  const content = fs.readFileSync(file, "utf8")
  const lines = content.split(/\r?\n/)

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.includes("<Image") || line.includes("<img")) {
      let tag = line
      let j = i
      while (!tag.includes(">") && j + 1 < lines.length) {
        j++
        tag += lines[j]
      }

      const hasAltAttribute = /\balt\s*=\s*("[^"]+"|'[^']+'|\{[^}]+\})/i.test(tag)
      const hasImageProps = /\{\s*\.\.\.\s*imageProps\s*\}/.test(tag)
      const hasAlt = hasAltAttribute || hasImageProps
      const emptyAlt = /\balt\s*=\s*(""|'')/i.test(tag)

      if (!hasAlt || emptyAlt) {
        altTextIssues.push(`${path.relative(process.cwd(), file)}:${i + 1}`)
      }

      i = j
    }
  }
})

if (altTextIssues.length === 0) {
  console.log("✅ All component images have descriptive alt text")
} else {
  console.error("❌ Images missing descriptive alt text:")
  altTextIssues.forEach((issue) => console.error(`  - ${issue}`))
  process.exitCode = 1
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
