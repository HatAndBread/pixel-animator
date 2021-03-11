import '../../Styles/Toolbox/Toolbox.css';
import ToolboxIcon from './ToolboxIcon';
import pencilIconPath from '../../Assets/pencil.png';
import eraserIconPath from '../../Assets/eraser.png';
import paintBrushIconPath from '../../Assets/paint-brush.png';
import textIconPath from '../../Assets/text.png';
import dropperIconPath from '../../Assets/dropper.png';
import colorIconPath from '../../Assets/color-palette.png';
import bucketIconPath from '../../Assets/paint-bucket.png';
import scissorsIconPath from '../../Assets/scissors.png';
import magnifyingGlassIconPath from '../../Assets/magnifying-glass.png';

export default function Toolbox() {
  return (
    <div className="toolbox-container">
      <ToolboxIcon src={pencilIconPath} alt={'pencil'} />
      <ToolboxIcon src={eraserIconPath} alt={'pencil'} />
      <ToolboxIcon src={paintBrushIconPath} alt={'paint brush'} />
      <ToolboxIcon src={textIconPath} alt={'text'} />
      <ToolboxIcon src={dropperIconPath} alt={'dropper'} />
      <ToolboxIcon src={colorIconPath} alt={'color palette'} />
      <ToolboxIcon src={bucketIconPath} alt={'bucket'} />
      <ToolboxIcon src={scissorsIconPath} alt={'bucket'} />
      <ToolboxIcon src={magnifyingGlassIconPath} alt={'zoom in'} />
    </div>
  );
}
