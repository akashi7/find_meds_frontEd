import { createContext, useReducer } from 'react';
import { UserReducer } from '../Contexts/UserReducer';
import { useHistory } from 'react-router-dom';


const initialState = {
  Info: {
    info: []
  },
  Docs: {
    allDocs: []
  }
};


export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {

  let url;
  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;


  const History = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);


  const HAdminInfo = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/hAdmin/adminInfo`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'HADMIN_INFO',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/hadmin');
    }
  };

  const AllDoctors = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/hAdmin/allDocs`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ALL_DOCS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/hadmin');
    }

  };


  return (
    <UserContext.Provider value={{ ...state, HAdminInfo, AllDoctors }} >
      {children}
    </UserContext.Provider>
  );

};