import { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../Components/Header';
import { UserContext } from "../Contexts/UserContext";

export const Record = () => {

  const { allDrivers, ViewDrivers, allCars, ViewCars, ViewIncomes, allIncome, allExpense, ViewExpenses } = useContext(UserContext);

  const token = localStorage.getItem('token');
  const tin = localStorage.getItem('tin');
  const History = useHistory();

  const [state, setState] = useState({
    plate: "",
    driver: "",
    price: "",
    outcome: "",
    cause: ""
  });

  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }
      else {
        await ViewDrivers(token, tin);
        await ViewCars(token, tin);
        await ViewIncomes(token, tin);
        await ViewExpenses(token, tin);
      }
    })();
  }, []);


  const carsArray = allCars.cars.map(({ id, plate }) => {
    return <option key={id} > {plate} </option>;
  });
  const driverArray = allDrivers.drivers.map(({ id, name }) => {
    return <option key={id} >{name} </option>;
  });

  async function handleRecord(e) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await (fetch(`http://localhost:9000/user/recordInformation?tin=${tin}`, config))).json();
    if (res.status === 200) {
      window.location.reload();
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  }


  return (
    <div>
      <Header />
      <h1>Insert Record</h1>
      <form onSubmit={(e) => handleRecord(e)}>
        <label>Select Car</label>
        <select onChange={(e) => setState({ ...state, plate: e.target.value })}>
          <option>Select cars</option>
          {carsArray}
        </select>
        <label>Select Driver</label>
        <select onChange={(e) => setState({ ...state, driver: e.target.value })}>
          <option>Select drivers</option>
          {driverArray}
        </select>
        <input
          placeholder="Enter price"
          onChange={(e) => setState({ ...state, price: e.target.value })}
          required
        />

        <input
          placeholder="Enter cause"
          required
          onChange={(e) => setState({ ...state, cause: e.target.value })}
        />
        <label>Select cause</label>
        <select onChange={(e) => setState({ ...state, outcome: e.target.value })}>
          <option>Select cause</option>
          <option>Expenses</option>
          <option>Income</option>
        </select>
        <button type="submit">Record</button>
      </form>

      <div>
        <h3>All Income</h3>
        <table id="customers">
          <thead>
            <tr>
              <th>Plate</th>
              <th>Type</th>
              <th>Driver</th>
              <th>Price</th>
              <th>Cause</th>
              <th>Tin</th>
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {allIncome.income.map(({ id, plate, outcome, driver, price, cause, tin, date }) => {
              return (
                <tr key={id} >
                  <th>{plate}</th>
                  <th>{outcome}</th>
                  <th>{driver}</th>
                  <th>{price}</th>
                  <th>{cause}</th>
                  <th>{tin}</th>
                  <th>{date}</th>
                </tr>
              );
            })}
          </tbody>
        </table>

      </div>

      <div>
        <h3>All Expenses</h3>
        <table id="customers">
          <thead>
            <tr>
              <th>Plate</th>
              <th>Type</th>
              <th>Driver</th>
              <th>Price</th>
              <th>Cause</th>
              <th>Tin</th>
              <th>Date</th>

            </tr>
          </thead>
          <tbody>
            {allExpense.expense.length === 0 ? <p>No Expenses yet</p> :
              allExpense.expense.map(({ id, plate, outcome, driver, price, cause, tin, date }) => {
                return (
                  <tr key={id} >
                    <th>{plate}</th>
                    <th>{outcome}</th>
                    <th>{driver}</th>
                    <th>{price}</th>
                    <th>{cause}</th>
                    <th>{tin}</th>
                    <th>{date}</th>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>



    </div>
  );
};
