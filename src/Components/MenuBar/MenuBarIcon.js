import '../../Styles/MenuBar/MenuBar.css';

export default function MenuBarIcon({ filePath, alt, onClick }) {
  return <img src={filePath} alt={alt} className="menu-bar-item" onClick={onClick} />;
}
