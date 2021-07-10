import { createContext, useReducer } from 'react';
import { UserReducer } from '../Contexts/UserReducer';
import { useHistory } from 'react-router-dom';


const initialState = {
  allCars: {
    cars: []
  },
  allDrivers: {
    drivers: []
  },
  allIncome: {
    income: []
  },
  allExpense: {
    expense: []
  },
  users: {
    Users: []
  }
};


export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {

  const History = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);

  const ViewCars = async (token, tin) => {

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await (fetch(`http://localhost:9000/user/allCars?tin=${tin}`, config))).json();
    if (res.status === 200) {
      dispatch({
        type: "CARS",
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }

  };

  const ViewDrivers = async (token, tin) => {

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await (fetch(`http://localhost:9000/user/allDrivers?tin=${tin}`, config))).json();
    if (res.status === 200) {
      dispatch({
        type: "DRIVERS",
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }

  };

  const ViewIncomes = async (token, tin) => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await (fetch(`http://localhost:9000/user/allIncome?tin=${tin}`, config))).json();
    if (res.status === 200) {
      dispatch({
        type: "INCOMES",
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };


  const ViewExpenses = async (token, tin) => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await (fetch(`http://localhost:9000/user/allExpenses?tin=${tin}`, config))).json();
    if (res.status === 200) {
      dispatch({
        type: "EXPENSES",
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  const GetAllUsers = async (token) => {
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await (fetch(`http://localhost:9000/admin/allUsers`, config))).json();
    if (res.status === 200) {
      dispatch({
        type: "USERS",
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  return (
    <UserContext.Provider value={{ ...state, ViewCars, ViewDrivers, ViewIncomes, ViewExpenses, GetAllUsers }} >
      {children}
    </UserContext.Provider>
  );

};