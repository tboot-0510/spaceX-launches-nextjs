import React from "react";
import styles from "../../styles/Header.module.css";
import Link from "next/link";
import SpaceXLogo from "../../public/spacex.svg";
import Image from "next/image";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link style={{ display: "flex" }} href="/">
          <Image src={SpaceXLogo} alt={"SpaceX logo"} />
        </Link>
      </div>
    </header>
  );
};

export default Header;
