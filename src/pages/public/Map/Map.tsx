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
          <img src="/public/assets/img/map/period2Paws.png" alt="period level" />
          <div className="periodTitleFrame periodTitleFrame2">
            Jurassic
            <br />
            Period
          </div>
        </div>

        <div className="periodTitleGoldBg period3Container">
          <img src="/public/assets/img/map/period3Paws.png" alt="period level" />
          <div className="periodTitleFrame periodTitleFrame3">
            Cretaceous
            <br />
            Period
          </div>
        </div>
      </div>
      <img src="/public/assets/img/map/raptor-bites.png" alt="Raptor Bites" className="raptorBites" />

      {/* COMMON ROOMS */}
      <PeriodsButtonHover stage="main-entrance" label="main entrance" />

      <PeriodsButtonHover stage="entrance" label="entrance" infoOrientation="left" />

      <PeriodsButtonHover
        stage="library"
        label="library"
        link="/library"
      />

      <PeriodsButtonHover
        stage="store"
        label="store"
        link="/store"
      />

      <PeriodsButtonPremium stage="kids-room" label="kids-room" />

      <PeriodsButtonHover stage="restroom restroom-1" label="restroom" />

      <PeriodsButtonHover stage="restroom restroom-2" label="restroom" />

      <PeriodsButtonHover stage="restroom restroom-3" label="restroom" />

      {/* STAGES */}

      <PeriodsButtonHover
        stage="stage-1"
        era="triassic"
        period="inferior"
        label="inferior gallery"
        link="/triassic-inferior"
        dinos={[
          "info-triassic-1-dino-1 small-dino",
          "info-triassic-1-dino-2 medium-dino",
          "info-triassic-1-dino-3 big-dino"
        ]}
        dinoNames={[
          "Postosuchus",
          "Eoraptor",
          "Herrerasaurus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-2"
        era="triassic"
        period="medium"
        label="medium gallery"
        link="/triassic-medium"
        dinos={[
          "info-triassic-2-dino-1 small-dino",
          "info-triassic-2-dino-2 medium-dino",
          "info-triassic-2-dino-3 big-dino"
        ]}
        dinoNames={[
          "Dilophosaurus",
          "Compsognathus",
          "Cryolophosaurus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-3"
        era="triassic"
        period="superior"
        label="superior gallery"
        link="/triassic-superior"
        dinos={[
          "info-triassic-3-dino-1 small-dino",
          "info-triassic-3-dino-2 big-dino",
          "info-triassic-3-dino-3 medium-dino",
        ]}
        dinoNames={[
          "Pachycephalosaurus",
          "Microceratus",
          "Gallimimus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-4"
        era="jurassic"
        period="inferior"
        label="inferior gallery"
        link="/jurassic-inferior"
        dinos={[
          "info-jurassic-1-dino-1 medium-dino",
          "info-jurassic-1-dino-2 small-dino",
          "info-jurassic-1-dino-3 big-dino",
        ]}
        dinoNames={[
          "Shuvosaurus",
          "Chindesaurus",
          "Fukuiraptor"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-5"
        era="jurassic"

        period="" label="medium gallery"
        link="/jurassic-medium"
        dinos={[
          "info-jurassic-2-dino-1 small-dino",
          "info-jurassic-2-dino-2 big-dino",
          "info-jurassic-2-dino-3 medium-dino",
        ]}
        infoOrientation="left"
        dinoNames={[
          "Allosaurus",
          "Apatosaurus",
          "Camarasaurus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-6"
        era="jurassic"

        period="" label="superior gallery"
        link="/jurassic-superior"
        dinos={[
          "info-jurassic-3-dino-1 big-dino",
          "info-jurassic-3-dino-2 medium-dino",
          "info-jurassic-3-dino-3 small-dino",
        ]}
        infoOrientation="left"
        dinoNames={[
          "Spinosaurus",
          "Baryonyx",
          "Irritator"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-7"
        era="cretaceous"
        period=""
        label="inferior gallery"
        link="/cretaceous-inferior"
        dinos={[
          "info-cretaceous-1-dino-1 big-dino",
          "info-cretaceous-1-dino-2 small-dino",
          "info-cretaceous-1-dino-3 medium-dino",
        ]}
        infoOrientation="left"
        dinoNames={[
          "Coelophysis",
          "Plateosaurus",
          "Rauisuchus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-8"
        era="cretaceous"
        period=""
        label="medium gallery"
        link="/cretaceous-medium"
        dinos={[
          "info-cretaceous-2-dino-1 big-dino",
          "info-cretaceous-2-dino-2 medium-dino",
          "info-cretaceous-2-dino-3 small-dino",
        ]}
        infoOrientation="left"
        dinoNames={[
          "Brachiosaurus",
          "Diplodoco",
          "Stegosaurus"
        ]}
      />
      <PeriodsButtonHover
        stage="stage-9"
        era="cretaceous"
        period=""
        label="superior gallery"
        link="/cretaceous-superior"
        dinos={[
          "info-cretaceous-3-dino-1 medium-dino",
          "info-cretaceous-3-dino-2 small-dino",
          "info-cretaceous-3-dino-3 big-dino",
        ]}
        infoOrientation="left"
        dinoNames={[
          "Ankylosaurus",
          "Triceratops",
          "Tyrannosaurus"
        ]}
      />
    </div>
  );
};
