"use client";
import Link from "next/link";
import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import styles from "../../../styles/LaunchPage.module.css";
import VideoThumbnail from "@/app/components/VideoThumbnail";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import { formatLaunchData } from "@/app/helpers/format";
import LaunchDetails from "@/app/components/LaunchDetails";

const LaunchPage = ({ params: { id } }: any) => {
  const [launchData, setLaunchData] = useState<any>();

  useEffect(() => {
    async function fetchLaunchDetails(id: string) {
      const response = await fetch(
        `https://api.spacexdata.com/v4/launches/${id}`,
        {
          next: {
            revalidate: 60,
          },
        }
      );
      const launch = await response.json();
      setLaunchData(formatLaunchData(launch));
    }

    fetchLaunchDetails(id);
  }, [id]);

  if (!launchData) return <div>Loading ...</div>;

  return (
    <div className={styles.container}>
      <Link className={styles.backButton} href="/">
        <ArrowLeft size={24} />
        Go back to launches
      </Link>
      <Suspense fallback={<div>Loading launch...</div>}>
        <div className="f fd-r w-100-p mt-12">
          <div className="f fd-c ai-c w-100-p">
            <VideoThumbnail
              url={launchData.media.videoURL}
              height={400}
              width={500}
            />
          </div>
          <LaunchDetails launch={launchData} />
        </div>
      </Suspense>
    </div>
  );
};

export default LaunchPage;
