"use client";

import { Input, Button, Spinner } from "@material-tailwind/react";
import { useState } from "react";

type Props = {
  Loading: boolean;
  lyrics: String;
};

const Lyrics = (props: Props) => {
  const { Loading, lyrics } = props;

  return (
    <div className="lyrics relative h-[400px] max-h-[400px] w-full overflow-y-scroll rounded-md border border-zinc-600 bg-zinc-800/60 p-4 text-sm text-white shadow-xl scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-600 scrollbar-thumb-rounded md:h-[250px] md:max-h-[250px] mt-6">
      {Loading && <Spinner />}

      {!Loading && lyrics && <p className="whitespace-pre-line">{lyrics}</p>}
      {!Loading && lyrics === "" && (
        <span>Your lyrics will be shown here...</span>
      )}

      {!Loading && lyrics === null && <span>Sorry no lyrics found</span>}
    </div>
  );
};

export default Lyrics;
