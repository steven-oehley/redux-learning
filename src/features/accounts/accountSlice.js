// slice is a piece of teh total state
import { createSlice } from "@reduxjs/toolkit";

// import {
//   ACCOUNT_DEPOSIT,
//   ACCOUNT_WITHDRAW,
//   ACCOUNT_REQUEST_LOAN,
//   ACCOUNT_PAY_LOAN,
//   ACCOUNT_CONVERT_DEPOSIT,
// } from "../actionTypes";

const initialState = {
  balance: 0,
  loanAmount: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      reducer(state, action) {
        if (state.loanAmount > 0) {
          return;
        }
        state.balance += action.payload.amount;
        state.loanAmount = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loanAmount;
      state.loanAmount = 0;
      state.loanPurpose = "";
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function (dispatch, getState) {
    const host = "api.frankfurter.app";
    dispatch({ type: "account/convertingCurrency" });
    const resp = await fetch(
      `https://${host}/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await resp.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: "account/deposit", payload: convertedAmount });
  };
}

export default accountSlice.reducer;

// CLASSIC REDUX BASED APPROACH

// Start by creating some initial state onject

// const initialStateAccount = {
//   balance: 0,
//   loanAmount: 0,
//   loanPurpose: "",
//   isLoading: false,
// };

// Then Create a reducer function that takes in the initial state and an action

/*export default function accountReducer(
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
*/
