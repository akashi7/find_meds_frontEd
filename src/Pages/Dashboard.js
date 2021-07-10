import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../Components/Header';


export const Dashboard = () => {

  const History = useHistory();
  const token = localStorage.getItem('token');





  useEffect(() => {
    if (!(token)) {
      History.push('/');
    }
    else {

    }
  }, []);

  return (
    <div>
      <Header />
    </div>
  );
};

