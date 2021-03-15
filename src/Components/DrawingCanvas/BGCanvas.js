import { useRef, useEffect, useState } from 'react';
import '../../Styles/DrawingCanvas/DrawingCanvas.css';

let lastColor = 'lightgray';

export default function BGCanvas({ width, height, magnification }) {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);
  const setColor = () => {
    if (lastColor === 'lightgray') {
      lastColor = 'darkgray';
    } else {
      lastColor = 'lightgray';
    }
  };
  useEffect(() => {
    if (ctx) {
      for (let x = 0; x < width; x++) {
        setColor();
        ctx.fillStyle = lastColor;
        for (let y = 0; y < height; y++) {
          setColor();
          ctx.fillStyle = lastColor;
          ctx.fillRect(x * magnification, y * magnification, magnification, magnification);
        }
      }
    }
  }, [ctx, width, height, magnification]);
  return <canvas id="bg-canvas" ref={canvasRef} width={width * magnification} height={height * magnification}></canvas>;
}
