import { DoctorNav } from "../Components/AppNav";
import { useHistory } from "react-router-dom";

export const PatientRecord = () => {
  const history = useHistory();
  return (
    <div>
      <DoctorNav />
      <div>
        <div>
          <div className="FLEX">
            <p>Patient names</p>
            <p style={{ marginLeft: "40px" }}>Akashi christian</p>
          </div>
          <div className="FLEX">
            <p>Doctor names</p>
            <p style={{ marginLeft: "40px" }}>Ntakiyiruta frank</p>
          </div>
          <p>Desease (s) : Malaria</p>
          <p>Reports</p>
        </div>
      </div>

    </div>
  );
};
