import '../../Styles/MenuBar/MenuBar.css';
import MenuBarIcon from './MenuBarIcon';
import fileIconPath from '../../Assets/file.png';
import settingsIconPath from '../../Assets/setting.png';
import undoIconPath from '../../Assets/undo.png';
import redoIconPath from '../../Assets/redo.png';
import questionIconPath from '../../Assets/question.png';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function MenuBar() {
  const context = useContext(GlobalContext);

  return (
    <nav className="menu-bar">
      <div className="menu-bar-item">
        <MenuBarIcon
          filePath={fileIconPath}
          alt={'file'}
          onClick={() => {
            context.setOpenModal('SAVE');
          }}
        />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon
          filePath={settingsIconPath}
          alt={'settings'}
          onClick={() => {
            context.setOpenModal('SETTINGS');
          }}
        />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={undoIconPath} alt={'undo'} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={redoIconPath} alt={'redo'} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={questionIconPath} alt={'About'} onClick={() => context.setOpenModal('ABOUT')} />
      </div>
    </nav>
  );
}
