import '../../Styles/Toolbox/Toolbox.css';
import ToolboxIcon from './ToolboxIcon';
import pencilIconPath from '../../Assets/pencil.png';
import eraserIconPath from '../../Assets/eraser.png';
import dropperIconPath from '../../Assets/dropper.png';
import bucketIconPath from '../../Assets/paint-bucket.png';
import scissorsIconPath from '../../Assets/scissors.png';
import magnifyingGlassIconPath from '../../Assets/magnifying-glass.png';
import SizeChooser from './SizeChooser';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Toolbox() {
  const context = useContext(GlobalContext);
  const setTool = (tool) => {
    context.setTool(tool);
  };
  const handleChange = (e) => {
    context.setColor(e.target.value);
  };

  return (
    <div className="toolbox-container">
      <div className="color-picker-container">
        <label htmlFor="color-picker">CURRENT COLOR</label>
        <input type="color" id="color-picker" onInput={handleChange} value={context.color} />
        <SizeChooser />
      </div>
      <ToolboxIcon src={pencilIconPath} alt={'pencil'} onClick={() => setTool('pencil')} />
      <ToolboxIcon src={eraserIconPath} alt={'eraser'} onClick={() => setTool('eraser')} />
      <ToolboxIcon src={dropperIconPath} alt={'dropper'} onClick={() => setTool('dropper')} />
      <ToolboxIcon src={bucketIconPath} alt={'bucket'} onClick={() => setTool('bucket')} />
      <ToolboxIcon src={scissorsIconPath} alt={'scissors'} onClick={() => setTool('scissors')} />
      <ToolboxIcon src={magnifyingGlassIconPath} alt={'zoom in'} onClick={() => setTool('zoom in')} />
    </div>
  );
}
