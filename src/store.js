// need to import create store method
import { createStore } from "redux";

// How to use redux

// Start by creating some initial state onject

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

// Create a reducer function that takes in the initial state and an action

function reducer(currentState = initialState, action) {
  // one difference between redux and reducer is that you need to pass initial state as a default parameter to the reducer function
  const { type, payload } = action;
  // actions should be written in terms of the state domain and what happened
  switch (type) {
    case "account/deposit":
      return {
        ...currentState,
        balance: currentState.balance + payload,
      };
    case "account/withdraw":
      return {
        ...currentState,
        balance: currentState.balance - payload,
      };
    case "account/requestLoan":
      if (currentState.loanAmount > 0) {
        return currentState;
      }
      return {
        ...currentState,
        loanAmount: payload.amount,
        loanPurpose: payload.purpose,
      };
    case "account/payLoan":
      return {
        ...currentState,
        balance: currentState.balance - currentState.loanAmount,
        loanAmount: 0,
        loanPurpose: "",
      };
    default:
      return currentState;
  }
}

const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });
