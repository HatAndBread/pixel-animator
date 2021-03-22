import '../../Styles/MenuBar/MenuBar.css';
import MenuBarIcon from './MenuBarIcon';
import fileIconPath from '../../Assets/file.png';
import settingsIconPath from '../../Assets/setting.png';
import undoIconPath from '../../Assets/undo.png';
import questionIconPath from '../../Assets/question.png';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function MenuBar() {
  const context = useContext(GlobalContext);
  const undo = () => {
    if (context.pastStates.length > 1) {
      const pastStatesCopy = [...context.pastStates];
      pastStatesCopy.pop();
      context.setFrames(pastStatesCopy[pastStatesCopy.length - 1]);
      context.setPastStates(pastStatesCopy);
      context.setSquares(pastStatesCopy[pastStatesCopy.length - 1][context.currentFrameNumber]);
    }
  };

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
        <MenuBarIcon filePath={undoIconPath} alt={'undo'} onClick={undo} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={questionIconPath} alt={'About'} onClick={() => context.setOpenModal('ABOUT')} />
      </div>
    </nav>
  );
}
