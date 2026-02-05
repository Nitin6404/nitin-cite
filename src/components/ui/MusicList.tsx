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
  const [recentActivity, setRecentActivity] = useState<SoundCloudActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const recent = await fetchSoundCloudActivity("nitin6404", "recent");
        setRecentActivity(recent);
      } catch (error) {
        console.error("Failed to load SoundCloud data", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);


  return (
    <div className="w-full space-y-6">
      {loading ? (
        <div className="py-20 text-center text-muted-foreground/50 animate-pulse font-serif italic">Loading sound waves...</div>
      ) : recentActivity.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No tracks found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
             {recentActivity.map((item, index) => (
                <div key={index} className="group flex items-center gap-4 py-3 px-2 -mx-2 hover:bg-muted/30 rounded-lg transition-colors border-b border-transparent hover:border-muted-foreground/5">
                    <div className="relative w-12 h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden shadow-sm">
                         {item.origin.artwork_url ? (
                            <img src={item.origin.artwork_url} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                        ) : (
                            <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xs text-muted-foreground">♪</div>
                        )}
                         {/* Play overlay hint */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[8px] border-l-white border-b-[4px] border-b-transparent ml-0.5"></div>
                        </div>
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <a href={item.origin.permalink_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-foreground truncate hover:underline decoration-1 underline-offset-4 decoration-muted-foreground">
                            {item.origin.title}
                        </a>
                        <div className="flex items-center gap-2 text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">
                            <span>{item.origin.user.username}</span>
                            {item.origin.playback_count && (
                                <>
                                    <span>•</span>
                                    <span>{new Intl.NumberFormat('en-US', { notation: "compact" }).format(item.origin.playback_count)} plays</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="text-xs text-muted-foreground/50 font-mono hidden sm:block">
                        {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                </div>
            ))}
        </div>
      )}
    </div>
  );
}

