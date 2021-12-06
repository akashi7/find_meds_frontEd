import { createContext, useReducer } from 'react';
import { UserReducer } from '../Contexts/UserReducer';
import { useHistory } from 'react-router-dom';


const initialState = {
  Docs: {
    docs: []
  },
  P_info: {
    patient: []
  },
  phMeds: {
    allMeds: []
  },
  docMeds: [],
  pharmaMeds: {
    medecines: []
  },
  docViewPrev: {
    userInfo: []
  }
};


export const UserContext = createContext(initialState);
export const UserProvider = ({ children }) => {

  let url;

  process.env.NODE_ENV === "development" ? url = `http://localhost:7000` : url = ``;


  const History = useHistory();
  const [state, dispatch] = useReducer(UserReducer, initialState);




  const AllDoctors = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/api/hospital/allDoctors`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'ALL_DOCS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/hospital');
    }

  };

  const viewPatient = async (token, code) => {

    const config = {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/doc/SearchPat?code=${code}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'VIEW_PATIENT',
        payload: res.data
      });
    }

    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  const pharmacyMedecines = async (token) => {

    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/api/pharma/allMeds`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'PHARMA_MEDS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/pharmacy');
    }

  };

  const docSeeAllMeds = async (token) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };

    const res = await (await fetch(`${url}/api/doc/allMeds`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'DOC_MEDS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  const pharmaViewTodayMeds = async (token, phone) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/pharma/viewTodayMeds?phone=${phone}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'PHARMA_VIEW_MEDS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };

  const DocviewPrevRecord = async (token, code, id) => {
    const config = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      },
    };
    const res = await (await fetch(`${url}/api/doc/viewPrevRecord?code=${code}&&id_number=${id}`, config)).json();
    if (res.status === 200) {
      dispatch({
        type: 'DOC_VIEW_MEDS',
        payload: res.data
      });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  };



  return (
    <UserContext.Provider value={{
      ...state,
      AllDoctors,
      viewPatient,
      pharmacyMedecines,
      docSeeAllMeds,
      pharmaViewTodayMeds,
      DocviewPrevRecord
    }} >
      {children}
    </UserContext.Provider>
  );

};