import Modal from '../Modal/Modal';
import { useContext, useRef, useState, useEffect, createRef } from 'react';
import { GlobalContext } from './../../App';
import * as gifshot from 'gifshot';
import '../../Styles/Save/Save.css';
import saveAs from 'save-as';

export default function Save() {
  const context = useContext(GlobalContext);
  const magnification = context.magnification;
  const canvasRef = useRef();
  const [ctx, setCTX] = useState();
  const [outputMagnification, setOutputMagnification] = useState(1);
  const [outputFileType, setOutputFileType] = useState('gif');
  const [fps, setFPS] = useState(20);
  const [gifBlobs, setGifBlobs] = useState([]);
  const gifRefs = useRef(context.frames.map(() => createRef()));
  useEffect(() => {
    setCTX(canvasRef.current.getContext('2d'));
  }, []);
  const getSpriteSheet = () => {
    console.log(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width * outputMagnification, ctx.canvas.height * outputMagnification);
    context.frames.forEach((frame, index) => {
      frame.forEach((square) => {
        ctx.fillStyle = square.color;
        ctx.fillRect(
          context.width * outputMagnification * index + (square.coords.x / magnification) * outputMagnification,
          (square.coords.y / magnification) * outputMagnification,
          outputMagnification,
          outputMagnification
        );
      });
    });
    canvasRef.current.toBlob(function (blob) {
      console.log(blob);
      saveAs(blob, 'pixel-animator.png');
    }, 'image/png');
    context.setOpenModal(null);
  };

  const getOptions = () => {
    const optionsArr = [];
    for (let i = 1; i <= 60; i++) {
      !(60 % i) &&
        optionsArr.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
    }
    return optionsArr;
  };

  const getGif = () => {
    const newGifBlobs = [];
    gifRefs.current.forEach((ref, index) => {
      const myCtx = ref.current.getContext('2d');
      myCtx.fillStyle = 'white';
      myCtx.fillRect(0, 0, myCtx.canvas.width * outputMagnification, myCtx.canvas.height * outputMagnification);
      context.frames[index].forEach((square) => {
        myCtx.fillStyle = square.color;
        myCtx.fillRect(
          (square.coords.x / magnification) * outputMagnification,
          (square.coords.y / magnification) * outputMagnification,
          outputMagnification,
          outputMagnification
        );
      });
      newGifBlobs.push(ref.current.toDataURL('image/png'));
    });

    gifshot.createGIF(
      {
        images: newGifBlobs,
        gifWidth: context.width * outputMagnification,
        gifHeight: context.height * outputMagnification,
        frameDuration: 1
      },
      function (obj) {
        fetch(obj.image)
          .then((res) => res.blob())
          .then((blob) => saveAs(blob, 'pixel-animator.gif'));
      }
    );
  };
  const handleFileTypeChange = (e) => setOutputFileType(e.target.value);
  const handleSpriteSizeInput = (e) => setOutputMagnification(parseInt(e.target.value));
  const modalContent = (
    <div className="save-container">
      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="form-content">
          <div>
            <div className="input-radio" onChange={handleFileTypeChange}>
              <div>
                <input
                  type="radio"
                  name="output"
                  id="gif"
                  value="gif"
                  defaultChecked
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                />
                <label htmlFor="gif" className="gif">
                  GIF
                </label>
              </div>
              <div>
                <input type="radio" name="output" id="sprite-sheet" value="sprite-sheet" />
                <label htmlFor="sprite-sheet">PNG SPRITE SHEET</label>
              </div>
            </div>
          </div>
          {outputFileType === 'gif' ? (
            <div>
              <label>
                FPS:
                <select
                  name="fps-select"
                  id="fps-select"
                  onChange={(e) => {
                    setFPS(parseInt(e.target.value));
                  }}
                  defaultValue="20"
                >
                  {getOptions().map((option) => option)}
                </select>
              </label>
              <div>
                <div>
                  OUTPUT SIZE: {context.width * outputMagnification} X {context.height * outputMagnification}
                </div>
                <input
                  type="range"
                  name="sprite-magnification"
                  id="sprite-magnification-input"
                  min="1"
                  max="20"
                  defaultValue="1"
                  onChange={handleSpriteSizeInput}
                />
              </div>
            </div>
          ) : (
            <div>
              <div>
                OUTPUT SIZE: {context.width * outputMagnification * context.frames.length} X{' '}
                {context.height * outputMagnification}
              </div>
              <input
                type="range"
                name="sprite-magnification"
                id="sprite-magnification-input"
                min="1"
                max="20"
                defaultValue="1"
                onChange={handleSpriteSizeInput}
              />
            </div>
          )}
          <button className="" onClick={outputFileType === 'gif' ? getGif : getSpriteSheet}>
            SAVE
          </button>
        </div>
      </form>
      <div>
        <canvas
          ref={canvasRef}
          width={context.frames.length * context.width * outputMagnification}
          height={context.height * outputMagnification}
          hidden
        ></canvas>
        {context.frames.map((frame, index) => {
          return (
            <canvas
              width={context.width * outputMagnification}
              height={context.height * outputMagnification}
              key={index}
              ref={gifRefs.current[index]}
              hidden
            ></canvas>
          );
        })}
      </div>
    </div>
  );
  return <Modal content={modalContent} />;
}
