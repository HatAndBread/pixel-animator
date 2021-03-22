import { useRef, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { useContext } from 'react';
import '../../Styles/FrameTools/FrameTools.css';
import trashCanIcon from '../../Assets/trash-can.png';
import cloneIcon from '../../Assets/cloning.png';

export default function CanvasView({ width, height, frameData, frameNum }) {
  const canvasRef = useRef();
  const [ctx, setCtx] = useState(null);
  const context = useContext(GlobalContext);
  const magnification = context.magnification;

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, width * 2, height * 2);
      frameData.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect((square.coords.x / magnification) * 2, (square.coords.y / magnification) * 2, 2, 2);
      });
    }
  }, [frameData, ctx, height, width, magnification]);

  const handleClick = () => {
    context.setCurrentFrameNumber(frameNum);
    context.setSquares(context.frames[frameNum]);
  };
  const update = (copy) => {
    const pastStatesCopy = [...context.pastStates];
    pastStatesCopy.push(copy);
    context.setFrames(copy);
    context.setPastStates(pastStatesCopy);
  };

  const reallyDelete = () => {
    context.setOpenModal('DELETE');
    context.setModalCallbacks({ delete: destroy });
  };

  const destroy = () => {
    if (context.currentFrameNumber) {
      context.setCurrentFrameNumber(context.currentFrameNumber - 1 ? context.currentFrameNumber - 1 : 0);
      const copy = [...context.frames];
      copy.splice(frameNum, 1);
      update(copy);
    } else {
      context.setFrames([[]]);
      context.setSquares([]);
    }
  };

  const duplicate = () => {
    const copy = [...context.frames];
    copy.splice(frameNum, 0, context.frames[frameNum]);
    context.setFrames(copy);
  };

  return (
    <div
      className="canvas-view-container"
      style={context.currentFrameNumber === frameNum ? { backgroundColor: '#8682dd' } : {}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div onClick={handleClick}>
          <div className="canvas-view-number-label">Frame {frameNum}</div>
          <div>
            <canvas width={width * 2} height={height * 2} ref={canvasRef} className="canvas-view"></canvas>
          </div>
        </div>
        <div className="delete-duplicate-container">
          <img src={trashCanIcon} alt="DELETE" height="32" onClick={reallyDelete} />
          <img src={cloneIcon} alt="DUPLICATE" height="32" onClick={duplicate} />
        </div>
      </div>
    </div>
  );
}
