import { GlobalContext } from '../../App';
import { useState, useContext, useRef, useEffect } from 'react';
import BGCanvas from './BGCanvas';
import '.././../Styles/DrawingCanvas/DrawingCanvas.css';

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
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      squares.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect(square.coords.x, square.coords.y, magnification, magnification);
      });
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
        const seed = getTrueCoords(coords);
        const seedX = seed.x / magnification;
        const seedY = seed.y / magnification;
        const grid = new Array(context.height);
        for (let i = 0; i < grid.length; i++) {
          grid[i] = new Array(context.width);
          for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = { coords: { x: j * magnification, y: i * magnification }, color: null };
          }
        }
        squares.forEach((square) => {
          grid[square.coords.y / magnification][square.coords.x / magnification] = square;
        });
        // const newArr = new Array(context.width * context.height);
        // squares.forEach((square) => {
        //   newArr[square.coords.x / magnification + (square.coords.y / magnification) * context.width] = square;
        // });
        grid[seedY][seedX].checked = true;
        const seedColor = grid[seedY][seedX].color;
        const queue = [grid[seedY][seedX]];
        console.log(queue);
        while (queue.length) {
          const firstX = queue[0].coords.x / magnification;
          const firstY = queue[0].coords.y / magnification;
          const north = grid[firstY - 1] ? grid[firstY - 1][firstX] : null;
          const south = grid[firstY + 1] ? grid[firstY + 1][firstX] : null;
          const east = grid[firstX + 1] ? grid[firstY][firstX + 1] : null;
          const west = grid[firstX - 1] ? grid[firstY][firstX - 1] : null;
          if (north?.color === seedColor && !north.checked) {
            north.checked = true;
            queue.push(north);
          }
          if (south?.color === seedColor && !south.checked) {
            south.checked = true;
            queue.push(south);
            console.log('SOUTH IS A MATCH');
          }
          if (east?.color === seedColor && !east.checked) {
            east.checked = true;
            queue.push(east);
            console.log('EAST IS A MATCH');
          }
          if (west?.color === seedColor && !west.checked) {
            west.checked = true;
            queue.push(west);
            console.log('WEST IS A MATCH');
          }
          queue.splice(0, 1);
          console.log(queue);
          //queue.splice(0, queue.length);
        }
        console.log(queue);
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
