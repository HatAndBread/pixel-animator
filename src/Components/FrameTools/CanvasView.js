import { useRef, useEffect } from 'react';

export default function CanvasView({ width, height }) {
  const canvasRef = useRef();

  useEffect(() => {
    const can = canvasRef.current;
    if (can) {
      console.log(can);
    }
  }, []);
  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}
