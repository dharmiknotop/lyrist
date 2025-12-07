"use client";

import { Input, Button } from "@material-tailwind/react";
import { useLyrics, useForm } from "@/hooks";
import { useState, useEffect } from "react";
import {
  INPUT_STYLES,
  PLACEHOLDERS,
  BUTTON_LABELS,
  LOADING_MESSAGES,
} from "@/constants";
import { Lyrics } from "./Lyrics";

const Form = () => {
  const { values, handleChange } = useForm({
    track: "",
    artist: "",
  });

  const { lyrics, loading, error, fetchLyrics } = useLyrics();

  const [loadingMessage, setLoadingMessage] = useState<string>(
    LOADING_MESSAGES.FETCHING
  );

  useEffect(() => {
    if (!loading) {
      setLoadingMessage(LOADING_MESSAGES.FETCHING);
      return;
    }

    setLoadingMessage(LOADING_MESSAGES.FETCHING);

    const timer1 = setTimeout(() => {
      setLoadingMessage(LOADING_MESSAGES.SCRAPING);
    }, 3000);

    const timer2 = setTimeout(() => {
      setLoadingMessage(LOADING_MESSAGES.ALMOST_THERE);
    }, 8000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [loading]);

  const handleSearch = async () => {
    if (!values.track.trim()) return;

    await fetchLyrics(values.track, values.artist);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-[90vw] lg:w-[600px]">
      <div className="relative mt-6 h-11 w-full">
        <Input
          variant={INPUT_STYLES.VARIANT}
          label={PLACEHOLDERS.ARTIST_LABEL}
          className={`${INPUT_STYLES.TEXT_COLOR} !border-gray-500 focus:!border-cyan-400`}
          value={values.artist}
          onChange={handleChange("artist")}
          onKeyPress={handleKeyPress}
          disabled={loading}
          labelProps={{
            style: { color: INPUT_STYLES.LABEL_COLOR },
          }}
          crossOrigin="anonymous"
        />
      </div>

      <div className="relative mt-6 flex w-full">
        <Input
          variant={INPUT_STYLES.VARIANT}
          label={PLACEHOLDERS.TRACK_LABEL}
          className={`${INPUT_STYLES.TEXT_COLOR} !border-gray-500 focus:!border-cyan-400`}
          containerProps={{
            className: "min-w-0",
          }}
          value={values.track}
          onChange={handleChange("track")}
          onKeyPress={handleKeyPress}
          disabled={loading}
          labelProps={{
            style: { color: INPUT_STYLES.LABEL_COLOR },
          }}
          crossOrigin="anonymous"
        />

        <Button
          size="sm"
          color={values.track ? "gray" : "blue-gray"}
          disabled={!values.track || loading}
          className="!absolute right-1 top-1 rounded shrink-0"
          onClick={handleSearch}
        >
          {loading ? BUTTON_LABELS.SEARCHING : BUTTON_LABELS.SEARCH}
        </Button>
      </div>

      {error && (
        <div className="mt-4 rounded-md border border-red-500 bg-red-500/10 p-3 text-center text-sm text-red-400">
          {error}
        </div>
      )}

      <Lyrics
        loading={loading}
        loadingMessage={loadingMessage}
        lyrics={lyrics?.lyrics || null}
        title={lyrics?.title}
        artist={lyrics?.artist}
      />
    </div>
  );
};

export default Form;
