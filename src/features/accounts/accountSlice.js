// slice is a piece of teh total state

import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_WITHDRAW,
  ACCOUNT_REQUEST_LOAN,
  ACCOUNT_PAY_LOAN,
} from "../actionTypes";

// Start by creating some initial state onject
const initialStateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
};

// Then Create a reducer function that takes in the initial state and an action

export default function accountReducer(
  currentState = initialStateAccount,
  action
) {
  // one difference between redux and reducer is that you need to pass initial state as a default parameter to the reducer function
  const { type, payload } = action;
  // actions should be written in terms of the state domain and what happened
  switch (type) {
    case ACCOUNT_DEPOSIT:
      return {
        ...currentState,
        balance: currentState.balance + payload,
      };
    case ACCOUNT_WITHDRAW:
      return {
        ...currentState,
        balance: currentState.balance - payload,
      };
    case ACCOUNT_REQUEST_LOAN:
      if (currentState.loanAmount > 0) {
        return currentState;
      }
      return {
        ...currentState,
        balance: currentState.balance + payload.amount,
        loanAmount: payload.amount,
        loanPurpose: payload.purpose,
      };
    case ACCOUNT_PAY_LOAN:
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

// Then create action creators
// redux would work without action creators but convention is to use them
function deposit(amount) {
  return { type: ACCOUNT_DEPOSIT, payload: amount };
}

function withdraw(amount) {
  return { type: ACCOUNT_WITHDRAW, payload: amount };
}

function requestLoan(amount, purpose) {
  return {
    type: ACCOUNT_REQUEST_LOAN,
    payload: { amount: amount, purpose: purpose },
  };
}

function payLoan() {
  return { type: ACCOUNT_PAY_LOAN };
}

export { deposit, withdraw, requestLoan, payLoan };
