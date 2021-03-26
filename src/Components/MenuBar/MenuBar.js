import '../../Styles/MenuBar/MenuBar.css';
import MenuBarIcon from './MenuBarIcon';
import fileIconPath from '../../Assets/file.png';
import settingsIconPath from '../../Assets/setting.png';
import undoIconPath from '../../Assets/undo.png';
import questionIconPath from '../../Assets/question.png';
import toolboxIconPath from '../../Assets/toolkit.png';
import frameIconPath from '../../Assets/film-strip.png';
import openIconPath from '../../Assets/folder.png';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function MenuBar({ toolboxStyle, setToolboxStyle, frameToolStyle, setFrameToolStyle }) {
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
  const handleToolboxClick = () => {
    toolboxStyle.left ? setToolboxStyle({}) : setToolboxStyle({ left: '0px' });
  };
  const handleFrameToolClick = () => {
    console.log(frameToolStyle.right);
    frameToolStyle.right ? setFrameToolStyle({}) : setFrameToolStyle({ right: '0px' });
  };
  return (
    <nav className="menu-bar">
      <div className="menu-bar-item">
        <MenuBarIcon filePath={openIconPath} alt={'open'} onClick={() => context.setOpenModal('OPEN')} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={fileIconPath} alt={'file'} onClick={() => context.setOpenModal('SAVE')} />
      </div>
      <div className="menu-bar-item">
        <MenuBarIcon filePath={settingsIconPath} alt={'settings'} onClick={() => context.setOpenModal('SETTINGS')} />
      </div>
      <div className="menu-bar-item goodbye">
        <MenuBarIcon filePath={toolboxIconPath} alt={'Toolbox'} onClick={handleToolboxClick} />
      </div>
      <div className="menu-bar-item goodbye">
        <MenuBarIcon filePath={frameIconPath} alt={'Frames'} onClick={handleFrameToolClick} />
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
