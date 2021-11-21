import { DoctorNav } from "../Components/AppNav";


export const Patient_info = () => {
  return (
    <div>
      <DoctorNav />
      <div className="Doc_View_p" >
        <div className="INFO" >
          <h3>Patient info</h3>
          <div className="space">
            <div className="p_info">
              <p>Patient name : Akashi Christian </p>
              <p>Age : 31</p>
              <p>District : Gasabo</p>
              <p>sector : Gihogwe</p>
            </div>
          </div>
        </div>
        <div className="MEDS">
          <h3>Recommend medecines</h3>
          <div className="space">
            <input placeholder="SEARCH" type="text" className="inputs" />
          </div>
        </div>
        <div className="RECORD">
          <h3>Previous record</h3>
          <div className="space">
            <label>Enter patient ID to view Previous Record</label>
            <input placeholder="ID" type="text" className="inputs" />
            <button className="button">View</button>
          </div>
        </div>
      </div>
    </div>
  );
};

