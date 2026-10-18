
import { useEffect, useRef, useState } from "react";
// import { useLayoutEffect, useRef, useState } from "react";

export default function ResizableBox() {
  const boxRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [resizeCount, setResizeCount] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      console.log("[resize] Событие изменения размера окна");
      setResizeCount((count) => count + 1);
    };

    window.addEventListener("resize", handleResize);
    console.log("[useEffect] Обработчик resize зарегистрирован");

    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("[useEffect] Обработчик resize удалён");
    };
  }, []);


  useEffect(() => {
    console.log("[useEffect] Начало измерения");

    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();

    setSize({
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });

    console.log("[useEffect] Размеры DOM:", {
      width: Math.round(rect.width),
      height: Math.round(rect.height),
    });
  }, [resizeCount]);


//   useLayoutEffect(() => {
//   const handleResize = () => {
//     console.log("[resize] Событие изменения размера окна");
//     setResizeCount((count) => count + 1);
//   };

//   window.addEventListener("resize", handleResize);
//   console.log("[useLayoutEffect] Обработчик resize зарегистрирован");

//   return () => {
//     window.removeEventListener("resize", handleResize);
//     console.log("[useLayoutEffect] Обработчик resize удалён");
//   };
// }, []);

// useLayoutEffect(() => {
//   console.log("[useLayoutEffect] Начало измерения");

//   if (!boxRef.current) return;

//   const rect = boxRef.current.getBoundingClientRect();

//   setSize({
//     width: Math.round(rect.width),
//     height: Math.round(rect.height),
//   });

//   console.log("[useLayoutEffect] Размеры DOM:", {
//     width: Math.round(rect.width),
//     height: Math.round(rect.height),
//   });
// }, [resizeCount]);

  return (
    <div style={{ padding: 20 }}>
      <h2>ResizableBox — useEffect</h2>

      <div
        ref={boxRef}
        style={{
          width: "min(60vw, 500px)",
          height: "200px",
          backgroundColor: "#b3d9ff",
          border: "2px solid #2673c9",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          transition: "width 0.2s ease",
        }}
      >
        <p>
          Ширина: {size.width}px
          <br />
          Высота: {size.height}px
        </p>
      </div>

      <p>Количество событий resize: {resizeCount}</p>
      <p>Откройте DevTools → Console, чтобы увидеть порядок выполнения.</p>
    </div>
  );
}
