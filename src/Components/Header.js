import { useHistory } from 'react-router-dom';

export const Header = () => {
  const History = useHistory();

  return (
    <div>
      <ul className="header">
        <li>Home</li>
        <li onClick={() => History.push('/Cars')} >Cars</li>
        <li onClick={() => History.push('/Driver')}>Drivers</li>
        <li onClick={() => History.push('/Search')}>Search</li>
        <li onClick={() => History.push('/Record')}>Record</li>
        <li onClick={() => { localStorage.clear(); History.push('/'); }} >Log Out</li>
      </ul>
    </div>
  );
};
