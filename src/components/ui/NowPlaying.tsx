"use client";

import { useEffect, useState } from "react";
import { fetchSoundCloudActivity, type SoundCloudActivity } from "@/lib/soundcloud";

export function NowPlaying() {
  const [track, setTrack] = useState<any | null>(null);

  useEffect(() => {
    const loadTrack = async () => {
      try {
        // Fetch recent activity, take the first one
        const activities = await fetchSoundCloudActivity("nitin6404", "recent");
        if (activities && activities.length > 0) {
            setTrack(activities[0].origin);
        }
      } catch (error) {
        console.error("Failed to load now playing", error);
      }
    };

    loadTrack();
  }, []);

  if (!track) return null;

  return (
    <div className="mt-auto pt-8 flex flex-col items-center">
        {/* Rotating CD Visual */}
        <div className="relative group cursor-pointer w-24 h-24">
            <div className="relative w-full h-full rounded-full bg-neutral-900 shadow-xl flex items-center justify-center animate-[spin_8s_linear_infinite] group-hover:animate-none transition-all duration-500 ring-1 ring-white/10">
                {/* Grooves */}
                <div className="absolute inset-1 rounded-full border border-neutral-800/50" />
                <div className="absolute inset-3 rounded-full border border-neutral-800/50" />
                
                {/* Album Art Center */}
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-neutral-950 shadow-inner z-10 relative">
                        {track.artwork_url ? (
                        <img 
                            src={track.artwork_url.replace('-large', '-t500x500')} 
                            alt="Album Art" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                    )}
                </div>
            </div>
             {/* Play overlay hint (on hover) */}
             <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="bg-black/50 rounded-full p-1">
                    <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                </div>
            </div>
        </div>

        <div className="text-center mt-3 max-w-[120px]">
            <a 
                href={track.permalink_url} 
                target="_blank" 
                rel="noreferrer"
                className="text-[10px] font-medium text-foreground/80 hover:text-foreground hover:underline decoration-1 underline-offset-2 line-clamp-2 leading-tight"
            >
                {track.title}
            </a>
            <p className="text-[9px] text-muted-foreground truncate mt-0.5 opacity-70">
                {track.user.username}
            </p>
        </div>
    </div>
  );
}
