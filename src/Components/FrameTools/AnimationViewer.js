import playIcon from '../../Assets/play-button.png';
import pauseIcon from '../../Assets/pause-button.png';
import '../../Styles/FrameTools/FrameTools.css';
import { useRef, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

let animationStopped = true;
let animationFrame = 0;
let centiseconds = 0;

export default function AnimationViewer() {
  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  const [fps, setFPS] = useState(20);
  const context = useContext(GlobalContext);
  const width = context.width;
  const height = context.height;
  const frames = context.frames;
  const magnification = context.magnification;
  const firstImage = frames[0];
  const getOptions = () => {
    const optionsArr = [];
    for (let i = 1; i <= 60; i++) {
      !(60 % i) &&
        optionsArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
    }
    return optionsArr;
  };
  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);
  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width * 2, ctx.canvas.height * 2);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width * 2, height * 2);
      firstImage.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect((square.coords.x / magnification) * 2, (square.coords.y / magnification) * 2, 2, 2);
      });
    }
  }, [firstImage, ctx, height, width, magnification, context]);

  const play = () => {
    if (animationStopped) {
      animationStopped = false;
      animate();
    }
  };

  const animate = () => {
    if (!animationStopped) {
      if (centiseconds % Math.round(60 / fps) === 0 && centiseconds !== 0) {
        //console.log(frames);
        ctx.fillStyle = 'white';
        ctx.clearRect(0, 0, ctx.canvas.width * 2, ctx.canvas.height * 2);
        ctx.fillRect(0, 0, ctx.canvas.width * 2, ctx.canvas.height * 2);
        frames[animationFrame]?.forEach((pixel) => {
          ctx.fillStyle = pixel.color;
          ctx.fillRect((pixel.coords.x / magnification) * 2, (pixel.coords.y / magnification) * 2, 2, 2);
        });
        animationFrame < frames.length - 1 ? (animationFrame += 1) : (animationFrame = 0);
      }
      centiseconds < 60 ? (centiseconds += 1) : (centiseconds = 0);
      window.requestAnimationFrame(animate);
    }
  };

  return (
    <div className="animation-viewer">
      <canvas ref={canvasRef} width={width * 2} height={height * 2}></canvas>
      <div className="animation-viewer-buttons">
        <img src={playIcon} alt="PLAY" id="play-button" onClick={play} />
        <img
          src={pauseIcon}
          alt="STOP"
          id="stop-button"
          onClick={() => {
            animationStopped = true;
          }}
        />
      </div>
      <label htmlFor="fps">
        FPS:
        <select
          name="fps"
          id="fps"
          defaultValue={20}
          onChange={(e) => {
            setFPS(parseInt(e.target.value));
          }}
        >
          {getOptions().map((option) => option)}
        </select>
      </label>
    </div>
  );
}
