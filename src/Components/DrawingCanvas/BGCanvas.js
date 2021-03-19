import { useRef, useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../App';
import '../../Styles/DrawingCanvas/DrawingCanvas.css';

let lastColor = 'lightgray';

export default function BGCanvas({ width, height, magnification }) {
  const context = useContext(GlobalContext);
  const getLightBGColor = context.getLightBGColor;
  const getDarkBGColor = context.getDarkBGColor;
  const transparentBackgroundColor = context.transparentBackgroundColor;
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    lastColor = getLightBGColor();
  }, [transparentBackgroundColor, getLightBGColor]);
  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);
  useEffect(() => {
    const setColor = () => {
      if (lastColor === getLightBGColor()) {
        lastColor = getDarkBGColor();
      } else {
        lastColor = getLightBGColor();
      }
    };
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
  }, [ctx, width, height, magnification, getDarkBGColor, getLightBGColor, transparentBackgroundColor]);
  return <canvas id="bg-canvas" ref={canvasRef} width={width * magnification} height={height * magnification}></canvas>;
}
