import { GlobalContext } from '../../App';
import { useState, useContext, useRef, useEffect } from 'react';
import floodFill from './floodFill';
import BGCanvas from './BGCanvas';
import '.././../Styles/DrawingCanvas/DrawingCanvas.css';
import pencilCursor from '../../Assets/cursor-pencil.png';
import eraserCursor from '../../Assets/cursor-eraser.png';
import bucketCursor from '../../Assets/cursor-paint-bucket.png';
import dropperCursor from '../../Assets/dropper-cursor.png';
import glueCursor from '../../Assets/glue-cursor.png';
import scissorsCursor from '../../Assets/scissors-cursor.png';

function DrawingCanvas({ magnification }) {
  const context = useContext(GlobalContext);
  const color = useContext(GlobalContext).color;
  const [mouseDown, setMouseDown] = useState(false);
  const [cutStartPoint, setCutStartPoint] = useState({ x: 0, y: 0 });
  const [cutMagnification, setCutMagnification] = useState(null);
  const canvasRef = useRef(null);
  const sizeIndicator = useRef(null);
  const [ctx, setCtx] = useState(null);
  const squares = context.squares;
  const setSquares = context.setSquares;

  const update = (copy) => {
    setSquares(copy);
    const framesCopy = [...context.frames];
    framesCopy[context.currentFrameNumber] = copy;
    if (JSON.stringify(context.frames) !== JSON.stringify(framesCopy)) {
      const pastStatesCopy = [...context.pastStates];
      if (pastStatesCopy.length > 50) {
        pastStatesCopy.shift();
      }
      pastStatesCopy.push(framesCopy);
      context.setFrames(framesCopy);
      context.setPastStates(pastStatesCopy);
    }
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
        setCutMagnification(magnification);
        const newCoords = getTrueCoords(coords);
        setCutStartPoint(newCoords);
        const cutStuff = [];
        for (let i = 0; i < context.frames[context.currentFrameNumber].length; i++) {
          const el = context.frames[context.currentFrameNumber][i];
          if (
            el.coords.x >= newCoords.x &&
            el.coords.y >= newCoords.y &&
            el.coords.x <= newCoords.x + context.scissorsWidth * magnification &&
            el.coords.y <= newCoords.y + context.scissorsHeight * magnification
          ) {
            cutStuff.push(JSON.parse(JSON.stringify(el)));
          }
        }
        canvasRef.current.style.cursor = `url("${glueCursor}"), default`;
        context.setTool('glue');
        context.setScissorData(cutStuff);
        update(context.frames[context.currentFrameNumber]);
        return;
      }
      case 'glue': {
        const glueCoords = getTrueCoords(coords);
        const newSquares = JSON.parse(JSON.stringify(context.squares));
        const scissorDataCopy = JSON.parse(JSON.stringify(context.scissorData));
        for (let i = 0; i < scissorDataCopy.length; i++) {
          let newCutStartPoint = JSON.parse(JSON.stringify(cutStartPoint));
          if (magnification !== cutMagnification) {
            scissorDataCopy[i].coords.x *= magnification / cutMagnification;
            scissorDataCopy[i].coords.y *= magnification / cutMagnification;
            newCutStartPoint.x *= magnification / cutMagnification;
            newCutStartPoint.y *= magnification / cutMagnification;
          }
          scissorDataCopy[i].coords.x -= newCutStartPoint.x;
          scissorDataCopy[i].coords.y -= newCutStartPoint.y;
          scissorDataCopy[i].coords.x += glueCoords.x;
          scissorDataCopy[i].coords.y += glueCoords.y;
        }
        for (let i = scissorDataCopy.length - 1; i >= 0; i--) {
          for (let j = 0; j < newSquares.length; j++) {
            if (
              newSquares[j]?.coords?.x === scissorDataCopy[i]?.coords?.x &&
              newSquares[j]?.coords?.y === scissorDataCopy[i]?.coords?.y
            ) {
              newSquares[j] = scissorDataCopy[i];
              scissorDataCopy.splice(i, 1);
            }
          }
        }
        update(newSquares.concat(scissorDataCopy));
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
    if (context.tool === 'pencil' || context.tool === 'eraser' || context.tool === 'scissors') {
      sizeIndicator.current.hidden = false;
      sizeIndicator.current.style.top = `${e.clientY}px`;
      sizeIndicator.current.style.left = `${e.clientX}px`;
      if (context.tool === 'scissors') {
        sizeIndicator.current.style.width = `${context.scissorsWidth * magnification}px`;
        sizeIndicator.current.style.height = `${context.scissorsHeight * magnification}px`;
      } else {
        sizeIndicator.current.style.width = `${context.pencilSize * magnification}px`;
        sizeIndicator.current.style.height = `${context.pencilSize * magnification}px`;
      }
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
      case 'scissors':
        canvasRef.current.style.cursor = `url("${scissorsCursor}"), default`;
        break;
      case 'glue':
        canvasRef.current.style.cursor = `url("${glueCursor}"), default`;
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
