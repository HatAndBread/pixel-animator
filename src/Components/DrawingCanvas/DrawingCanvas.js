import { GlobalContext } from '../../App';
import { useState, useContext, useRef, useEffect } from 'react';
import BGCanvas from './BGCanvas';
import '.././../Styles/DrawingCanvas/DrawingCanvas.css';

let lastMagnification;

function DrawingCanvas({ magnification }) {
  const context = useContext(GlobalContext);
  const color = useContext(GlobalContext).color;
  const [mouseDown, setMouseDown] = useState(false);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const squares = context.squares;
  const setSquares = context.setSquares;

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
      // if (lastMagnification !== magnification) {
      //   lastMagnification = magnification;
      //   const copy = JSON.parse(JSON.stringify(squares));
      //   for (let i = 0; i < copy.length; i++) {
      //     copy[i].coords.x = copy[i].coords.x * (magnification / lastMagnification);
      //     copy[i].coords.y = copy[i].coords.y * (magnification / lastMagnification);
      //   }
      //   setSquares(copy);
      // } else {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      squares.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.coords.x, square.coords.y, magnification, magnification);
      });
      // }
    }
  }, [ctx, squares, setSquares, magnification, context.height, context.width]);

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
        const copy = JSON.parse(JSON.stringify(squares));
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
          setSquares(copy);
        }
        break;
      }
      case 'eraser': {
        const eraserCoords = getTrueCoords(coords);
        const copy = JSON.parse(JSON.stringify(squares));
        for (let x = 0; x < context.pencilSize; x++) {
          for (let y = 0; y < context.pencilSize; y++) {
            for (let i = 0; i < copy.length; i++) {
              if (
                // work to be done in the logic here
                Math.round(copy[i]?.coords.x) === Math.round(eraserCoords.x + x * magnification) &&
                Math.round(copy[i]?.coords.y) === Math.round(eraserCoords.y + y * magnification)
              ) {
                copy.splice(i, 1);
                break;
              }
            }
          }
        }
        setSquares(copy);
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
        console.log(context.tool);
        return;
      }
      case 'scissors': {
        console.log(context.tool);
        return;
      }
      case 'zoom in': {
        console.log('zoom in');
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
    setMouseDown(false);
  };
  const handlePointerMove = (e) => {
    if (mouseDown) {
      handleTool(e);
    }
  };
  const handleTouchMove = (e) => {
    handlePointerMove({ target: document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY) });
  };
  return (
    <div>
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
        ></canvas>
      </div>
    </div>
  );
}

export default DrawingCanvas;
