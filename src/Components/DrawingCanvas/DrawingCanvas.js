import { useSelector } from 'react-redux';
import { createContext, useEffect } from 'react';
import createCanvas from './createCanvas';

import '.././../Styles/DrawingCanvas/DrawingCanvas.css';

const defaultContext = {
  mouseDown: false
};
export const DrawingContext = createContext(defaultContext);

export default function DrawingCanvas() {
  const canvasWidth = useSelector((state) => state.canvasWidth);
  const canvasHeight = useSelector((state) => state.canvasHeight);
  const currentProject = useSelector((state) => state.currentProject);
  console.log(currentProject);
  const canvasArray = createCanvas(canvasWidth, canvasHeight);
  const handlePointerDown = () => {
    DrawingContext.mouseDown = true;
    console.log('pointer down');
  };
  const handlePointerUp = () => {
    DrawingContext.mouseDown = false;
    console.log('Pointer up!');
  };
  const handlePointerMove = (e) => {
    if (DrawingContext.mouseDown) {
      console.log(e.target.dataset);
      e.target.style.backgroundColor = 'green';
    }
  };
  useEffect(() => {
    currentProject.addFrame(canvasArray);
    console.log(currentProject);
  }, [currentProject, canvasArray]);
  return (
    <DrawingContext.Provider value={defaultContext}>
      <div
        className="drawing-canvas-container"
        key={Math.random()}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onPointerMove={handlePointerMove}
      >
        {canvasArray.map((row) => {
          return (
            <div className="drawing-canvas-row" key={Math.random()}>
              {row.map((el) => {
                return el;
              })}
            </div>
          );
        })}
      </div>
    </DrawingContext.Provider>
  );
}
