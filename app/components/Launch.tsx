import React from "react";
import { RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import styles from "../../styles/Launches.module.css";
import Image from "next/image";
import { formatDate, formatSuccess } from "../helpers/format";

const launchTitles = [
  {
    key: "name",
    title: "",
    additionalStyle: { maxWidth: "250px" },
    func: (value: string) => <b>{value}</b>,
  },
  {
    key: "date_utc",
    title: "Launch Date: ",
    additionalStyle: {},
    func: (value: string) => formatDate(value),
  },
  {
    key: "success",
    title: "Launch Status: ",
    additionalStyle: {},
    func: (value: boolean) => formatSuccess(value),
  },
];

const Launch = ({ launch }: any) => {
  const hasImage = launch.links?.patch?.small;

  return (
    <div key={launch.id} className={styles.launchCard}>
      <div className={styles.launchHeader}>
        <h2 style={{ marginRight: "24px" }}>#{launch.flight_number}</h2>
        {hasImage ? (
          <Image
            src={launch.links?.patch?.small}
            height={50}
            width={50}
            alt={"SpaceX logo"}
          />
        ) : null}

        {launchTitles.map((launchStruct: any) => (
          <h2
            key={launchStruct.key}
            className={styles.item}
            style={{ ...launchStruct.additionalStyle }}
          >
            {launchStruct.title}
            {launchStruct.func(launch[launchStruct.key])}
          </h2>
        ))}
      </div>
      <div style={{ flexGrow: 1 }} />
      <Link className={styles.detailsButton} href={`/launch/${launch.id}`}>
        See Flight Details
        <RocketLaunch size={24} />
      </Link>
    </div>
  );
};

export default Launch;
