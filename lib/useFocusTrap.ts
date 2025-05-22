import { useEffect } from "react"

const FOCUSABLE_SELECTORS = [
  "a[href]",
  "area[href]",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "button:not([disabled])",
  "iframe",
  "object",
  "embed",
  "[tabindex]:not([tabindex='-1'])",
  "[contenteditable]",
]

export function useFocusTrap(active: boolean, ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!active || !ref.current) return

    const element = ref.current
    const previouslyFocused = document.activeElement as HTMLElement | null

    const getFocusable = () =>
      Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS.join(","))).filter(
        (el) => !el.hasAttribute("disabled") && el.getAttribute("tabindex") !== "-1"
      )

    const focusables = getFocusable()
    if (focusables.length) {
      focusables[0].focus()
    } else {
      element.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return
      const items = getFocusable()
      if (!items.length) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    element.addEventListener("keydown", handleKeyDown)

    return () => {
      element.removeEventListener("keydown", handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [active, ref])
}
