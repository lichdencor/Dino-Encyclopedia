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
          label="inferior"
          link="/triassic-inferior"
          description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
          dinos={[
            "info-triassic-dino-1",
            "info-triassic-dino-2",
            "info-triassic-dino-3",
          ]}
        />
        <PeriodsButtonHover
            stage="stage-2"
            label="medio"
            link="/triassic-medio"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-3"
            label="superior"
            link="/triassic-superior"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-4"
            label="inferior"
            link="/jurassic-inferior"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-5"
            label="medio"
            link="/jurassic-medio"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-6"
            label="superior"
            link="/jurassic-superior"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-7"
            label="inferior"
            link="/cretaceous-inferior"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />
        <PeriodsButtonHover
            stage="stage-8"
            label="inferior"
            link="/cretaceous-medio"
            description="Hacé click para conocer a los dinosaurios: Dino, Dino, Dino"
            dinos={[
              "info-triassic-dino-1",
              "info-triassic-dino-2",
              "info-triassic-dino-3",
            ]}
        />

      </div>
    </div>
  );
};
