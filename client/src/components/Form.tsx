"use client";

import { Input, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";
import Lyrics from "./Lyrics";

const Form = () => {
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");

  return (
    <div className="min-w-[90vw] lg:min-w-[600px]">
      <div className="relative h-11 w-full mt-6">
        <Input
          variant="outlined"
          label="Artist name (optional)"
          color="cyan"
          className="text-white"
          value={artist}
          labelProps={{
            style: { color: "cyan" },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setArtist(e.target.value);
          }}
          crossOrigin="anonymous"
        />
      </div>
      <div className="relative flex w-full mt-6">
        <Input
          variant="outlined"
          label="Track name"
          color="cyan"
          className="text-white pr-20"
          value={track}
          labelProps={{
            style: { color: "cyan" },
          }}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setTrack(e.target.value);
          }}
          crossOrigin="anonymous"
        />

        <Button
          size="sm"
          color={track ? "gray" : "blue-gray"}
          disabled={!track}
          className="!absolute right-1 top-1 rounded"
        >
          Invite
        </Button>
      </div>

      <Lyrics />
    </div>
  );
};

export default Form;
