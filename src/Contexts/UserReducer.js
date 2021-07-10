export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'CARS':
      return {
        ...state,
        allCars: action.payload
      };
    case 'DRIVERS':
      return {
        ...state,
        allDrivers: action.payload
      };
    case 'INCOMES':
      return {
        ...state,
        allIncome: action.payload
      };
    case 'EXPENSES':
      return {
        ...state,
        allExpense: action.payload
      };
    case 'USERS':
      return {
        ...state,
        users: action.payload
      };
    default:
      return null;
  }
};
