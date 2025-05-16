import { useState, useEffect } from 'react';
import { AsistenteVirtual } from '../AsistenteVirtual/AsistenteVirtual.tsx';
import styles from './Tutorial.module.css';

interface ElementPosition {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface TutorialStep {
  text: string;
  highlightClass: string;
  elementId: string;
  boldWords?: string[];
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  dialogStyle?: React.CSSProperties;
}

const tutorialSteps: TutorialStep[] = [
  {
    text: "En la barra de navegación encontrarás acceso a todas las secciones principales: Galería, Juegos, Tienda, Cine, Biblioteca y más.",
    highlightClass: "navigation",
    elementId: "main-nav",
    boldWords: ["Galería", "Juegos", "Tienda", "Cine", "Biblioteca"],
    position: {
      bottom: "20%",
      left: "5%"
    },
    dialogStyle: {
      transform: 'translateY(20%) translateX(10%)',
      width: '60vh',
      height: '12vh',
    }
  },
  {
    text: "En el carrusel podrás explorar las diferentes galerías de dinosaurios organizadas por períodos geológicos.",
    highlightClass: "carousel",
    elementId: "carousel-container",
    boldWords: ["carrusel", "galerías", "períodos geológicos"],
    position: {
      top: "40%",
      right: "10%"
    },
    dialogStyle: {
      transform: 'translateY(20%) translateX(10%)',
      width: '60vh',
      height: '12vh',
    }
  },
  {
    text: "¡No olvides comprar tus entradas! Aquí podrás adquirir tickets para visitar nuestro museo.",
    highlightClass: "ticket",
    elementId: "ticket-purchase-container",
    boldWords: ["entradas", "tickets"],
    position: {
      bottom: "30%",
      right: "10%"
    },
    dialogStyle: {
      transform: 'translateY(20%) translateX(10%)',
      width: '40vh',
      height: '12vh',
    }
  }
];

interface TutorialProps {
  onClose: () => void;
}

export const Tutorial = ({ onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [elementPositions, setElementPositions] = useState<Record<string, ElementPosition>>({});

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const positions: Record<string, ElementPosition> = {};
    tutorialSteps.forEach(step => {
      if (step.elementId) {
        const element = document.getElementById(step.elementId);
        if (element) {
          const rect = element.getBoundingClientRect();
          positions[step.elementId] = {
            top: rect.top,
            left: rect.left,
            width: rect.width,
            height: rect.height
          };
        }
      }
    });
    setElementPositions(positions);

    const handleResize = () => {
      const updatedPositions: Record<string, ElementPosition> = {};
      tutorialSteps.forEach(step => {
        if (step.elementId) {
          const element = document.getElementById(step.elementId);
          if (element) {
            const rect = element.getBoundingClientRect();
            updatedPositions[step.elementId] = {
              top: rect.top,
              left: rect.left,
              width: rect.width,
              height: rect.height
            };
          }
        }
      });
      setElementPositions(updatedPositions);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('resize', handleResize);
      // Remove highlighted class from all elements
      tutorialSteps.forEach(step => {
        if (step.elementId) {
          const element = document.getElementById(step.elementId);
          if (element) {
            element.classList.remove('tutorial-highlighted');
          }
        }
      });
    };
  }, []);

  useEffect(() => {
    tutorialSteps.forEach(step => {
      if (step.elementId) {
        const element = document.getElementById(step.elementId);
        if (element) {
          element.classList.remove('tutorial-highlighted');
        }
      }
    });

    const currentElement = document.getElementById(tutorialSteps[currentStep].elementId);
    if (currentElement) {
      currentElement.classList.add('tutorial-highlighted');
    }
  }, [currentStep]);

  const handleClick = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep(prev => prev + 1);
        setIsVisible(true);
      }, 300);
    } else {
      onClose();
    }
  };

  const currentStepData = tutorialSteps[currentStep];
  const currentElementPosition = currentStepData.elementId ? elementPositions[currentStepData.elementId] : null;

  const getHighlightStyle = (): React.CSSProperties => {
    if (!currentElementPosition) {
      return { display: 'none' };
    }

    switch(currentStep) {
      case 0:
        return {
          top: `${currentElementPosition.top}px`,
          left: `${currentElementPosition.left}px`,
          width: `${currentElementPosition.width}px`,
          height: `${currentElementPosition.height}px`,
        };
      
      case 1:
        return {
          top: "32vh",
          left: "233.234px",
          width: "1399.5px",
          height: "60vh",
        };
      
      case 2:
        return {
          bottom: "3vh",
          right: "3%",
          width: "354.531px",
          height: "25vh",
        };
      
      default:
        return {
          top: `${currentElementPosition.top}px`,
          left: `${currentElementPosition.left}px`,
          width: `${currentElementPosition.width}px`,
          height: `${currentElementPosition.height}px`,
        };
    }
  };

  const getArrowStyle = (): React.CSSProperties => {
    if (!currentElementPosition) {
      return { };
    }

    switch(currentStep) {
      case 0:
      case 1:
        return {
          left: "78.5vh",
          top: "38%"
        };
      
      case 2:
        return {
          left: "57vh",
          top: "39%",
        };
      
      default:
        return {
          left: "78.5vh",
          top: "38%"
        };
    }
  };

  const getAssistantStyle = (): React.CSSProperties => {
    if (!currentElementPosition) {
      return {
        opacity: 0
      };
    }

    switch(currentStep) {
      case 0:
        return {
          top: "8vh",
          left: "21vh",
          transform: 'translateX(-50%) translateY(2vh)',
          opacity: isVisible ? 1 : 0
        };
      
      case 1:
        return {
          top: "36vh",
          left: "24vh",
          transform: 'translateX(-50%) translateY(-100%) translateY(-2vh)',
          opacity: isVisible ? 1 : 0
        };
      
      case 2:
        return {
          top: `${currentElementPosition.top}px`,
          left: `${currentElementPosition.left}px`,
          transform: 'translateY(-100%) translateY(-2vh) translateX(-100%) translateX(-2vh)',
          opacity: isVisible ? 1 : 0
        };
      
      default:
        return {
          opacity: 0
        };
    }
  };

  function mostrarTutorial() {
    return (
        <div className={styles.tutorialOverlay} onClick={handleClick}>
          <div
              className={`${styles.highlight} ${styles[currentStepData.highlightClass]}`}
              style={getHighlightStyle()}
          />
          <div
              className={styles.assistantContainer}
              style={getAssistantStyle()}
          >
            <AsistenteVirtual
                key={currentStep}
                text={currentStepData.text}
                boldWords={currentStepData.boldWords || []}
                looped={false}
                dialogStyle={currentStepData.dialogStyle}
            />
            <button className={styles.carouselBtn} style={getArrowStyle()}></button>
          </div>
        </div>
    );
  }

  return mostrarTutorial();
}; 