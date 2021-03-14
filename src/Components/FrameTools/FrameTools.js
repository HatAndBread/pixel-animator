import '../../Styles/FrameTools/FrameTools.css';
import CanvasView from './CanvasView';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function FrameTools() {
  const context = useContext(GlobalContext);
  return (
    <div className="frame-tools-container">
      <CanvasView width={context.width} height={context.height} />
    </div>
  );
}
