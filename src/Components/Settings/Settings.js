import Modal from '../Modal/Modal';
import { useSelector, useDispatch } from 'react-redux';
import { openSettings, closeSettings } from '../../Actions';

export default function Settings() {
  const settingsOpen = useSelector((state) => state.settingsOpen);
  const dispatch = useDispatch();
  const modalContent = <div className="settings-container">fasdfdsfsdadsfadfdsfa</div>;
  const onClose = () => {
    settingsOpen ? dispatch(closeSettings()) : dispatch(openSettings());
    console.log(settingsOpen);
  };
  return settingsOpen ? <Modal content={modalContent} onClose={onClose}></Modal> : null;
}
