"use client";

import { useEffect, useState } from "react";
import {
  fetchSoundCloudActivity,
  type SoundCloudActivity,
} from "@/lib/soundcloud";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MusicListProps {
  initialSongs: Array<{ title: string; link: string }>;
}

export function MusicList({ initialSongs }: MusicListProps) {
  const [activity, setActivity] = useState<SoundCloudActivity[]>([]);
  const [loadingActivity, setLoadingActivity] = useState(false);

  useEffect(() => {
    const loadActivity = async () => {
      setLoadingActivity(true);
      try {
        // Using the provided username
        const data = await fetchSoundCloudActivity("nitin6404");
        setActivity(data);
      } catch (error) {
        console.error("Failed to load SoundCloud activity", error);
      } finally {
        setLoadingActivity(false);
      }
    };

    loadActivity();
  }, []);

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="playlist" className="w-full">
        <div className="border-b border-muted-foreground/10 pb-2 mb-6">
          <TabsList className="w-auto justify-start gap-6 bg-transparent p-0 rounded-none h-auto">
            <TabsTrigger
              value="playlist"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              playlist
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="rounded-none border-b-2 border-transparent px-0 py-0 data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none bg-transparent text-muted-foreground hover:text-foreground transition-colors font-normal"
            >
              recent activity
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="playlist" className="space-y-4 m-0">
          <div className="columns-1 sm:columns-2 gap-6 space-y-4">
            {initialSongs.length === 0 ? (
              <p className="text-muted-foreground">
                No songs in the playlist yet.
              </p>
            ) : (
              initialSongs.map((song, index) => (
                <div
                  key={`${song.title}-${index}`}
                  className="break-inside-avoid mb-4 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <a
                    href={song.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <h3 className="text-foreground font-normal mb-1 group-hover:underline decoration-1 underline-offset-4">
                      {song.title}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {song.link}
                    </p>
                  </a>
                </div>
              ))
            )}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 m-0">
          {loadingActivity ? (
            <p className="text-muted-foreground">
              Loading SoundCloud activity...
            </p>
          ) : activity.length === 0 ? (
            <p className="text-muted-foreground">No recent activity found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activity.map((item, index) => (
                <div key={index} className="flex gap-4 items-start group">
                  {item.origin.artwork_url && (
                    <img
                      src={item.origin.artwork_url}
                      alt={item.origin.title}
                      className="w-16 h-16 object-cover rounded bg-muted"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-muted-foreground/20 px-1.5 rounded">
                        {item.type.replace("track-", "")}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {new Date(item.created_at).toLocaleDateString()}
                      </time>
                    </div>
                    <a
                      href={item.origin.permalink_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground hover:underline decoration-1 underline-offset-4 block truncate font-medium"
                    >
                      {item.origin.title}
                    </a>
                    <p className="text-sm text-muted-foreground">
                      by {item.origin.user.username}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
