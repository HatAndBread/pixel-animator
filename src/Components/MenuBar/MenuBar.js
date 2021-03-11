import '../../Styles/MenuBar/MenuBar.css';
import MenuBarIcon from './MenuBarIcon';
import fileIconPath from '../../Assets/file.png';
import settingsIconPath from '../../Assets/setting.png';
import undoIconPath from '../../Assets/undo.png';
import redoIconPath from '../../Assets/redo.png';
import { useDispatch } from 'react-redux';
import { openSettings } from '../../Actions/';

export default function MenuBar() {
  const dispatch = useDispatch();
  return (
    <nav className="menu-bar">
      <div className="menu-bar-item">
        <MenuBarIcon
          filePath={fileIconPath}
          alt={'file'}
          onClick={() => {
            dispatch(openSettings());
          }}
        />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={settingsIconPath} alt={'settings'} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={undoIconPath} alt={'undo'} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={redoIconPath} alt={'redo'} />
      </div>
    </nav>
  );
}
