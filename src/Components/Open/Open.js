import Modal from '../Modal/Modal';
import '../../Styles/Open/Open.css';
import { useContext, useState } from 'react';
import { GlobalContext } from '../../App';

export default function Open() {
  const context = useContext(GlobalContext);
  const [fileOpenResult, setFileOpenResult] = useState(null);
  const handleClick = () => {
    if (fileOpenResult) {
      context.setMagnification(fileOpenResult.magnification);
      context.setWidth(fileOpenResult.width);
      context.setHeight(fileOpenResult.height);
      context.setFrames(fileOpenResult.frames);
      context.setCurrentFrameNumber(0);
      context.setSquares(fileOpenResult.frames[0]);
      setFileOpenResult(null);
      context.setOpenModal(null);
    } else {
      alert('Not a valid Pixel Art Animator file. Please try again. ✨');
    }
  };
  const handleChange = (e) => {
    const fileToLoad = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      const textFromFileLoaded = fileLoadedEvent.target.result;
      const result = JSON.parse(textFromFileLoaded);
      if (!result || !result.pixelArtAnimator) {
        alert('Not a valid Pixel Art Animator file. Please try again. ✨');
      } else {
        setFileOpenResult(result);
      }
    };

    fileReader.readAsText(fileToLoad, 'UTF-8');
  };
  const modalContent = (
    <div className="open-container">
      <input type="file" name="file-input" id="file-input" accept=".json" onChange={handleChange} />
      <button onClick={handleClick}>OPEN</button>
    </div>
  );
  return <Modal content={modalContent}></Modal>;
}
