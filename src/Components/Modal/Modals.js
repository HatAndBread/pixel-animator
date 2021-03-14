import Settings from '../../Components/Settings/Settings';
import { GlobalContext } from '../../App';
import { useContext } from 'react';

export default function Modals() {
  const context = useContext(GlobalContext);
  const getModal = () => {
    switch (context.openModal) {
      case 'SETTINGS':
        return <Settings />;
      default:
        return '';
    }
  };
  return getModal();
}
