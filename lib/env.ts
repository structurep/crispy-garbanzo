// Environment variables utility with fallbacks and validation

// Define environment variable types and defaults
type EnvVariable = {
  key: string
  defaultValue?: string
  isRequired?: boolean
  isSecret?: boolean
}

// Environment variables configuration
const envConfig: Record<string, EnvVariable> = {
  RESEND_API_KEY: {
    key: "RESEND_API_KEY",
    isRequired: true,
    isSecret: true,
  },
  RECAPTCHA_SECRET_KEY: {
    key: "RECAPTCHA_SECRET_KEY",
    isRequired: true,
    isSecret: true,
  },
  ANALYZE: {
    key: "ANALYZE",
    defaultValue: "false",
    isRequired: false,
  },
  // Add other environment variables here as needed
}

// Get environment variable with fallback
export function getEnv(key: string): string {
  const config = envConfig[key]

  if (!config) {
    console.warn(`Accessing undefined environment variable: ${key}`)
    return ""
  }

  const value = process.env[key] || config.defaultValue || ""

  if (config.isRequired && !value) {
    console.error(`Required environment variable ${key} is not set`)
  }

  return value
}

// Check if all required environment variables are set
export function validateEnv(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  Object.values(envConfig).forEach((config) => {
    if (config.isRequired && !process.env[config.key] && !config.defaultValue) {
      missing.push(config.key)
    }
  })

  return {
    valid: missing.length === 0,
    missing,
  }
}

// Log environment validation on server startup (only in development)
if (process.env.NODE_ENV === "development") {
  const validation = validateEnv()
  if (!validation.valid) {
    console.warn("⚠️ Missing required environment variables:", validation.missing.join(", "))
    console.warn("This may cause issues in production.")
  }
}
