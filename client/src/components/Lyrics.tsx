"use client";

import { Input, Button, Textarea } from "@material-tailwind/react";
import { useState } from "react";

const Lyrics = () => {
  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");

  const [lyrics, setLyrics] = useState("");

  const GET_LYRICS = `query ExampleQuery( $name: String!) {
        getLyrics(name: $name) {
          lyrics
        }
        }`;

  const getLyrics = async function () {
    console.log(`{ getLyrics(name:${track}) { title } }`);

    const { data } = await fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify({
        query: GET_LYRICS,
        variables: { name: track },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    console.log(data);
    console.log(data.getLyrics);
    console.log(data.getLyrics.lyrics);

    setLyrics(data?.getLyrics?.lyrics);
  };

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
          onClick={() => {
            // getCountries({
            //   variables: { artists: "perfect" },
            // });
            getLyrics();
          }}
        >
          Invite
        </Button>
      </div>

      <div className="lyrics relative h-[400px] max-h-[400px] w-full overflow-y-scroll rounded-md border border-zinc-600 bg-zinc-800/60 p-4 text-sm text-pink-100 shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700/50 scrollbar-thumb-rounded-md md:h-[250px] md:max-h-[250px] mt-6">
        <p className="whitespace-pre-line">{lyrics}</p>
      </div>
    </div>
  );
};

export default Lyrics;
