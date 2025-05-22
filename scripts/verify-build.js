import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const rootDir = path.join(__dirname, "..")

console.log("🏗️ Verifying build process...")

try {
  // Run a production build
  console.log("\n📦 Running production build...")
  execSync("npm run build", { stdio: "inherit", cwd: rootDir })

  console.log("\n✅ Build completed successfully!")

  // Check if .next directory was created
  const nextDir = path.join(rootDir, ".next")
  if (fs.existsSync(nextDir)) {
    console.log("✅ .next directory created successfully.")
  } else {
    console.error("❌ .next directory not found. Build may have failed.")
  }

  // Check for common build artifacts
  const buildArtifacts = [".next/server/pages", ".next/server/app", ".next/static"]

  const missingArtifacts = buildArtifacts.filter((artifact) => !fs.existsSync(path.join(rootDir, artifact)))

  if (missingArtifacts.length > 0) {
    console.warn(`⚠️ Some expected build artifacts are missing: ${missingArtifacts.join(", ")}`)
  } else {
    console.log("✅ All expected build artifacts found.")
  }

  console.log("\n🎉 Build verification complete! The website should deploy without errors.")
} catch (error) {
  console.error("❌ Build verification failed:", error.message)
  console.error("Please fix the errors above before deploying.")
}
