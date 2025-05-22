// Accessibility checker utility for development

interface A11yIssue {
  element: HTMLElement
  type: string
  message: string
  severity: "error" | "warning" | "info"
}

export function checkAccessibility(): A11yIssue[] {
  if (typeof document === "undefined") return []

  const issues: A11yIssue[] = []

  // Check for images without alt text
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt")) {
      issues.push({
        element: img as HTMLElement,
        type: "missing-alt",
        message: "Image is missing alt text",
        severity: "error",
      })
    } else if (img.alt === "" && !img.closest("figure")) {
      issues.push({
        element: img as HTMLElement,
        type: "empty-alt",
        message: "Image has empty alt text but is not decorative",
        severity: "warning",
      })
    }
  })

  // Check for buttons without accessible names
  document.querySelectorAll("button").forEach((button) => {
    if (!button.textContent?.trim() && !button.getAttribute("aria-label") && !button.getAttribute("title")) {
      issues.push({
        element: button as HTMLElement,
        type: "missing-button-name",
        message: "Button is missing accessible name",
        severity: "error",
      })
    }
  })

  // Check for proper heading hierarchy
  let lastHeadingLevel = 0
  document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach((heading) => {
    const level = Number.parseInt(heading.tagName.substring(1))

    if (lastHeadingLevel === 0 && level !== 1) {
      issues.push({
        element: heading as HTMLElement,
        type: "heading-hierarchy",
        message: "First heading should be an h1",
        severity: "warning",
      })
    } else if (level > lastHeadingLevel + 1) {
      issues.push({
        element: heading as HTMLElement,
        type: "heading-hierarchy",
        message: `Heading level jumped from h${lastHeadingLevel} to h${level}`,
        severity: "warning",
      })
    }

    lastHeadingLevel = level
  })

  // Check for form inputs without labels
  document.querySelectorAll("input, select, textarea").forEach((input) => {
    const id = input.getAttribute("id")
    if (!id) {
      issues.push({
        element: input as HTMLElement,
        type: "missing-input-id",
        message: "Form input is missing an id attribute",
        severity: "error",
      })
      return
    }

    const label = document.querySelector(`label[for="${id}"]`)
    if (!label && !input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby")) {
      issues.push({
        element: input as HTMLElement,
        type: "missing-label",
        message: "Form input is missing an associated label",
        severity: "error",
      })
    }
  })

  // Check for color contrast (simplified)
  document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, a, button").forEach((element) => {
    const style = window.getComputedStyle(element)
    const color = style.color
    const backgroundColor = style.backgroundColor

    // This is a simplified check - in a real implementation, you would use a proper
    // color contrast algorithm like WCAG 2.0 contrast ratio
    if (color === backgroundColor) {
      issues.push({
        element: element as HTMLElement,
        type: "contrast",
        message: "Text color is the same as background color",
        severity: "error",
      })
    }
  })

  return issues
}

// Initialize accessibility checker in development
export function initAccessibilityChecker() {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const issues = checkAccessibility()
        if (issues.length > 0) {
          console.group("Accessibility Issues")
          issues.forEach((issue) => {
            const logMethod =
              issue.severity === "error" ? console.error : issue.severity === "warning" ? console.warn : console.info
            logMethod(`${issue.message} - ${issue.element.tagName.toLowerCase()}`, issue.element)
          })
          console.groupEnd()
        }
      }, 1000)
    })
  }
}

// Add to window for debugging
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  ;(window as any).checkAccessibility = checkAccessibility
}
