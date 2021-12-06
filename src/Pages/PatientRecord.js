import { useEffect, useContext } from "react";
import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

export const PatientRecord = () => {


  const history = useHistory();

  const { docViewPrev, DocviewPrevRecord } = useContext(UserContext);

  const code = localStorage.getItem('P_phone');

  const id = localStorage.getItem("ID");

  const token = localStorage.getItem('token');

  useEffect(() => {
    (async () => {
      if (!token) {
        history.push('/');
      }
      else {
        await DocviewPrevRecord(token, code, id);
      }
    })();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <DoctorNav />
      <div className="p_Record" >
        {docViewPrev.userInfo.length === 0 ? <div>
          <p>No information yet</p>
        </div>
          : docViewPrev.userInfo.map(({ id, hospital_name, medecines, patient_name, doctor_name, pharmacy_name, disease, status, date }) => {
            return (
              <div className="P_rec" key={id}>
                <p className="io">Date :{date}</p>
                <div className="d_flex">
                  <p className="io" >Patient names : {patient_name}</p>
                  <p className="io" >Doctor names : {doctor_name} </p>
                </div>
                <div className="d_flex">
                  <p className="io" >Desease : {disease}</p>
                  <p className="io">Medecine (s) : {medecines}</p>
                </div>
                <div className="d_flex">
                  <p className="io">Hospital Name : {hospital_name}</p>
                  {status ? <p className="io">Medecines taken from {pharmacy_name} pharmacy </p> :
                    <p className="io">Didn't take medecine</p>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
