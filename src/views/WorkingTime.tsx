import { useState, useRef, useEffect } from "react";

const WorkingTime = () => {
  const finalColors = [
    "pink",
    "rgb(255, 255, 141)",
    "pink",
    "rgb(255, 255, 141)",
    "pink",
  ];
  const initialColor = "#E0E0E0";
  const durations = [
    2 * 60 * 60 * 1000, // 2 horas
    0.5 * 60 * 60 * 1000, // 0.5 horas
    2 * 60 * 60 * 1000, // 2 horas
    0.5 * 60 * 60 * 1000, // 0.5 horas
    3 * 60 * 60 * 1000, // 3 horas
  ];

  const [isRunning, setIsRunning] = useState(false);
  const [blockProgress, setBlockProgress] = useState(Array(5).fill(0));
  const timeoutsRef = useRef<(ReturnType<typeof setTimeout> | null)[]>([]);
  const animationFramesRef = useRef<number[]>([]);

  const animateBlock = (index: number, duration: number) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsedTime = Date.now() - startTime;
      const progress = Math.min(1, elapsedTime / duration);
      setBlockProgress((prevProgress) => {
        const newProgress = [...prevProgress];
        newProgress[index] = progress;
        return newProgress;
      });

      if (progress < 1) {
        animationFramesRef.current[index] = requestAnimationFrame(animate);
      } else if (index < durations.length - 1) {
        // Iniciar el siguiente bloque
        const nextIndex = index + 1;
        timeoutsRef.current[nextIndex] = setTimeout(() => {
          animateBlock(nextIndex, durations[nextIndex]);
        }, 100);
      } else {
        setIsRunning(false);
      }
    };
    animationFramesRef.current[index] = requestAnimationFrame(animate);
  };

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      cleanup(); // Limpiar antes de empezar
      setBlockProgress(Array(5).fill(0));
      animateBlock(0, durations[0]);
    }
  };

  const cleanup = () => {
    timeoutsRef.current.forEach(
      (timeoutId) => timeoutId && clearTimeout(timeoutId)
    );
    animationFramesRef.current.forEach(
      (frameId) => frameId && cancelAnimationFrame(frameId)
    );
    timeoutsRef.current = [];
    animationFramesRef.current = [];
  };

  useEffect(() => {
    return cleanup;
  }, []);

  // Función para obtener el estilo del gradiente
  const getGradientStyle = (index: number) => {
    const progress = blockProgress[index];
    const finalColor = finalColors[index];
    const colorStop = `${progress * 100}%`;
    return {
      background: `linear-gradient(to bottom, ${finalColor} ${colorStop}, ${initialColor} ${colorStop})`,
    };
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <button
        onClick={handleStart}
        disabled={isRunning}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          marginBottom: "1rem",
          cursor: "pointer",
        }}
      >
        {isRunning ? "Working..." : "Start"}
      </button>

      <div
        style={{
          width: "100%",
          borderRadius: "20px",
          backgroundColor: "white",
          color: "white",
          fontSize: "2rem",
          padding: "1rem",
          gap: "0.5rem",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Cloudy",
        }}
      >
        <div
          style={{
            ...getGradientStyle(0),
            borderRadius: "10px",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Work
        </div>
        <div
          style={{
            ...getGradientStyle(1),
            borderRadius: "10px",
            height: "20px",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div
          style={{
            ...getGradientStyle(2),
            borderRadius: "10px",
            height: "90px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Work
        </div>
        <div
          style={{
            ...getGradientStyle(3),
            borderRadius: "10px",
            height: "20px",
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <div
          style={{
            ...getGradientStyle(4),
            borderRadius: "10px",
            height: "135px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Work
        </div>
      </div>
    </div>
  );
};

export default WorkingTime;
