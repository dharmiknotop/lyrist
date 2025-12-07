"use client";

import { Input, Button } from "@material-tailwind/react";
import { useLyrics, useForm } from "@/hooks";
import { useState, useEffect } from "react";
import {
  INPUT_STYLES,
  PLACEHOLDERS,
  BUTTON_LABELS,
  LOADING_MESSAGES,
  THEME_COLORS,
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
    if (!values.artist.trim() || !values.track.trim()) return;

    await fetchLyrics(values.artist, values.track);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSearch();
    }
  };

  return (
    <div className="w-full max-w-[90vw] lg:w-[600px]">
      <div className="relative mt-6 h-12 w-full">
        <Input
          variant={INPUT_STYLES.VARIANT}
          label={PLACEHOLDERS.ARTIST_LABEL}
          value={values.artist}
          className="text-white  peer-focus:text-cyan-500 "
          onChange={handleChange("artist")}
          onKeyPress={handleKeyPress}
          color={THEME_COLORS.TEXT_PRIMARY}
          crossOrigin="anonymous"
        />
      </div>

      <div className="relative mt-6 flex w-full h-12">
        <Input
          variant={INPUT_STYLES.VARIANT}
          label={PLACEHOLDERS.TRACK_LABEL}
          className="text-white"
          color={THEME_COLORS.TEXT_PRIMARY}
          value={values.track}
          onChange={handleChange("track")}
          onKeyPress={handleKeyPress}
          crossOrigin="anonymous"
        />

        <Button
          size="sm"
          color={values.track && values.artist ? "gray" : "blue-gray"}
          disabled={!values.track || !values.artist || loading}
          className="!absolute right-1 top-1 rounded shrink-0"
          onClick={handleSearch}
        >
          {loading ? BUTTON_LABELS.SEARCHING : BUTTON_LABELS.SEARCH}
        </Button>
      </div>

      <Lyrics
        loading={loading}
        loadingMessage={loadingMessage}
        lyrics={lyrics?.lyrics || null}
        title={lyrics?.title}
        artist={lyrics?.artist}
        error={error}
      />
    </div>
  );
};

export default Form;
