import {
  CaretDown,
  CaretUp,
  Globe,
  Pen,
  Timer,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import React, { useState } from "react";
import styles from "../../styles/LaunchDetails.module.css";

const LaunchDetails = ({ launch }: any) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const showFailureDetails = () => {
    if (launch.status.failures.length == 0) return;
    setOpen(!isOpen);
  };

  console.log("launch", launch);

  const successLabel = launch.status.success ? "Success" : "Failure";
  return (
    <div
      className="f fd-c w-100-p"
      style={{ border: "1px solid white", padding: 24 }}
    >
      <div className="f fd-r ai-c w-100-p" style={{ gap: 24 }}>
        <div className="f fd-r fb-65 ai-c ">
          <Image
            src={launch.media.imageURL}
            height={60}
            width={60}
            alt={"SpaceX logo"}
          />
          <h2>
            Name:
            <a
              className="ml-12"
              href={launch.media.wiki}
              target="_blank"
              rel="noreferrer"
            >
              {launch.name}
            </a>
          </h2>
        </div>
        <div className="f fd-r f-1 jc-fe g-8">
          <h2 className="f fd-r g-8">
            Status:
            <div
              className={
                launch.status.success ? `${styles.success}` : `${styles.error}`
              }
            >
              {successLabel}
            </div>
          </h2>
          <div
            style={{ cursor: "pointer" }}
            onClick={() =>
              window.open(launch.media.article, "blank", "noreferrer")
            }
          >
            <Globe size={24} />
          </div>
        </div>
      </div>
      <div className="f fd-r w-100-p mt-24 g-8">
        <Timer size={24} />
        <h2>
          Date: <b>{launch.dateUTC}</b>
        </h2>
      </div>
      <div className="f fd-c w-100-p mt-12 g-8">
        <div className="f fd-r w-100-p g-8" onClick={showFailureDetails}>
          <Pen size={24} />
          <h2 style={{ maxWidth: "90%" }}>
            <i>{launch.status.details}</i>
          </h2>
          {launch.status.failures.length > 0 && (
            <div>
              {isOpen ? <CaretUp size={24} /> : <CaretDown size={24} />}
            </div>
          )}
        </div>

        {isOpen && launch.status.failures.length > 0 && (
          <>
            {launch.status.failures?.map(
              (
                failure: {
                  time: number;
                  altitude: null | number;
                  reason: string;
                },
                index: number
              ) => (
                <div
                  key={index}
                >{`Time: ${failure.time}, Altitude: ${failure.altitude}, Reason: ${failure.reason}`}</div>
              )
            )}
          </>
        )}
      </div>
      <div className="f fd-c w-100-p mt-24">Additional Info</div>
    </div>
  );
};

export default LaunchDetails;
