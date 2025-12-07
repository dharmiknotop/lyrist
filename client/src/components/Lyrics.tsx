"use client";

import { PLACEHOLDERS } from "@/constants";
import type { LyricsProps } from "@/types";

export const Lyrics = ({
  loading,
  lyrics,
  title,
  artist,
  loadingMessage,
  error,
}: LyricsProps) => {
  return (
    <div className="lyrics relative mt-6 h-[400px] max-h-[400px] w-full overflow-y-scroll rounded-md border border-zinc-600 bg-zinc-800/60 p-4 text-sm text-white shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-600 scrollbar-thumb-rounded md:h-[250px] md:max-h-[250px]">
      {/* Loading State */}
      {loading && (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.3s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:-0.15s]"></div>
            <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
          </div>
          <p className="mt-3 text-cyan-400">{loadingMessage}</p>
          <p className="mt-1 text-xs text-gray-400">
            This might take a moment (up to 10 seconds)
          </p>
        </div>
      )}

      {/* Error State */}
      {!loading && error && (
        <div className="flex h-full flex-col items-center justify-center">
          <div className="rounded-md border border-red-500 bg-red-500/10 p-4 text-center">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        </div>
      )}

      {/* Lyrics Content */}
      {!loading && lyrics && (
        <div className="h-full">
          {/* Song Info Header - Sticky */}
          {(title || artist) && (
            <div className="sticky top-0 z-10 mb-4 border-b border-zinc-600 bg-zinc-800/95 pb-3 backdrop-blur-sm">
              {title && (
                <h3 className="text-lg font-semibold text-cyan-400 capitalize">
                  {title}
                </h3>
              )}
              {artist && (
                <p className="text-sm text-gray-400 capitalize">by {artist}</p>
              )}
            </div>
          )}

          {/* Lyrics Text */}
          <pre className="whitespace-pre-wrap font-sans leading-relaxed">
            {lyrics}
          </pre>
        </div>
      )}

      {/* Empty State */}
      {!loading && !lyrics && !error && (
        <div className="flex h-full items-center justify-center text-gray-400">
          <span>{PLACEHOLDERS.EMPTY_STATE}</span>
        </div>
      )}
    </div>
  );
};
