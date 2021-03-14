import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import Toolbox from './Components/Toolbox/Toolbox';
import Modals from './Components/Modal/Modals';
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas';
import FrameTools from './Components/FrameTools/FrameTools';
import Project from './Models/Project';
import createCanvas from './Components/DrawingCanvas/createCanvas';
import { createContext, useState, useEffect, useMemo } from 'react';

export const GlobalContext = createContext();

function App() {
  const [color, setColor] = useState('#000000');
  const [currentFrameNumber, setCurrentFrameNumber] = useState(0);
  const [width, setWidth] = useState(32);
  const [height, setHeight] = useState(32);
  const [tool, setTool] = useState('pencil');
  const [pencilSize, setPencilSize] = useState(1);
  const [magnification, setMagnification] = useState(10);
  const [openModal, setOpenModal] = useState(null);
  const [squares, setSquares] = useState([]);
  const [currentProject, setCurrentProject] = useState(new Project({ width: 32, height: 32 }));

  return (
    <GlobalContext.Provider
      value={{
        color,
        setColor,
        currentFrameNumber,
        setCurrentFrameNumber,
        width,
        setWidth,
        height,
        setHeight,
        tool,
        setTool,
        pencilSize,
        setPencilSize,
        openModal,
        setOpenModal,
        currentProject,
        setCurrentProject,
        magnification,
        setMagnification,
        squares,
        setSquares
      }}
    >
      <div className="App">
        <Modals />
        <MenuBar />
        <div className="main-horizontal-container">
          <Toolbox />
          <DrawingCanvas magnification={magnification} />
          <FrameTools />
        </div>
        <div>
          Icons made by{' '}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
