"use client";

import { Socials } from "./socials";

interface VerticalNavProps {
  pathname: string;
}

export function VerticalNav({ pathname }: VerticalNavProps) {
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    { path: "/", label: "home" },
    { path: "/cinema", label: "cinema" },
    { path: "/reading", label: "reading" },
    { path: "/music", label: "music" },
  ];

  return (
    <>
      {/* Mobile: horizontal nav */}
      <nav className="flex md:hidden flex-row items-center justify-between gap-4">
        <div className="flex flex-row items-center gap-4">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <a
                key={item.path}
                href={item.path}
                className={` transition-colors whitespace-nowrap ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={item.label}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <Socials />
      </nav>

      {/* Desktop: vertical nav */}
      <nav className="hidden md:flex flex-col gap-6 lg:gap-8 h-full">
        <div className="flex flex-col gap-2 lg:gap-2">
          {navItems.map((item) => {
            const active = isActive(item.path);

            return (
              <a
                key={item.path}
                href={item.path}
                className={` transition-colors whitespace-nowrap ${
                  active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                aria-label={item.label}
              >
                {item.label}
              </a>
            );
          })}
        </div>
        <Socials />
      </nav>
    </>
  );
}
