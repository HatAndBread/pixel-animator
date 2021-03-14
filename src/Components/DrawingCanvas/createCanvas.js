import '.././../Styles/DrawingCanvas/DrawingCanvas.css';
import Pixel from './Pixel';

const createCanvas = (canvasWidth, canvasHeight) => {
  const arr = [];
  for (let y = 0; y < canvasHeight; y++) {
    const row = [];
    for (let x = 0; x < canvasWidth; x++) {
      if (y % 2) {
        if (x % 2) {
          row.push(
            <Pixel
              type={'bg-light-transparent'}
              color={'lightgray'}
              key={`${x}${y}`}
              x={x}
              y={y}
              //  style={getStyle(x, y, 'lightgray')}
            />
          );
        } else {
          row.push(
            <Pixel
              type={'bg-dark-transparent'}
              color={'darkgray'}
              key={`${x}${y}`}
              x={x}
              y={y}
              // style={getStyle(x, y, 'darkgray')}
            />
          );
        }
      } else {
        if (x % 2) {
          row.push(
            <Pixel
              type={'bg-dark-transparent'}
              color={'darkgray'}
              key={`${x}${y}`}
              x={x}
              y={y}
              //   style={getStyle(x, y, 'darkgray')}
            />
          );
        } else {
          row.push(
            <Pixel
              type={'bg-light-transparent'}
              color={'lightgray'}
              key={`${x}${y}`}
              x={x}
              y={y}
              //    style={getStyle(x, y, 'lightgray')}
            />
          );
        }
      }
    }
    arr.push(row);
  }
  return (
    <div className="pixel-background-container">
      {arr.map((row) => {
        return (
          <div className="drawing-canvas-row" key={Math.random()}>
            {row.map((el) => {
              return el;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default createCanvas;
