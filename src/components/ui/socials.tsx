"use client";

import {
  GithubLogoIcon,
  TwitterLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react";

import { socials } from "@/data";

const socialIcons = {
  "x/twitter": TwitterLogoIcon,
  github: GithubLogoIcon,
  youtube: YoutubeLogoIcon,
} as const;

export function Socials() {
  return (
    <>
      {/* Mobile: horizontal */}
      <div className="flex md:hidden flex-row items-center gap-3">
        {socials.map((social) => {
          const Icon = socialIcons[social.title as keyof typeof socialIcons];
          return (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              aria-label={social.title}
            >
              {Icon ? (
                <>
                  <Icon weight="fill" className="size-5" aria-hidden />
                  <span className="sr-only">{social.title}</span>
                </>
              ) : (
                social.title
              )}
            </a>
          );
        })}
      </div>

      {/* Desktop: vertical */}
      <div className="hidden md:flex flex-col gap-1 lg:gap-2">
        {socials.map((social) => {
          return (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              aria-label={social.title}
            >
              {social.title}
            </a>
          );
        })}
      </div>
    </>
  );
}
