import React, { useEffect, useState } from "react";
import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";
import dynamic from "next/dynamic";

const DynamicFontAwesomeIcon = dynamic<FontAwesomeIconProps>(() =>
  import("@fortawesome/react-fontawesome").then(
    (module) => module.FontAwesomeIcon,
  ),
);

export const RankingIcon: React.VFC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isMounted) {
    return <DynamicFontAwesomeIcon icon={faRankingStar} />;
  } else {
    return null; // または、適切なプレースホルダーを返します
  }
};
