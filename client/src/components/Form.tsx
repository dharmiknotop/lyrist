"use client";

import axios, { AxiosResponse } from "axios";
import { Input, Button } from "@material-tailwind/react";
import { useState } from "react";
import Lyrics from "./Lyrics";

import { configKeys } from "@/config/keys";

export interface UserRegistrationModel {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

const Form = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const [artist, setArtist] = useState("");
  const [track, setTrack] = useState("");

  const [lyrics, setLyrics] = useState("");

  const GET_LYRICS = `query ExampleQuery( $name: String!) {
        getLyrics(name: $name) {
          lyrics,
        }
        }`;

  const getLyrics = async function (name: String) {
    try {
      setLoading(true);

      const { data }: AxiosResponse = await axios.post(
        `${configKeys.SERVER_URL}/graphql`,
        {
          query: GET_LYRICS,
          variables: { name },
        }
      );

      console.log(data);

      setLyrics(data?.data?.getLyrics?.lyrics);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[90vw] lg:w-[600px]">
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
            getLyrics(`${track} ${artist}`);
          }}
        >
          Search
        </Button>
      </div>

      <Lyrics Loading={loading} lyrics={lyrics} />
    </div>
  );
};

export default Form;
