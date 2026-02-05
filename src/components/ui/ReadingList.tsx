"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ReadingListProps {
  initialItems: Array<{
    title: string;
    type: "book" | "manga" | "web-novel";
    description?: string;
    link?: string;
  }>;
}

export default function ReadingList({ initialItems }: ReadingListProps) {
  const [activeTab, setActiveTab] = useState<"books" | "manga" | "web-novels">(
    "books"
  );

  const filteredReading = initialItems.filter((item) => {
    if (activeTab === "books") return item.type === "book";
    if (activeTab === "manga") return item.type === "manga";
    if (activeTab === "web-novels") return item.type === "web-novel";
    return false;
  });

  return (
    <div className="w-full space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 sm:gap-6 border-b border-muted-foreground/10 pb-2">
        <button
          onClick={() => setActiveTab("books")}
          className={`transition-colors capitalize ${
            activeTab === "books"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          books
        </button>
        <button
          onClick={() => setActiveTab("manga")}
          className={`transition-colors capitalize ${
            activeTab === "manga"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          manga
        </button>
        <button
          onClick={() => setActiveTab("web-novels")}
          className={`transition-colors capitalize ${
            activeTab === "web-novels"
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          type="button"
        >
          web novels
        </button>
      </div>

      {/* Reading List */}
      {filteredReading.length === 0 ? (
        <div className="columns-1 sm:columns-2 gap-6 space-y-4">
          <p className="text-muted-foreground">
            No {activeTab === "web-novels" ? "web novels" : activeTab} yet.
            Create a <code>reading-list</code> repository with a README.md
            containing your reading list.
          </p>
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 gap-6 space-y-4">
          {filteredReading.map((item, index) => (
            <div
              key={item.title}
              className="break-inside-avoid mb-4 space-y-1"
              style={{
                animationDelay: `${index * 50}ms`,
              }}
            >
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-normal mb-1 hover:opacity-80 transition-opacity"
                >
                  {item.title}
                </a>
              ) : (
                <h3 className="text-foreground font-normal mb-1">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
