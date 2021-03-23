import { GlobalContext } from '../../App';
import { useState, useContext, useRef, useEffect } from 'react';
import floodFill from './floodFill';
import BGCanvas from './BGCanvas';
import '.././../Styles/DrawingCanvas/DrawingCanvas.css';
import pencilCursor from '../../Assets/cursor-pencil.png';
import eraserCursor from '../../Assets/cursor-eraser.png';
import bucketCursor from '../../Assets/cursor-paint-bucket.png';
import dropperCursor from '../../Assets/dropper-cursor.png';

function DrawingCanvas({ magnification }) {
  const context = useContext(GlobalContext);
  const color = useContext(GlobalContext).color;
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);
  const sizeIndicator = useRef(null);
  const [ctx, setCtx] = useState(null);
  const squares = context.squares;
  const setSquares = context.setSquares;

  const update = (copy) => {
    setSquares(copy);
    const framesCopy = [...context.frames];
    framesCopy[context.currentFrameNumber] = copy;
    const pastStatesCopy = [...context.pastStates];
    if (pastStatesCopy.length > 20) {
      pastStatesCopy.shift();
    }
    pastStatesCopy.push(framesCopy);
    context.setFrames(framesCopy);
    context.setPastStates(pastStatesCopy);
  };

  const getTrueCoords = (coords) => {
    return {
      x: Math.floor(coords.x / magnification) * magnification,
      y: Math.floor(coords.y / magnification) * magnification
    };
  };

  const isNotADuplicate = (newSquare) => {
    for (let i = 0; i < squares.length; i++) {
      if (
        squares[i].coords.x === newSquare.coords.x &&
        squares[i].coords.y === newSquare.coords.y &&
        squares[i].color === newSquare.color
      ) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    setCtx(canvasRef.current.getContext('2d'));
  }, []);

  useEffect(() => {
    if (ctx) {
      console.log(squares);
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      squares.forEach((square) => {
        if (square) {
          ctx.fillStyle = square.color;
          ctx.fillRect(square.coords.x, square.coords.y, magnification, magnification);
        }
      });
    }
  }, [ctx, squares, setSquares, magnification, context.width, context.height]);

  const handleTool = (e) => {
    const coords = {
      x: e.clientX - canvasRef.current.getBoundingClientRect().x,
      y: e.clientY - canvasRef.current.getBoundingClientRect().y
    };
    switch (context.tool) {
      case 'pencil': {
        const arr = [];
        const newCoords = getTrueCoords(coords);
        for (let x = 0; x < context.pencilSize; x++) {
          for (let y = 0; y < context.pencilSize; y++) {
            const newItem = {
              coords: { x: newCoords.x + magnification * x, y: newCoords.y + magnification * y },
              color: color
            };
            if (
              isNotADuplicate(newItem) &&
              newCoords.x / magnification + x <= context.width &&
              newCoords.y / magnification + y <= context.height
            ) {
              arr.push(newItem);
            }
          }
        }
        const copy = [...squares];
        if (arr.length) {
          arr.forEach((item) => {
            for (let i = copy.length; i >= 0; i--) {
              if (copy[i]?.coords.x === item.coords.x && copy[i]?.coords.y === item.coords.y) {
                copy.splice(i, 1);
              }
            }
          });
          arr.forEach((item) => {
            copy.push(item);
          });
          update(copy);
        }
        break;
      }
      case 'eraser': {
        const eraserCoords = getTrueCoords(coords);
        const copy = [...squares];
        for (let x = 0; x < context.pencilSize; x++) {
          for (let y = 0; y < context.pencilSize; y++) {
            for (let i = 0; i < copy.length; i++) {
              if (
                Math.round(copy[i]?.coords.x) === Math.round(eraserCoords.x + x * magnification) &&
                Math.round(copy[i]?.coords.y) === Math.round(eraserCoords.y + y * magnification)
              ) {
                copy.splice(i, 1);
                break;
              }
            }
          }
        }
        update(copy);
        break;
      }
      case 'dropper': {
        const dropperCoords = getTrueCoords(coords);
        for (let i = 0; i < squares.length; i++) {
          if (squares[i].coords.x === dropperCoords.x && squares[i].coords.y === dropperCoords.y) {
            console.log(squares[i].color);
            context.setColor(squares[i].color);
            break;
          }
        }
        return;
      }
      case 'bucket': {
        const newSquares = floodFill(getTrueCoords, coords, magnification, context, squares, color);
        if (newSquares) {
          update(newSquares);
        }
        return;
      }
      case 'scissors': {
        console.log(context.tool);
        return;
      }
      default:
        return;
    }
  };
  const handlePointerDown = (e) => {
    setMouseDown(true);
    handleTool(e);
  };
  const handlePointerUp = () => {
    sizeIndicator.current.hidden = true;
    setMouseDown(false);
  };
  const handlePointerMove = (e) => {
    if (mouseDown) {
      handleTool(e);
    }
    if (context.tool === 'pencil' || context.tool === 'eraser') {
      sizeIndicator.current.hidden = false;
      sizeIndicator.current.style.top = `${e.clientY}px`;
      sizeIndicator.current.style.left = `${e.clientX}px`;
      sizeIndicator.current.style.width = `${context.pencilSize * magnification}px`;
      sizeIndicator.current.style.height = `${context.pencilSize * magnification}px`;
    }
  };
  const handleTouchMove = (e) => {
    handlePointerMove({ target: document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) });
  };
  const changeCursor = () => {
    switch (context.tool) {
      case 'pencil':
        canvasRef.current.style.cursor = `url("${pencilCursor}"), default`;
        break;
      case 'eraser':
        canvasRef.current.style.cursor = `url("${eraserCursor}"), default`;
        break;
      case 'bucket':
        canvasRef.current.style.cursor = `url("${bucketCursor}"), default`;
        break;
      case 'dropper':
        canvasRef.current.style.cursor = `url("${dropperCursor}"), default`;
        break;
      default:
        canvasRef.current.style.cursor = 'initial';
    }
  };
  return (
    <div>
      <div className="size-indicator" ref={sizeIndicator} hidden></div>
      <div className="drawing-canvas-current-frame-number">Frame: {context.currentFrameNumber}</div>
      <div className="drawing-canvas-container">
        <BGCanvas width={context.width} height={context.height} magnification={magnification} />
        <canvas
          id="drawing-canvas"
          width={context.width * magnification}
          height={context.height * magnification}
          ref={canvasRef}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
          onPointerMove={handlePointerMove}
          onTouchMove={handleTouchMove}
          onPointerEnter={changeCursor}
        ></canvas>
      </div>
    </div>
  );
}

export default DrawingCanvas;
