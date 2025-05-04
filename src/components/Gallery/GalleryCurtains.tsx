import { useState, useEffect } from "react";
import { useProgress } from "../../context/Progress/ProgressProvider";

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
  era: "triassic" | "jurassic" | "cretaceous";
  period: "Early" | "Medium" | "Superior" | "Late";
}

export const GalleryCurtains = ({ customStyles, era, period }: GalleryCurtainsProps) => {
  const { progress, setProgress } = useProgress();
  const [curtain1IsHovered, setCurtain1IsHovered] = useState<boolean>(false);
  const [curtain2IsHovered, setCurtain2IsHovered] = useState<boolean>(false);
  const [curtain3IsHovered, setCurtain3IsHovered] = useState<boolean>(false);
  const [second1Passed, setSecond1Passed] = useState<boolean>(false);
  const [second2Passed, setSecond2Passed] = useState<boolean>(false);
  const [second3Passed, setSecond3Passed] = useState<boolean>(false);
  const [curtainsState, setCurtainsState] = useState<{[key: string]: boolean}>({
    curtain1: false,
    curtain2: false,
    curtain3: false
  });

  useEffect(() => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const periodData = progress.galleries[0][eraKey].find(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodData?.hoveredCurtains) {
      const savedState = {
        curtain1: periodData.hoveredCurtains.curtain1,
        curtain2: periodData.hoveredCurtains.curtain2,
        curtain3: periodData.hoveredCurtains.curtain3
      };
      setCurtainsState(savedState);

      // Set initial states based on saved data
      if (savedState.curtain1) {
        setCurtain1IsHovered(true);
        setSecond1Passed(true);
      }
      if (savedState.curtain2) {
        setCurtain2IsHovered(true);
        setSecond2Passed(true);
      }
      if (savedState.curtain3) {
        setCurtain3IsHovered(true);
        setSecond3Passed(true);
      }
    }
  }, [era, period, progress]);

  const updateCurtainInProgress = (curtainNumber: number) => {
    const eraKey = `era_${era}` as keyof typeof progress.galleries[0];
    const newProgress = { ...progress };
    const periodIndex = newProgress.galleries[0][eraKey].findIndex(
      (p) => p.period === `${period} ${era.charAt(0).toUpperCase() + era.slice(1)}`
    );

    if (periodIndex !== -1) {
      newProgress.galleries[0][eraKey][periodIndex].hoveredCurtains = {
        ...newProgress.galleries[0][eraKey][periodIndex].hoveredCurtains,
        [`curtain${curtainNumber}`]: true
      };
      setProgress(newProgress);
    }
  };

  const handleCurtainHover = (curtainNumber: number) => {
    const setters = {
      1: { hover: setCurtain1IsHovered, second: setSecond1Passed },
      2: { hover: setCurtain2IsHovered, second: setSecond2Passed },
      3: { hover: setCurtain3IsHovered, second: setSecond3Passed }
    };

    setters[curtainNumber as 1 | 2 | 3].hover(true);
    setTimeout(() => {
      setters[curtainNumber as 1 | 2 | 3].second(true);
      setCurtainsState(prev => ({
        ...prev,
        [`curtain${curtainNumber}`]: true
      }));
      updateCurtainInProgress(curtainNumber);
    }, 1000);
  };

  return (
    <>
      {!curtainsState.curtain1 && (
        <div
          className={`${customStyles.courtains1} ${curtain1IsHovered && second1Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => handleCurtainHover(1)}
        >
          <div className={`${customStyles.leftCurtain} ${curtain1IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain1IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>
      )}

      {!curtainsState.curtain2 && (
        <div
          className={`${customStyles.courtains2} ${curtain2IsHovered && second2Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => handleCurtainHover(2)}
        >
          <div className={`${customStyles.leftCurtain} ${curtain2IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain2IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>
      )}

      {!curtainsState.curtain3 && (
        <div
          className={`${customStyles.courtains3} ${curtain3IsHovered && second3Passed ? customStyles.curtainHover : ""}`}
          onMouseEnter={() => handleCurtainHover(3)}
        >
          <div className={`${customStyles.leftCurtain} ${curtain3IsHovered && customStyles.leftCurtainHover}`}></div>
          <div className={`${customStyles.rightCurtain} ${curtain3IsHovered && customStyles.rightCurtainHover}`}></div>
        </div>
      )}
    </>
  );
}; 