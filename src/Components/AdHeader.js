import { useHistory } from 'react-router-dom';


export const AdHeader = () => {

  const History = useHistory();

  return (
    <div>
      <ul className="header">
        <li>Home</li>
        <li onClick={() => History.push('/Users')}>Users</li>
        <li onClick={() => { localStorage.clear(); History.push('/'); }} >Log Out</li>
      </ul>
    </div>
  );
};
