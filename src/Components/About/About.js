import Modal from '../Modal/Modal';
import '../../Styles/About/About.css';
import { useContext } from 'react';
import { GlobalContext } from '../../App';
export default function About() {
  const context = useContext(GlobalContext);
  const modalContent = (
    <div className="about-container">
      <div className="about-txt-content">
        <p>
          ❓Pixel Art Animator is a free and <a href="https://github.com/HatAndBread/pixel-animator">open-source</a>{' '}
          tool for making pixel art sprite sheets and animated gifs.
        </p>
        <p>
          <span style={{ color: 'red' }}>♥️ </span>Made with love by Joshua Hume.
        </p>
        <p>
          🍺If you enjoy Pixel Art Animator please consider
          <a href="https://www.paypal.com/paypalme/hatandbread">buying me a beer</a> or{' '}
          <a href="https://www.linkedin.com/in/joshua-hume-0259691ab/">giving me a job</a>. 👨‍💻
        </p>
      </div>
      <div className="icon-attribution">
        Icons made by{' '}
        <a href="https://www.freepik.com" title="Freepik">
          Freepik
        </a>{' '}
        from{' '}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
      <button className="modal-ok-button" onClick={() => context.setOpenModal(null)}>
        OK
      </button>
    </div>
  );
  return <Modal content={modalContent} />;
}
