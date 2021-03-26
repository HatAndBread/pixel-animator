import { useRef, useEffect, useState } from 'react';
import { GlobalContext } from '../../App';
import { useContext } from 'react';
import '../../Styles/FrameTools/FrameTools.css';
import trashCanIcon from '../../Assets/trash-can.png';
import cloneIcon from '../../Assets/cloning.png';

export default function CanvasView({ width, height, frameData, frameNum, dragElement, setDragElement }) {
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
      ctx.fillStyle = context.previewBackgroundColor;
      ctx.fillRect(0, 0, width * 2, height * 2);
      frameData.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect((square.coords.x / magnification) * 2, (square.coords.y / magnification) * 2, 2, 2);
      });
    }
  }, [frameData, ctx, height, width, magnification, context.previewBackgroundColor]);

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
    if (context.frames.length > 1) {
      const copy = [...context.frames];
      copy.splice(frameNum, 1);
      update(copy);
      if (context.currentFrameNumber === frameNum) {
        if (frameNum === 0) {
          context.setCurrentFrameNumber(0);
          context.setSquares(context.frames[1]);
        } else if (frameNum === context.frames.length - 1) {
          context.setCurrentFrameNumber(frameNum - 1);
          context.setSquares(context.frames[frameNum - 1]);
        } else {
          context.setCurrentFrameNumber(frameNum);
          context.setSquares(context.frames[frameNum + 1]);
        }
      } else if (context.currentFrameNumber > frameNum) {
        const newFrameNum = context.currentFrameNumber > 1 ? context.currentFrameNumber - 1 : 0;
        context.setCurrentFrameNumber(newFrameNum - 1 >= 0 ? newFrameNum : 0);
      }
    } else {
      context.setFrames([[]]);
      context.setSquares([]);
    }
  };

  const duplicate = () => {
    const copy = JSON.parse(JSON.stringify(context.frames)); //[...context.frames];
    copy.push(context.frames[frameNum]);
    context.setSquares(copy[context.currentFrameNumber]);
    update(copy);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dropAreaNum = e.target.dataset.frameNum;
    if (dropAreaNum || dropAreaNum === 0) {
      const copy = [...context.frames];
      const removedElement = copy.splice(dragElement, 1)[0];
      copy.splice(dropAreaNum, 0, removedElement);
      context.setFrames(copy);
      context.setCurrentFrameNumber(dropAreaNum);
      context.setSquares(copy[dropAreaNum]);
    }
  };

  return (
    <div
      className="canvas-view-container"
      onDragEnter={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={handleDrop}
      style={context.currentFrameNumber === frameNum ? { backgroundColor: '#8682dd' } : {}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div onClick={handleClick}>
          <div className="canvas-view-number-label">Frame {frameNum}</div>
          <div>
            <canvas
              width={width * 2}
              height={height * 2}
              ref={canvasRef}
              className="canvas-view"
              draggable
              data-frame-num={frameNum}
              onDragStart={() => setDragElement(frameNum)}
              onDragEnd={() => setDragElement(null)}
            ></canvas>
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
