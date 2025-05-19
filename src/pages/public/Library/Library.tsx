import { useEffect, useRef, useState } from "react";
import { Nav } from "../../../components";
import styles from "./Library.module.css";
import Book from "../Book/Book.tsx";
import { BookProgress } from "../../../components/BookProgress/BookProgress.tsx";

enum BookType {
    templateImageLeft = "templateImageLeft",
    templateImageBottomLeftAndTopRight = "templateImageBottomLeftAndTopRight",
    templateOnlyText = "templateOnlyText",
    templateImageBottomRight = "templateImageBottomRight",
}


const books = [
    {
        title: "Book 1",
        image: "/assets/img/bg/base.png",
        pages: [
            // DINOSAUR 1 - Ankylosaurus
            {
                type: BookType.templateImageLeft,
                title: "Ankylosaurus",
                imageLeftSrc: "./public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-birth.png",
                text: "Ankylosaurus embryos formed in sturdy eggshells balancing porosity and strength for gas exchange. Histology shows ossicle formation initiated already before pipping, conferring immediate armor. Nests comprised shallow scrapes in sediment, leveraging ambient warmth to coordinate emergence. Clutch sizes ranged from six to ten eggs, each roughly twenty-five centimeters long, reflecting parental care and fueling early yolk-driven growth.\n\nAnkylosaurus embryos formed in sturdy eggshells balancing porosity and strength for gas exchange. Histology shows ossicle formation initiated already before pipping, conferring immediate armor. Nests comprised shallow scrapes in sediment, leveraging ambient warmth to coordinate emergence. Clutch sizes ranged from six to ten eggs, each roughly twenty-five centimeters long, reflecting parental care and fueling early yolk-driven growth."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Ankylosaurus bore a broad, low muzzle with leaf-shaped teeth for cropping low vegetation. Its reinforced skull housed powerful jaw muscles able to shear tough foliage. A keratinous beak prepped shoots before occlusion, while molariform teeth ground plant matter. A capacious gut with fermentation chambers maximized nutrient extraction. Foraging was slow and deliberate, with sweeping movements of the snout across ground cover. The tail club was likely held aloft during feeding to deter ambush predators. Individuals likely foraged in small family groups along floodplain margins, tracking seasonal growth.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-food-2.png",
                lowerText: "Ankylosaurus primarily consumed low-growing vegetation such as ferns, horsetails, and cycads, cropping foliage with its broad beak and grinding it between leaf-shaped teeth. Its jaw architecture and gut adaptations processed fibrous plant matter efficiently. Seasonal shifts may have led to selective browsing of angiosperm shoots near floodplains, supplementing its diet with tough stems."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-characteristics.png",
                text: "Ankylosaurus was a heavily armored quadrupedal dinosaur reaching lengths of six to eight meters, its broad body shielded by fused osteoderms that formed a continuous protective armor. The low, triangular skull featured bony plates and reinforced jaws, while stout limbs bore massive weight. Its distinctive tail club served as a powerful defensive weapon. Estimated at six tonnes it inhabited floodplains its profile deterring predators."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Ankylosaurus displayed predominantly solitary behavior foraging slowly along floodplain undergrowth with a low-slung posture to crop low vegetation. When disturbed by predators it adopted a defensive stance, raising its armored osteoderms and swinging its massive tail club in forceful lateral arcs. Trackway evidence indicates limited gregariousness, suggesting that individuals rarely moved in coordinated groups. Osteoderm patterns and club morphology may have served intraspecific display or recognition. Bone histology and tooth microwear imply crepuscular feeding cycles, reducing midday heat stress. Low-frequency bellows likely mediated long-distance communication, while tactile signaling among proximate individuals reinforced social bonds. Periodic movements between habitats remain hypothetical, inferred from isotopic variation in fossils. Resting was sedentary with individuals using thick cover for concealment and energy conservation.",
                imageBottomRightSrc: "./public/assets/img/books/adults-3/ankylosaurus/ankylosaurus-behaviour.png",
                lowerText: "High-resolution CT scans of Ankylosaurus specimens revealed a dense network of blood vessels and nerve channels within its cranial osteoderms, indicating that its iconic armor also functioned in sensory reception and thermoregulation, an exceptional adaptation overall."
            },
            // DINOSAUR 2 - Brachiosaurus
            {
                type: BookType.templateImageLeft,
                title: "Brachiosaurus",
                imageLeftSrc: "./public/assets/img/books/adults-2/brachiosaurus/brachiosaurus-birth.png",
                text: "Brachiosaurus eggs were laid in clusters within semi-arid floodplain environments, where heat from the tropical sun and organic detritus provided consistent incubation. Shell microstructure reveals pores adapted for moisture exchange, while embryonic bone histology demonstrates accelerated growth rates, preparing hatchlings for immediate quadrupedal support and rapid respiratory demands. Monsoon onset improved hatchling resource use.\n\nFossilized clutches attributed to Brachiosaurus display egg arrangement patterns consistent with philopatric nesting, suggesting repeated returns to ancestral sites. Sedimentological context indicates rapid burial events that preserved embryonic remains, enabling isotopic analysis of fluid exchange. Such evidence enhances understanding of sauropod reproductive strategies and paleoenvironmental adaptations. Rare isotopic data emerges."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Brachiosaurus used refined neck mechanics when feeding. Attachments guided head rotation for feeding effectiveness. Neural control enhanced feeding posture shift. Models confirm feeding reach under strain. FEA shows modulated cervical stress patterns during feeding. Pneumatic vertebrae lowered neck mass to enable movements. EMG analogs suggest muscle activation feeding cycles. Mandibular joint allowed lateral grinding during feeding. Trunk flexibility aided posture adjustment during feeding. Postures during feeding optimized energy expenditure. Studies of feeding mechanics refines sauropod morphology.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/brachiosaurus/brachiosaurus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/brachiosaurus/brachiosaurus-food-2.png",
                lowerText: "Brachiosaurus was herbivorous. Gastroliths aided breakdown of plant material. Dental wear shows adaptation to vegetation abrasiveness. Microbial fermentation chambers optimized energy yield. Enlarged ceca and colon improved cellulose digestion. Seasonal resource shifts influenced fermentation rate. Hindgut retention time exceeded those of small herbivores."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/brachiosaurus/brachiosaurus-characteristics.png",
                text: "Brachiosaurus had an elongated neck with thirteen cervical vertebrae, each bearing pneumatic chambers that reduced skeletal weight. The forelimbs were proportionally longer than the hindlimbs, elevating the shoulder and granting a steep feeding posture. The sacral region supported a massive pelvis, anchoring strong hip musculature. A robust trunk housed extensive air sac diverticula, optimizing respiratory efficiency, aiding balance.\n\nDetailed cranial anatomy reveals a skull with proportionally small head size relative to body housing spoonshaped teeth arranged in parallel rows along elongated jaws. Mandibular articulation allowed lateral movements during browsing. Extensive pneumatic foramina permeated dorsal vertebrae enhancing mass reduction. Presacral air sacs penetrated neural canals. Ossified tendons stabilized tail and trunk segments against flexion forces."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Brachiosaurus likely traveled in cohesive herds across floodplain landscapes, exhibiting site fidelity during seasonal migrations aligned with monsoonal rainfall. Parallel trackway sets imply coordinated group movement at moderate pacing speeds, while juveniles occupied central positions for predator protection. Intraspecific communication may have included complex neck postures and low-frequency vocalizations, facilitated by elongated cervical air sacs and resonating cavities. Resting behaviors occurred in open clearings, with individuals adopting elevated stances for improved vigilance. Parental investment possibly encompassed nest defense and juvenile escorting through dense foliage. Migration routes likely followed riverine corridors and resource gradients across extensive floodplain ecosystems. Seasonal cohorts maintained optimal spacing to optimize resource use and reduce intergroup competition across varied terrain. Herd spacing!",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/brachiosaurus/brachiosaurus-behaviour.png",
                lowerText: "Analyses of Brachiosaurus specimens reveal pneumatic structures within vertebrae and ribs, enhancing respiratory efficiency. Elemental ratio from bone apatite traces seasonal habitat shifts. These findings refine interpretations of sauropod palaeobiology and ontogeny."
            },
            // DINOSAUR 3 - Coelophysis
            /*
-Dino: "Coelophysis"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Coelophysis",
                imageLeftSrc: "./public/assets/img/books/adults-2/coelophysis/coelophysis-birth.png",
                text: "Coelophysis embryos developed within elongated ovoid eggs incubated in shallow communal nests that formed in semi-arid flood basins. Sedimentological data indicate that nest mounds retained moisture and thermal stability. Eggshell microstructure analyses reveal high porosity to facilitate gas exchange in variable environments. Embryonic bone histology shows rapid ossification of limb and vertebral elements prior to hatching robustly.\n\nFossilized nests attributed to Coelophysis occur within floodplain silts interleaved with fine sandstone layers. Clutch arrangements demonstrate groupings, suggesting communal oviposition behaviors. Stable isotope assays on eggshell carbonate provide paleoclimate proxies and embryonic respiration data. Morphological examination of perinate bones reveals well-developed limb proportions and neural arch ossification prior to emergence."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Coelophysis possessed a narrow skull and lightly built jaws equipped with recurved, serrated teeth optimized for grasping small vertebrate prey. High gape angles enabled rapid snapping motions, while cervical flexibility allowed vertical and lateral head swings. Muscular attachment sites indicate powerful adductor muscles for forceful jaw closure. Feeding kinematics inferred from comparative analogs suggest rapid strikes aided by keen visual acuity. Cranial fenestrae reduced bone mass without compromising structural integrity during feeding sequences Biomechanical models outline strike velocity rates."
,
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/coelophysis/coelophysis-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/coelophysis/coelophysis-food-2.png",
                lowerText: "Coelophysis was a small theropod carnivore that preyed on insects, lizards, and juvenile vertebrates. Toothed jaws facilitated efficient slicing of soft tissues. Stomach contents preserved within specimens include fish scales and small reptilian remains. Episodes of gizzard stones in gut indicate mechanical processing of food. Seasonal prey availability influenced foraging behaviors and energy expenditure."

            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/coelophysis/coelophysis-characteristics.png",
                text: "Coelophysis exhibited a lightweight, gracile frame with hollow limb bones and a long, flexible tail that maintained balance during fast bipedal locomotion. Its narrow skull housed blade-like teeth optimized for small prey capture. Cervical vertebrae were slender, supported by ossified tendons for neck stability. Pelvic articulation and elongated hind limbs enabled sustained cursorial efficiency. Hollow fenestrae reduced cranial mass.\n\nProportional limb ratios show hind limbs exceeded forelimbs by approximately thirty percent, supporting rapid acceleration. The compact pelvis bore robust muscle scars for agile locomotion. Bone histology reveals fast cortical growth during juvenile development. Tail chevrons increased lateral stability. Manual claw morphology suggests grasping precision. Braincase analyses indicate enlarged optic lobes and acute visual processing. ."

            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Coelophysis likely formed social groups, as indicated by multiple skeletons preserved together in floodplain bonebeds. Trackway assemblages attributed to this genus reveal parallel individuals moving at similar stride length, implying coordinated herding behavior. Such group dynamics may have enhanced predator detection and foraging efficiency. Rapid locomotion and agile turning were key defense strategies, supported by flexible tails and slender hind limbs. Vocalizations generated via an elongated hyoid apparatus likely facilitated low-frequency communication across habitats. Intraspecific interactions may have included tail displays and head-bobbing rituals for dominance establishment. Seasonal migrations along river corridors offered access to resources and fostered social cohesion. Evidence of healed bite wounds on bones indicates occasional aggression or competition within groups, further underscoring complex behavioral repertoire.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/coelophysis/coelophysis-behaviour.png",
                lowerText: "CT scans of Coelophysis specimens reveal extensive pneumatized cervical vertebrae and air sac extensions, indicating sophisticated respiratory adaptations. Rostral canal structures suggest refined olfactory capabilities. Data illuminate sensory and pulmonary evolution."
            },

            // DINOSAUR 4 - Compsognathus
            /*
            -Dino: "Compsognathus"
            -Tematica: ""
            -placeholder: ""
            */
            {
                type: BookType.templateImageLeft,
                title: "Compsognathus",
                imageLeftSrc: "./public/assets/img/books/adults-2/compsognathus/compsognathus-birth.png",
                text: "Compsognathus embryos hatched from tiny eggs each dawn.\n\n Embryonic bone reveals rapid limb, vertebral ossifications. Cranial fenestrae aided embryo, gas diffusion. Thermal sand preserved embryo heat evenly. Eggshell porosity modulated moisture retention in sediments. Embryonic limb proportions reveal locomotive competency  . Yolk sac supports vascular embryo metabolism  . Perinate mandibles show early ossification prior to emergence."

            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Compsognathus evolved precise neck articulation to snatch insect prey with minimal muscle effort. Cervical vertebrae bore enlarged articular surfaces for rapid strikes. Ligamentous recoil stored elastic energy during head retraction. Kinematic models demonstrate high-speed jaw closure at low cost. Serrated teeth engaged in rapid slicing while cranial fenestrae reduced skull mass, optimizing strike mechanics. Comparative FEA highlights stress distribution favorable for repeated feeding bouts. Neuromuscular analogs predict controlled activation patterns during prey capture. Flexible mandibular symphysis allowed slight lateral grinding between strikes.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/compsognathus/compsognathus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/compsognathus/compsognathus-food-2.png",
                lowerText: "Compsognathus functioned as an opportunistic small-prey carnivore, targeting arthropods, crustaceans, and juvenile vertebrates. Conical teeth facilitated efficient puncture and retention of slippery prey. Fossilized gut contents include fish scales and diminutive reptilian bones."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/compsognathus/compsognathus-characteristics.png",
                text: "Compsognathus had a lightweight skeleton with hollow bones and a slender, counterbalancing tail enabling rapid agility.  Its narrow skull featured large antorbital fenestrae and a delicate mandible lined with fine serrated teeth.  Ossified tendons reinforced the dorsal vertebrae, while neural spines supported potent muscle attachments.  Filamentous integumentary traces suggest primitive feather presence for thermoregulation and display. Cranial kinesis aided capture.\n\nProportional limb ratios reveal elongated hindlimbs for cursorial prowess, with forelimbs featuring three grasping digits tipped by recurved claws.  The pelvis exhibited an open acetabulum, facilitating efficient limb rotation.  Braincase morphology indicates acute vision and coordination, while ossified sternal plates imply robust respiratory mechanics.  Adult body mass approximated three kilograms."

            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Compsognathus likely exhibited solitary or small-group behaviors, as fossil assemblages rarely exceeded handfuls of individuals.  High stride length differences in trackways indicate rapid pursuit behavior, while gracile tail musculature suggests agile maneuvering during evasion. Territorial displays may have included lateral body flaring and tail whipping. Seasonal patterns inferred from bonebed isotopes imply periodic congregation in resource-rich areas, possibly linked to mating or nesting. Intraspecific interactions likely involved visual signals and low-frequency vocalizations for social cohesion. Predation avoidance strategies favored burst sprints supported by lightweight anatomy. Limited nest guarding is inferred from taphonomic context but remains debated among paleontologists. Juveniles may have formed packs. Courtship likely involved head bobbing. Trackways indicate coordinated movement along floodplain corridors. Rare remains.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/compsognathus/compsognathus-behaviour.png",
                lowerText: "High-resolution CT scans of Compsognathus fossils reveal endocranial cavities and preserved muscle impressions, indicating pneumatic systems. Bone histology shows rapid juvenile growth and seasonal growth patterns."
            },

            // DINOSAUR 5 - Microceratus
            /*
-Dino: "Microceratus"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Microceratus",
                imageLeftSrc: "./public/assets/img/books/adults-2/microceratus/microceratus-birth.png",
                text: "Microceratus eggs were deposited in shallow scrapes within sandy floodplain substrates, where diurnal temperature fluctuations drove embryonic development rates. Clutch arrangements suggest communal nesting zones, facilitating thermal regulation through substrate conductivity. Eggshell porosity analyses indicate adaptations for moisture diffusion in semi-arid contexts. Embryonic bone histology reveals accelerated ossification of limb elements for immediate post-hatch locomotion. Cranial ossification centers form early to support feeding behaviors upon emergence."

            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Microceratus developed a robust rostral beak and flexible jaw articulation to browse low-growing vegetation with minimal energy expenditure. Coronoid process hypertrophy provided enhanced muscle leverage for precise cropping motions. Mandibular kinesis reduced stress during repetitive biting sequences. Comparative jaw mechanics models highlight optimized bite force distribution across the dentary. Elongated cervical musculature supported sustained head movements during foraging bouts in dense undergrowth. Osteohistological data suggest rapid bone deposition under feeding loads."
,
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/microceratus/microceratus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/microceratus/microceratus-food-2.png",
                lowerText: "Microceratus subsisted on low-lying ferns, horsetails, and early angiosperm shoots, using its keratinous beak to shear tender plant tissues. Dental morphology indicates a preference for soft foliage with minimal grit abrasion. Pollen grains and phytoliths preserved in coprolites corroborate fern and cycad consumption. Seasonal shifts in preferred plant taxa likely influenced foraging range and gut retention times."

            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/microceratus/microceratus-characteristics.png",
                text: "Microceratus possessed a lightweight, gracile skeleton with elongated hindlimbs supporting agile bipedal locomotion. Its skull featured a broad rostral bone forming a keratinous beak and paired jugal horns of minimal projection. Cervical vertebrae exhibit ossified tendons for neck stabilization, while dorsal ribs incorporate ventrolateral flanges enhancing trunk rigidity. Limb proportions reveal a hindlimb-to-forelimb ratio exceeding 1.4, reflecting cursorial capacity. Filamentous integument traces on fossilized skin impressions suggest primitive protofeathers for thermoregulation and display.\n\nThe pelvic girdle displays an open acetabular structure permitting efficient limb cycling, and the sacral region includes three fused vertebrae anchoring robust hindlimb musculature."

            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Microceratus likely formed small social groups, as shown by bonebeds in fluvial deposits. Trackway sets exhibit parallel strides, implying coordinated locomotion for vigilance. Display behaviors may have included lateral body inflation, tail flicking, and head-bobbing conveying dominance or mating intent. Seasonal resource fluctuations drove periodic migrations along floodplain corridors to exploit grazing areas. Territorial calls, inferred from hyoid anatomy, facilitated group cohesion across habitats. Nest site selection appears opportunistic, with relocations following sediment deposition patterns. Evidence of healed bite marks suggests intra or interspecific confrontations, reflecting territorial disputes. Agile limb proportions and acceleration patterns in trackways underscore predator avoidance as a primary behavioral driver. Enlarged orbital and auditory features imply advanced sensory communication capabilities. New fossil data."
,
                imageBottomRightSrc: "./public/assets/img/books/adults-2/microceratus/microceratus-behaviour.png",
                lowerText: "Microceratus bone histology reveals lines of arrested growth indicating seasonal metabolic modulation. CT imaging exposes expanded sinus cavities within nasal passages, suggesting enhanced olfactory capabilities."

            },

            // DINOSAUR 6 - Pachycephalosaurus
            /*
-Dino: "Pachycephalosaurus"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Pachycephalosaurus",
                imageLeftSrc: "./public/assets/img/books/adults-2/pachycephalosaurus/pachycephalosaurus-birth.png",
                text: "Pachycephalosaurus embryos developed within shallow nests excavated in well‐drained floodplain soils, where diurnal temperature cycles regulated incubation depth. Eggshell microstructure shows elevated pore density to balance gas exchange and moisture retention in semi‐arid conditions. Histological analysis of embryonic long bones reveals early ossification of cranial domes, anticipating the characteristic thick skull roof of neonates. Vascularized endosteal surfaces supported rapid skeletal growth prior to hatching, promoting immediate locomotor competence.\n\nSediment infill around preserved clutches indicates episodic flooding deposited fine silts that protected eggs from desiccation. Stable isotope assays of eggshell carbonate capture paleoenvironmental humidity fluctuations."

            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Pachycephalosaurus evolved a reinforced cranial dome and specialized jaw musculature to deliver strong bite forces at low energy cost during selective browsing. Massive supraoccipital shields redistributed occlusal stress across the skull roof, while broad lateral muscle attachments on the parietal crest enhanced adductor leverage. Mandibular kinesis allowed slight anteroposterior movement, smoothing repetitive cropping motions. Computational FEA models demonstrate optimal stress attenuation through domal curvature, reducing strain in cranial bones."
,
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/pachycephalosaurus/pachycephalosaurus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/pachycephalosaurus/pachycephalosaurus-food-2.png",
                lowerText: "Pachycephalosaurus primarily consumed low‐growing ferns, horsetails, and young angiosperm shoots, using a keratinous beak to shear tender plant tissues. Dental microwear patterns indicate minimal abrasion, suggesting selective cropping of soft foliage rather than coarse browsing. Phytoliths recovered from coprolites corroborate a diet rich in early flowering plants and fern fronds. Gastroliths preserved in body cavities imply auxiliary mechanical grinding in the hindgut."


            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/pachycephalosaurus/pachycephalosaurus-characteristics.png",
                text: "Pachycephalosaurus possessed a massive, domed skull formed by thickened frontals and parietals, with internal trabecular architecture to absorb high‐impact forces. The short, muscular neck bore robust cervical vertebrae, while the torso was supported by a stiffened rib cage and ossified tendons along the dorsal column. Forelimbs were comparatively short with five‐digit hands, whereas the hindlimbs featured elongated metatarsals and a stiff tail counterbalancing the cranial mass. Filamentous integument traces suggest a covering of primitive protofeathers for thermoregulation. Neurovascular foramina patterns on the skull roof imply a sensitive integumentary covering, possibly used for visual display."


            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Pachycephalosaurus likely engaged in ritualized head‐butting contests to establish social hierarchy. Herd trackways reveal synchronized gait patterns and maintained spacing for predator vigilance. Vocalizations may have included low‐frequency rumbling calls produced by pneumatic sinus systems. Lateral dome presentations and measured head‐bobbing served as visual signals during interactions. Seasonal resource shifts prompted migrations between nesting uplands and floodplain feeding areas. Bonebeds with mixed‐age individuals indicate occasional grouping beyond immediate family units. Healed cranial lesions confirm repeated but non‐lethal impacts consistent with controlled combat. Nesting sites appear opportunistic, with shallow scrapes in well‐drained sediments. Dome height provided panoramic vantage points for early predator detection.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/pachycephalosaurus/pachycephalosaurus-behaviour.png",
                lowerText: "Recent CT scanning of pachycephalosaur domes reveals complex internal sinus networks and trabecular reinforcements that dissipate impact forces. Isotopic analysis of bone phosphate indicates rapid juvenile growth spurts and seasonal metabolic fluctuations. These findings refine our understanding of cranial function and life history in dome‐headed dinosaurs."

            },

            // DINOSAUR 7 - Stegosaurus
            /*
-Dino: "Stegosaurus"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Stegosaurus",
                imageLeftSrc: "./public/assets/img/books/adults-2/stegosaurus/stegosaurus-birth.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/stegosaurus/stegosaurus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/stegosaurus/stegosaurus-food-2.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/stegosaurus/stegosaurus-characteristics.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/stegosaurus/stegosaurus-behaviour.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            },

            // DINOSAUR 8 - Triceratops
            /*
-Dino: "Triceratops"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Triceratops",
                imageLeftSrc: "./public/assets/img/books/adults-2/triceratops/triceratops-birth.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/triceratops/triceratops-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/triceratops/triceratops-food-2.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/triceratops/triceratops-characteristics.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/triceratops/triceratops-behaviour.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            },

            // DINOSAUR 9 - Tyrannosaurus rex
            /*
-Dino: "Tyrannosaurus rex"
-Tematica: ""
-placeholder: ""
*/
            {
                type: BookType.templateImageLeft,
                title: "Tyrannosaurus",
                imageLeftSrc: "./public/assets/img/books/adults-2/tyrannosaurus/ankylosaurus-birth.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomLeftAndTopRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                foodName: "Food Name",
                imageBottomLeftSrc: "./public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-food-1.png",
                imageTopRightSrc: "./public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-food-2.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis."
            },
            {
                type: BookType.templateImageLeft,
                imageLeftSrc: "./public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-characteristics.png",
                text: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.\n\nLorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos."
            },
            {
                type: BookType.templateImageBottomRight,
                upperText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.",
                imageBottomRightSrc: "./public/assets/img/books/adults-2/ankylosaurus/ankylosaurus-behaviour.png",
                lowerText: "Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis."
            }

        ]
    }
];

const currentBook = books[0];
const pagesCount = currentBook.pages.length/2;

export const Library = () => {
    const [currentProgress, setCurrentProgress] = useState(0);

    return (
        <div className={styles.libraryContainer}>
            <Nav />
            <Book book={currentBook} setCurrentProgress={setCurrentProgress} />
      <BookProgress pages={pagesCount} progress={currentProgress} />
        </div>
    );
};

export default Library;
