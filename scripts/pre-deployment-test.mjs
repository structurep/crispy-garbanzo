import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = path.join(__dirname, "..")

console.log("🔍 Running pre-deployment tests...")

// Test 1: Check for required environment variables
console.log("\n📋 Checking environment variables...")
const requiredEnvVars = ["RESEND_API_KEY"]
const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar])

if (missingEnvVars.length > 0) {
  console.warn(`⚠️  Missing environment variables: ${missingEnvVars.join(", ")}`)
  console.warn("These will need to be set in your deployment environment.")
} else {
  console.log("✅ All required environment variables are set.")
}

// Test 2: Check for package.json and required dependencies
console.log("\n📦 Checking package.json and dependencies...")
try {
  const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, "package.json"), "utf8"))

  const requiredDeps = ["next", "react", "react-dom", "framer-motion", "lucide-react", "resend"]

  const missingDeps = requiredDeps.filter((dep) => !packageJson.dependencies[dep])

  if (missingDeps.length > 0) {
    console.error(`❌ Missing required dependencies: ${missingDeps.join(", ")}`)
  } else {
    console.log("✅ All required dependencies are present.")
  }
} catch (error) {
  console.error("❌ Error reading package.json:", error.message)
}

// Test 3: Check for required configuration files
console.log("\n🔧 Checking configuration files...")
const requiredConfigFiles = ["next.config.mjs", "tailwind.config.ts", "tsconfig.json"]

const missingConfigFiles = requiredConfigFiles.filter((file) => !fs.existsSync(path.join(rootDir, file)))

if (missingConfigFiles.length > 0) {
  console.error(`❌ Missing configuration files: ${missingConfigFiles.join(", ")}`)
} else {
  console.log("✅ All required configuration files are present.")
}

// Test 4: Check for required app directories and files
console.log("\n📁 Checking required app directories and files...")
const requiredAppFiles = ["app/layout.tsx", "app/page.tsx", "app/globals.css"]

const missingAppFiles = requiredAppFiles.filter((file) => !fs.existsSync(path.join(rootDir, file)))

if (missingAppFiles.length > 0) {
  console.error(`❌ Missing required app files: ${missingAppFiles.join(", ")}`)
} else {
  console.log("✅ All required app files are present.")
}

// Test 5: Check for component imports in page.tsx
console.log("\n🧩 Validating component imports in page.tsx...")
try {
  const pageContent = fs.readFileSync(path.join(rootDir, "app/page.tsx"), "utf8")

  const componentImports = [
    "Layout",
    "ServicesSection",
    "DifferentiationSection",
    "ClientArchetypes",
    "AffiliationsSection",
    "FounderBio",
    "CTASection",
    "StickyCTA",
    "VideoHero",
    "TestimonialSection",
    "ProcessTimeline",
  ]

  const missingImports = componentImports.filter((component) => !pageContent.includes(`import ${component} from`))

  if (missingImports.length > 0) {
    console.warn(`⚠️  Potentially missing component imports in page.tsx: ${missingImports.join(", ")}`)
  } else {
    console.log("✅ All expected component imports found in page.tsx.")
  }
} catch (error) {
  console.error("❌ Error reading app/page.tsx:", error.message)
}

// Test 6: Check for image files referenced in components
console.log("\n🖼️  Checking for referenced image files...")
const imageReferences = [
  "/images/structured-partners-logo.svg",
  "/images/operator-experience.png",
  "/images/og-image.png",
]

// This is a simplified check - in a real scenario, you'd parse components to find all image references
const publicImagesDir = path.join(rootDir, "public")
const missingImages = imageReferences.filter((image) => {
  const imagePath = image.startsWith("/") ? image.substring(1) : image
  return !fs.existsSync(path.join(publicImagesDir, imagePath))
})

if (missingImages.length > 0) {
  console.warn(`⚠️  Potentially missing image files: ${missingImages.join(", ")}`)
} else {
  console.log("✅ All referenced image files found.")
}

// Test 7: Check for API routes
console.log("\n🔌 Checking API routes...")
const apiDir = path.join(rootDir, "app/api")
if (!fs.existsSync(apiDir)) {
  console.warn("⚠️  No API directory found. If your app uses API routes, this might be an issue.")
} else {
  console.log("✅ API directory exists.")

  // Check contact form API route
  const contactApiDir = path.join(apiDir, "contact")
  if (!fs.existsSync(contactApiDir)) {
    console.warn("⚠️  No contact API route found. Form submissions might not work.")
  } else {
    console.log("✅ Contact API route exists.")
  }
}

// Test 8: Check for potential deployment issues in next.config.mjs
console.log("\n⚙️  Checking next.config.mjs for potential deployment issues...")
try {
  const nextConfigContent = fs.readFileSync(path.join(rootDir, "next.config.mjs"), "utf8")

  // Check for problematic experimental features
  if (nextConfigContent.includes("experimental: {") && nextConfigContent.includes("optimizeCss: true")) {
    console.warn("⚠️  Found experimental.optimizeCss: true in next.config.mjs, which might cause deployment issues.")
  } else {
    console.log("✅ No problematic experimental features found in next.config.mjs.")
  }

  // Check for image domains
  if (!nextConfigContent.includes("domains:")) {
    console.warn("⚠️  No image domains configured in next.config.mjs. External images might not load.")
  } else {
    console.log("✅ Image domains configuration found.")
  }
} catch (error) {
  console.error("❌ Error reading next.config.mjs:", error.message)
}

// Final summary
console.log("\n📊 Pre-deployment test summary:")
console.log("Make sure to address any warnings or errors before deploying.")
console.log("Remember to set up all required environment variables in your deployment platform.")
console.log("Ensure all image assets are properly uploaded and referenced.")
console.log("Test all interactive features, forms, and API routes in a staging environment.")
