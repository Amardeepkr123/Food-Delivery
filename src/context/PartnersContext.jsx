import React, { createContext, useContext, useReducer } from 'react';

const PartnersContext = createContext(null);

export const usePartners = () => {
  const context = useContext(PartnersContext);
  if (!context) {
    throw new Error('usePartners must be used within PartnersProvider');
  }
  return context;
};

const partnersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PARTNERS':
      return { ...state, partners: action.payload };
    case 'UPDATE_PARTNER':
      return {
        ...state,
        partners: state.partners.map(p =>
          p.id === action.payload.id ? action.payload : p
        ),
      };
    case 'DELETE_PARTNER':
      return {
        ...state,
        partners: state.partners.filter(p => p.id !== action.payload),
      };
    default:
      return state;
  }
};

export const PartnersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(partnersReducer, { partners: [] });

  return (
    <PartnersContext.Provider value={{ state, dispatch }}>
      {children}
    </PartnersContext.Provider>
  );
};