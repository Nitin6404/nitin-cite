"use client";

import { useEffect, useState } from "react";
import {
  fetchSoundCloudActivity,
  type SoundCloudActivity,
} from "@/lib/soundcloud";

interface MusicListProps {
  initialSongs: Array<{ title: string; link: string }>;
}

export function MusicList({ initialSongs }: MusicListProps) {
  return (
    <div className="w-full space-y-2">
      <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {initialSongs.map((song, index) => (
          <div
            key={index}
            className="group flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-muted/30 rounded-lg transition-colors border-b border-transparent hover:border-muted-foreground/5"
          >
            <div className="relative w-12 h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden shadow-sm flex items-center justify-center">
              <span className="text-xs text-muted-foreground">♪</span>
            </div>

            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <a
                href={song.link}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-foreground truncate hover:underline decoration-1 underline-offset-4 decoration-muted-foreground"
              >
                {song.title}
              </a>
            </div>
          </div>
        ))}
      </div>
      {initialSongs.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          No tracks found in README.
        </div>
      )}
    </div>
  );
}
