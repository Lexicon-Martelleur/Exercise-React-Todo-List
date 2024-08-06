import React from "react";
import { ReactElement } from "react";

import { IIcon } from "./types";
import { IconSizeType } from "./types";
import styles from "./Icon.module.css";

interface Props {
  icon: IIcon;
  size?: IconSizeType;
  className?: string;
}

export const Icon: React.FC<Props> = ({
  icon,
  size,
  className
}): ReactElement => (() => {
  const inClasses = className ?? ""
  switch (size) {
    case "medium":
      return <img className={`${styles.medium} ${inClasses}`} {...icon} />
    case "large":
      return <img className={`${styles.large} ${inClasses}`} {...icon} />
    case "xlarge":
      return <img className={`${styles.xlarge} ${inClasses}`} {...icon} />
    case "small":
    default:
      return <img className={`${inClasses}`} {...icon} />
  }})();
