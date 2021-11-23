import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const PatientRecord = () => {
  const history = useHistory();
  return (
    <div>
      <DoctorNav />
      <div className="P_rec">
        <div className="FLEX">
          <p>Patient names :</p>
          <p style={{ marginLeft: "40px" }}>Akashi christian</p>
        </div>
        <div className="FLEX">
          <p>Doctor names :</p>
          <p style={{ marginLeft: "40px" }}>Ntakiyiruta frank</p>
        </div>
        <p className="io" >Desease (s) : Malaria</p>
        <p className="io">Hospital Name: Faisal</p>
        <p className="io">Date :12/2/2021</p>
        <p className="io">Medecine (s) : Parcatamol</p>
      </div>
    </div>
  );
};
