// import { CUSTOMER_CREATE_CUSTOMER, CUSTOMER_UPDATE_NAME } from "../actionTypes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare(fullName, nationalID) {
        return {
          payload: {
            fullName,
            nationalID,
            createdAt: new Date().toISOString(),
          },
        };
      },

      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalID = action.payload.nationalID;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});

export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;

// CLASSIC REDUX APPROACH
/*
// Start by creating some initial state onject
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

// Then Create a reducer function that takes in the initial state and an action
export default function customerReducer(
  currentState = initialStateCustomer,
  action
) {
  const { type, payload } = action;
  switch (type) {
    case CUSTOMER_CREATE_CUSTOMER:
      return {
        ...currentState,
        fullName: payload.fullName,
        nationalID: payload.nationalID,
        createdAt: payload.createdAt,
      };
    case CUSTOMER_UPDATE_NAME:
      return { ...currentState, fullName: payload };
    default:
      return currentState;
    // because of combined reducer
    //here we only return initial state and dont throw an error
  }
}

//Then create action creators
// redux would work without action creators but convention is to use them

function createCustomer(fullName, nationalID) {
  return {
    type: CUSTOMER_CREATE_CUSTOMER,
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName) {
  return { type: CUSTOMER_UPDATE_NAME, payload: fullName };
}

export { createCustomer, updateName };
*/
