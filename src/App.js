import './App.css';
import MenuBar from './Components/MenuBar/MenuBar';
import Toolbox from './Components/Toolbox/Toolbox';
import Settings from './Components/Settings/Settings';
import DrawingCanvas from './Components/DrawingCanvas/DrawingCanvas';
import FrameTools from './Components/FrameTools/FrameTools';

function App() {
  return (
    <div className="App">
      <Settings />
      <MenuBar />
      <div className="main-horizontal-container">
        <Toolbox />
        <DrawingCanvas />
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
  );
}

export default App;
