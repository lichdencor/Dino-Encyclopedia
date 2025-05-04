import { useState } from "react";

interface GalleryCurtainsProps {
  customStyles: {
    courtains1: string;
    courtains2: string;
    courtains3: string;
    leftCurtain: string;
    rightCurtain: string;
    leftCurtainHover: string;
    rightCurtainHover: string;
    curtainHover: string;
  };
}

export const GalleryCurtains = ({ customStyles }: GalleryCurtainsProps) => {
  const [curtain1IsHovered, setCurtain1IsHovered] = useState<boolean>(false);
  const [curtain2IsHovered, setCurtain2IsHovered] = useState<boolean>(false);
  const [curtain3IsHovered, setCurtain3IsHovered] = useState<boolean>(false);
  const [second1Passed, setSecond1Passed] = useState<boolean>(false);
  const [second2Passed, setSecond2Passed] = useState<boolean>(false);
  const [second3Passed, setSecond3Passed] = useState<boolean>(false);

  return (
    <>
      <div
        className={`${customStyles.courtains1} ${curtain1IsHovered && second1Passed ? customStyles.curtainHover : ""}`}
        onMouseEnter={() => {
          setCurtain1IsHovered(true);
          setTimeout(() => setSecond1Passed(true), 1000);
        }}
      >
        <div className={`${customStyles.leftCurtain} ${curtain1IsHovered && customStyles.leftCurtainHover}`}></div>
        <div className={`${customStyles.rightCurtain} ${curtain1IsHovered && customStyles.rightCurtainHover}`}></div>
      </div>

      <div
        className={`${customStyles.courtains2} ${curtain2IsHovered && second2Passed ? customStyles.curtainHover : ""}`}
        onMouseEnter={() => {
          setCurtain2IsHovered(true);
          setTimeout(() => setSecond2Passed(true), 1000);
        }}
      >
        <div className={`${customStyles.leftCurtain} ${curtain2IsHovered && customStyles.leftCurtainHover}`}></div>
        <div className={`${customStyles.rightCurtain} ${curtain2IsHovered && customStyles.rightCurtainHover}`}></div>
      </div>

      <div
        className={`${customStyles.courtains3} ${curtain3IsHovered && second3Passed ? customStyles.curtainHover : ""}`}
        onMouseEnter={() => {
          setCurtain3IsHovered(true);
          setTimeout(() => setSecond3Passed(true), 1000);
        }}
      >
        <div className={`${customStyles.leftCurtain} ${curtain3IsHovered && customStyles.leftCurtainHover}`}></div>
        <div className={`${customStyles.rightCurtain} ${curtain3IsHovered && customStyles.rightCurtainHover}`}></div>
      </div>
    </>
  );
}; 