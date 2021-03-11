import '.././../Styles/DrawingCanvas/DrawingCanvas.css';
import Pixel from './Pixel';

const createCanvas = (canvasWidth, canvasHeight) => {
  const arr = [];
  for (let y = 0; y < canvasHeight; y++) {
    const row = [];
    for (let x = 0; x < canvasWidth; x++) {
      if (y % 2) {
        if (x % 2) {
          row.push(<Pixel type={'bg-light-transparent'} key={`${x}${y}`} x={x} y={y} />);
        } else {
          row.push(<Pixel type={'bg-dark-transparent'} key={`${x}${y}`} x={x} y={y} />);
        }
      } else {
        if (x % 2) {
          row.push(<Pixel type={'bg-dark-transparent'} key={`${x}${y}`} x={x} y={y} />);
        } else {
          row.push(<Pixel type={'bg-light-transparent'} key={`${x}${y}`} x={x} y={y} />);
        }
      }
    }
    arr.push(row);
  }
  return arr;
};

export default createCanvas;
