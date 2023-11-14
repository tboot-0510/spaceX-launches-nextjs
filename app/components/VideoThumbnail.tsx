"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ReactPlayer = dynamic(
  () => import("react-player/lazy").then((ReactPlayer) => ReactPlayer),
  {
    ssr: false,
  }
);

const VideoThumbnail = ({ url, height, width }: any) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return { isLoaded } ? (
    <div>
      <ReactPlayer
        url={url}
        height={height}
        width={width}
        playing={true}
        config={{
          youtube: {
            playerVars: { showinfo: 1 },
          },
        }}
      />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default VideoThumbnail;
