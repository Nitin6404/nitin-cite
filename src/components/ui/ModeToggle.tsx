"use client";

import { useEffect, useState } from "react";

export function ModeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList[newIsDark ? "add" : "remove"]("dark");
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  if (!mounted) {
    return null;
  }

  return (
    <button
      className="fixed bottom-4 right-4 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      onClick={toggleTheme}
      type="button"
      aria-label="Toggle theme"
    >
      {isDark ? "light" : "dark"}
    </button>
  );
}
