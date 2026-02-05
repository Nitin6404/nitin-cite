import type { reading } from "@/reading";

interface ReadingItemProps {
  href: string;
  title: string;
  type: "book" | "manga" | "web-novel";
  date: string;
}

export function ReadingItem({ href, title, type, date }: ReadingItemProps) {
  return (
    <div class="flex items-center justify-between py-3 border-b border-muted-foreground/10">
      <a href={href} class="flex-1 min-w-0 group">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-xs text-muted-foreground capitalize px-2 py-0.5 bg-muted-foreground/10 rounded">
            {type}
          </span>
        </div>
        <h3 class="text-foreground font-normal group-hover:opacity-80 transition-opacity">
          {title}
        </h3>
      </a>
      <time class="text-sm text-muted-foreground ml-4 shrink-0">{date}</time>
    </div>
  );
}
