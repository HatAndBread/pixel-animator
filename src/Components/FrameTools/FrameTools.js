import '../../Styles/FrameTools/FrameTools.css';
import addFrameIcon from '../../Assets/add.png';
import AnimationViewer from './AnimationViewer';

import CanvasView from './CanvasView';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function FrameTools() {
  const context = useContext(GlobalContext);

  const addNewFrame = () => {
    const frames = JSON.parse(JSON.stringify(context.frames));
    frames.push([]);
    context.setFrames(frames);
    context.setCurrentFrameNumber(context.frames.length);
    context.setSquares(frames[context.frames.length]);
  };
  return (
    <div className="frame-tools-container">
      <AnimationViewer />
      <div>
        <img src={addFrameIcon} alt="ADD NEW FRAME" id="add-new-frame" onClick={addNewFrame} />
      </div>
      <div className="frame-tools-container-frames">
        {context.frames.map((frame, index) => {
          return (
            <CanvasView width={context.width} height={context.height} frameData={frame} key={index} frameNum={index} />
          );
        })}
      </div>
    </div>
  );
}
