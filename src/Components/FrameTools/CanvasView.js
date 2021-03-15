import { useRef, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function CanvasView({ width, height, num }) {
  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  const context = useContext(GlobalContext);

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (ctx) {
    }
  }, [context.frames, ctx]);
  return <canvas width={width} height={height} ref={canvasRef}></canvas>;
}
