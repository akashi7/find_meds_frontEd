import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from '../Components/Header';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export const Search = () => {

  const [state, setState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    outcome: "",
    allExpense: {
      dailyExpenses: []
    },
    allIncome: {
      dailyIncome: []
    },
    message: ""
  });

  const token = localStorage.getItem('token');
  const tin = localStorage.getItem('tin');
  const History = useHistory();
  useEffect(() => {
    (async () => {
      if (!(token)) {
        History.push('/');
      }

    })();
  }, []);


  async function handleSearch(e) {
    e.preventDefault();
    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(state)
    };

    const res = await (await (fetch(`http://localhost:9000/user/search?tin=${tin}`, config))).json();

    if (res.status === 200) {
      setState({ ...state, allExpense: res.data });
    }
    if (res.status === 203) {
      setState({ ...state, message: res.message });
    }
    if (res.status === 300) {
      setState({ ...state, allIncome: res.data });
    }
    else if (res.status === 401) {
      localStorage.clear();
      History.push('/');
    }
  }

  return (
    <div>
      <Header />
      <h1>Search</h1>
      <form onSubmit={(e) => handleSearch(e)}>
        <select onChange={(e) => setState({ ...state, outcome: e.target.value })}>
          <option>Expense</option>
          <option>Income</option>
        </select>
        <label>Select start date</label>
        <DatePicker selected={state.startDate} onChange={(date) => setState({ ...state, startDate: date })} />
        <label>Select end date</label>
        <DatePicker selected={state.endDate} onChange={(time) => setState({ ...state, endDate: time })} />
        <button type="submit">Search</button>
      </form>

      {state.message ? <p>{state.message}</p> : ""}

      {state.allIncome ? state.allIncome.dailyIncome.map(({ totalIncome }) => {
        return (
          <p key="2"> Total Income : {totalIncome}</p>
        );
      }) : ""}

      {state.allExpense ? state.allExpense.dailyExpenses.map(({ totalExpense }) => {
        return (
          <p key="3"> Total Expense : {totalExpense} </p>
        );
      }) : ""}
    </div>
  );
};
