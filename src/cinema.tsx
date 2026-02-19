"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PortfolioCard } from "@/components/ui/PortfolioCard";
import { cn } from "@/lib/utils";

interface CinemaItem {
  title: string;
  description?: string;
  image?: string; // Potential future use
  link?: string; // Potential future use
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

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function CinemaPage({ initialData }: CinemaPageProps) {
  const [activeTab, setActiveTab] = useState("films");

  const renderList = (items: CinemaItem[]) => {
    if (items.length === 0) {
      return (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-muted-foreground italic text-center py-10"
        >
          No treasures found here yet.
        </motion.p>
      );
    }
    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {items.map((item, index) => (
          <PortfolioCard
            key={`${item.title}-${index}`}
            variants={itemAnim}
            image={item.image}
            className={cn(item.image && "min-h-[300px] sm:min-h-[350px]")}
          >
            <h3 className="text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors mb-2">
              {item.title}
            </h3>
            {item.description && (
              <p className="text-sm text-muted-foreground/80 leading-relaxed font-light group-hover:text-muted-foreground transition-colors">
                {item.description}
              </p>
            )}
          </PortfolioCard>
        ))}
      </motion.div>
    );
  };

  const renderGallery = (images: string[]) => {
    if (images.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 border border-dashed border-white/10 rounded-xl bg-background/5"
        >
          <p className="text-muted-foreground">
            The gallery is currently empty.
          </p>
          <p className="text-xs text-muted-foreground/50 mt-2">
            Add images to your data file to see them here.
          </p>
        </motion.div>
      );
    }

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col space-y-12 max-w-4xl mx-auto"
      >
        {images.map((url, index) => (
          <motion.div
            key={index}
            variants={itemAnim}
            className="group space-y-4"
          >
            <div className="overflow-hidden rounded-xl border border-white/10 bg-background/5 backdrop-blur-sm relative">
                <motion.img
                  src={url}
                  alt={`Cinematic shot ${index + 1}`}
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
            <div className="px-1">
                <p className="text-sm text-muted-foreground/80 font-mono tracking-wide">
                    // shot {String(index + 1).padStart(2, '0')} — cinematic details
                </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className="w-full space-y-8 min-h-[50vh]">
      <Tabs
        defaultValue="films"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
         <div className="border-b border-muted-foreground/10 pb-2 mb-8">
          <TabsList className="w-auto justify-start gap-8 bg-transparent p-0 rounded-none h-auto">
            {["films", "web-shows", "anime", "gallery"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal capitalize"
              >
                {tab.replace("-", " ")}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <TabsContent value="films" className="m-0 focus-visible:outline-none">
              {renderList(initialData.movies)}
            </TabsContent>

            <TabsContent value="web-shows" className="m-0 focus-visible:outline-none">
              {renderList(initialData.webShows)}
            </TabsContent>

            <TabsContent value="anime" className="m-0 focus-visible:outline-none">
              {renderList(initialData.animes)}
            </TabsContent>

            <TabsContent value="gallery" className="m-0 focus-visible:outline-none">
              {renderGallery(initialData.gallery)}
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
