import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AdHeader } from '../Components/AdHeader';


export const AdminDash = () => {
  const token = localStorage.getItem('token');
  const History = useHistory();
  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }

    })();
  }, []);


  return (
    <div>
      <AdHeader />
    </div>
  );
};
