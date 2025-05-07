import "./Map.css";
import { Nav, PeriodsButtonHover } from "../../../components/";
import { PeriodsButtonPremium } from "../../../components/PeriodsButtonPremium/PeriodsButtonPremium";

export const Map = () => {
  return (
    <div className="mapPage">
      <Nav />
      <div className="map">
        <div className="periodTitleGoldBg period1Container">
          <img src="/public/assets/img/map/period1Paws.png" alt="period level" />
          <div className="periodTitleFrame periodTitleFrame1">
            Triassic
            <br />
            Period
          </div>
        </div>

        <div className="periodTitleGoldBg period2Container">
          <img src="/public/assets/img/map/period1Paws.png" alt="period level" />
          <div className="periodTitleFrame periodTitleFrame2">
            Jurassic
            <br />
            Period
          </div>
        </div>

        <div className="periodTitleGoldBg period3Container">
          <img src="/public/assets/img/map/period1Paws.png" alt="period level" />
          <div className="periodTitleFrame periodTitleFrame3">
            Cretaceous
            <br />
            Period
          </div>
        </div>
      </div>
      <img src="/public/assets/img/map/raptor-bites.png" alt="Raptor Bites" className="raptorBites"/>

      {/* COMMON ROOMS */}
      <PeriodsButtonHover stage="main-entrance" label="main entrance" />

      <PeriodsButtonHover stage="entrance" label="entrance" infoOrientation="left"/>

      <PeriodsButtonHover stage="library" label="library" />

      <PeriodsButtonHover stage="store" label="store" />

      <PeriodsButtonPremium stage="kids-room" label="kids-room" />

      <PeriodsButtonHover stage="restroom restroom-1" label="restroom" />

      <PeriodsButtonHover stage="restroom restroom-2" label="restroom" />

      <PeriodsButtonHover stage="restroom restroom-3" label="restroom" />

      {/* STAGES */}

      <PeriodsButtonHover
        stage="stage-1"
        label="inferior gallery"
        link="/triassic-inferior"
        dinos={[
          "info-triassic-1-dino-1 small-dino",
          "info-triassic-1-dino-2 medium-dino",
          "info-triassic-1-dino-3 big-dino",
        ]}
      />
      <PeriodsButtonHover
        stage="stage-2"
        label="medium gallery"
        link="/triassic-medium"
        dinos={[
          "info-triassic-2-dino-1 small-dino",
          "info-triassic-2-dino-2 medium-dino",
          "info-triassic-2-dino-3 big-dino",
        ]}
      />
      <PeriodsButtonHover
        stage="stage-3"
        label="superior gallery"
        link="/triassic-superior"
        dinos={[
          "info-triassic-3-dino-1 small-dino",
          "info-triassic-3-dino-2 big-dino",
          "info-triassic-3-dino-3 medium-dino",
        ]}
      />
      <PeriodsButtonHover
        stage="stage-4"
        label="inferior gallery"
        link="/jurassic-inferior"
        dinos={[
          "info-jurassic-1-dino-1 medium-dino",
          "info-jurassic-1-dino-2 small-dino",
          "info-jurassic-1-dino-3 big-dino",
        ]} 
      />
      <PeriodsButtonHover
        stage="stage-5"
        label="medium gallery"
        link="/jurassic-medium"
        dinos={[
          "info-jurassic-2-dino-1 small-dino",
          "info-jurassic-2-dino-2 big-dino",
          "info-jurassic-2-dino-3 medium-dino",
        ]}
      />
      <PeriodsButtonHover
        stage="stage-6"
        label="superior gallery"
        link="/jurassic-superior"
        dinos={[
          "info-jurassic-3-dino-1 big-dino",
          "info-jurassic-3-dino-2 medium-dino",
          "info-jurassic-3-dino-3 small-dino",
        ]} 
        infoOrientation="left"
      />
      <PeriodsButtonHover
        stage="stage-7"
        label="inferior gallery"
        link="/cretaceous-inferior"
        dinos={[
          "info-cretaceous-1-dino-1 big-dino",
          "info-cretaceous-1-dino-2 small-dino",
          "info-cretaceous-1-dino-3 medium-dino",
        ]}
        infoOrientation="left"
      />
      <PeriodsButtonHover
        stage="stage-8"
        label="medium gallery"
        link="/cretaceous-medium"
        dinos={[
          "info-cretaceous-2-dino-1 big-dino",
          "info-cretaceous-2-dino-2 medium-dino",
          "info-cretaceous-2-dino-3 small-dino",
        ]}
        infoOrientation="left"
      />
      <PeriodsButtonHover
        stage="stage-9"
        label="superior gallery"
        link="/cretaceous-superior"
        dinos={[
          "info-cretaceous-3-dino-1 medium-dino",
          "info-cretaceous-3-dino-2 small-dino",
          "info-cretaceous-3-dino-3 big-dino",
        ]}
        infoOrientation="left"
      />
    </div>
  );
};
