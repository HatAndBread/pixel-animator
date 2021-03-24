import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import Toolbox from './Components/Toolbox/Toolbox';
import Modals from './Components/Modal/Modals';
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas';
import FrameTools from './Components/FrameTools/FrameTools';
import { createContext, useState, useEffect } from 'react';

export const GlobalContext = createContext();

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
  const [pastStates, setPastStates] = useState([]);
  const [toolboxStyle, setToolboxStyle] = useState({});
  const [frameToolStyle, setFrameToolStyle] = useState({});
  const [previewBackgroundColor, setPreviewBackgroundColor] = useState('#ffffff');
  const [gifBackgroundColor, setGifBackgroundColor] = useState('#ffffff');
  const [transparentBackgroundColor, setTransparentBackgroundColor] = useState('LIGHT');
  const getLightBGColor = () => (transparentBackgroundColor === 'LIGHT' ? 'lightgray' : '#3d3d3c');
  const getDarkBGColor = () => (transparentBackgroundColor === 'LIGHT' ? 'darkgray' : '#2a2a2a');

  useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      event.returnValue = `Changes that you made may not be saved.`;
    });
  }, []);

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
        setSquares,
        transparentBackgroundColor,
        setTransparentBackgroundColor,
        getLightBGColor,
        getDarkBGColor,
        pastStates,
        setPastStates,
        previewBackgroundColor,
        setPreviewBackgroundColor,
        gifBackgroundColor,
        setGifBackgroundColor
      }}
    >
      <div className="App">
        <Modals />
        <MenuBar
          toolboxStyle={toolboxStyle}
          setToolboxStyle={setToolboxStyle}
          frameToolStyle={frameToolStyle}
          setFrameToolStyle={setFrameToolStyle}
        />
        <div className="main-horizontal-container">
          <Toolbox toolboxStyle={toolboxStyle} setToolboxStyle={setToolboxStyle} />
          <DrawingCanvas magnification={magnification} />
          <FrameTools frameToolStyle={frameToolStyle} setFrameToolStyle={setFrameToolStyle} />
        </div>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;
