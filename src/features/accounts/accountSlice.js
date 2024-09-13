// slice is a piece of teh total state

import {
  ACCOUNT_DEPOSIT,
  ACCOUNT_WITHDRAW,
  ACCOUNT_REQUEST_LOAN,
  ACCOUNT_PAY_LOAN,
  ACCOUNT_CONVERT_DEPOSIT,
} from "../actionTypes";

// Start by creating some initial state onject
const initialStateAccount = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
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
    case ACCOUNT_CONVERT_DEPOSIT:
      return { ...currentState, isLoading: true };
    case ACCOUNT_DEPOSIT:
      return {
        ...currentState,
        balance: currentState.balance + payload,
        isLoading: false,
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
function deposit(amount, currency) {
  if (currency === "USD") return { type: ACCOUNT_DEPOSIT, payload: amount };

  // redux will know that this function is the thunk
  return async (dispatch, getState) => {
    //API call

    const host = "api.frankfurter.app";
    dispatch({ type: ACCOUNT_CONVERT_DEPOSIT });
    const resp = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await resp.json();

    const convertedAmount = data.rates.USD;
    dispatch({ type: ACCOUNT_DEPOSIT, payload: convertedAmount });
  };
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
