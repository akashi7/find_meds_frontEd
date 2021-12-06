export const UserReducer = (state, action) => {
  switch (action.type) {
    case 'ALL_DOCS':
      return {
        ...state,
        Docs: action.payload
      };
    case 'VIEW_PATIENT':
      return {
        ...state,
        P_info: action.payload
      };
    case 'PHARMA_MEDS':
      return {
        ...state,
        phMeds: action.payload
      };
    case 'DOC_MEDS':
      return {
        ...state,
        docMeds: action.payload
      };
    case 'PHARMA_VIEW_MEDS':
      return {
        ...state,
        pharmaMeds: action.payload
      };
    case 'DOC_VIEW_MEDS':
      return {
        ...state,
        docViewPrev: action.payload
      };
    default:
      return null;
  }
};
