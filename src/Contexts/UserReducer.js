export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'HADMIN_INFO':
      return {
        ...state,
        Info: action.payload
      };
    case 'ALL_DOCS':
      return {
        ...state,
        Docs: action.payload
      };
    default:
      return null;
  }
};
