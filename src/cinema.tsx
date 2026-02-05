"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CinemaItem {
  title: string;
  description?: string;
}

interface CinemaData {
  movies: CinemaItem[];
  webShows: CinemaItem[];
  animes: CinemaItem[];
  gallery: string[];
}

interface CinemaPageProps {
  initialData: CinemaData;
}

export default function CinemaPage({ initialData }: CinemaPageProps) {
  const renderList = (
    items: Array<{ title: string; description?: string }>
  ) => {
    if (items.length === 0) {
      return (
        <p className="text-muted-foreground">No items found in this section.</p>
      );
    }
    return (
      <div className="columns-1 sm:columns-2 gap-6 space-y-4">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="break-inside-avoid mb-4 space-y-1"
            style={{
              animationDelay: `${index * 50}ms`,
            }}
          >
            <h3 className="text-foreground font-normal mb-1">{item.title}</h3>
            {item.description && (
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="films" className="w-full">
        <div className="border-b border-muted-foreground/10 pb-2 mb-6">
          <TabsList className="w-auto justify-start gap-6 bg-transparent p-0 rounded-none h-auto">
            <TabsTrigger
              value="films"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              films
            </TabsTrigger>
            <TabsTrigger
              value="web-shows"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              web shows
            </TabsTrigger>
            <TabsTrigger
              value="anime"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              anime
            </TabsTrigger>
            <TabsTrigger
              value="gallery"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              gallery
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="films" className="m-0">
          {renderList(initialData.movies)}
        </TabsContent>

        <TabsContent value="web-shows" className="m-0">
          {renderList(initialData.webShows)}
        </TabsContent>

        <TabsContent value="anime" className="m-0">
          {renderList(initialData.animes)}
        </TabsContent>

        <TabsContent value="gallery" className="m-0">
          {initialData.gallery.length === 0 ? (
            <p className="text-muted-foreground">
              No images found. Add a <code>## Gallery</code> section with image
              links to your README.
            </p>
          ) : (
            <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
              {initialData.gallery.map((url, index) => (
                <div
                  key={index}
                  className="break-inside-avoid mb-4 overflow-hidden rounded-lg bg-muted"
                >
                  <img
                    src={url}
                    alt={`Gallery item ${index + 1}`}
                    className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
