import "./Map.css";
import { Nav, PeriodsButtonHover } from "../../../components/";
import { Link } from "react-router-dom";

export const Map = () => {
  return (
    <div className="map-background">
      <Nav />
      <header>HEADER</header>
      <div className="era-map">
        <div className="period-title-frame period-1">
          Triassic
          <br />
          Period
        </div>
        <div className="period-title-frame period-2">
          Jurassic
          <br />
          Period
        </div>
        <div className="period-title-frame period-3">
          Cretaceous
          <br />
          Period
        </div>

        <div className="user-character"></div>
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
            link="/triassic-medio"
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
            link="/jurassic-medio"
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
            link="/cretaceous-medio"
            dinos={[
              "info-cretaceous-2-dino-1",
              "info-cretaceous-2-dino-2",
              "info-cretaceous-2-dino-3",
            ]}
            infoOrientation="left"
        />
                <PeriodsButtonHover
            stage="stage-9"
            label="superior gallery"
            link="/cretaceous-medio"
            dinos={[
              "info-cretaceous-3-dino-1",
              "info-cretaceous-3-dino-2",
              "info-cretaceous-3-dino-3",
            ]}
            infoOrientation="left"
        />

      </div>
    </div>
  );
};
