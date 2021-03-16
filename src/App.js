import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import Toolbox from './Components/Toolbox/Toolbox';
import Modals from './Components/Modal/Modals';
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas';
import FrameTools from './Components/FrameTools/FrameTools';
import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

let set = 0;
let del = 0;
let dup = 0;

function App() {
  const [color, setColor] = useState('#000000');
  const [frames, setFrames] = useState([[]]);
  const [currentFrameNumber, setCurrentFrameNumber] = useState(0);
  const [width, setWidth] = useState(32);
  const [height, setHeight] = useState(32);
  const [tool, setTool] = useState('pencil');
  const [pencilSize, setPencilSize] = useState(1);
  const [magnification, setMagnification] = useState(10);
  const [openModal, setOpenModal] = useState(null);
  const [modalCallbacks, setModalCallbacks] = useState({});
  const [squares, setSquares] = useState([]);

  useEffect(() => {
    if (del || dup) {
      del = 0;
      dup = 0;
      setSquares(frames[currentFrameNumber]);
    } else if (!set) {
      frames[currentFrameNumber] = squares;
      setFrames(frames);
      set = 1;
    }
    set = 0;
  }, [squares, frames, currentFrameNumber]);

  return (
    <GlobalContext.Provider
      value={{
        color,
        setColor,
        frames,
        setFrames,
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
        modalCallbacks,
        setModalCallbacks,
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

export const setDeleted = () => {
  del = 1;
};

export const setDuplicated = () => {
  dup = 1;
};

export default App;
