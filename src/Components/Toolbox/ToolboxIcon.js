import '../../Styles/Toolbox/Toolbox.css';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function ToolboxIcon({ src, alt, onClick }) {
  const currentTool = useContext(GlobalContext).tool;
  return <img src={src} alt={alt} onClick={onClick} className={currentTool === alt ? 'hightlighted-tool' : ''} />;
}
