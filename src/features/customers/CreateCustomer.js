import { useState } from "react";
import { useDispatch } from "react-redux";
import { createCustomer } from "./customerSlice";

function Customer() {
  const [fullName, setFullName] = useState("");
  const [nationalId, setNationalId] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    dispatch(createCustomer(fullName, nationalId));
  }

  return (
    <div>
      <h2 className="text-2xl text-slate-600 mt-4">Create new customer</h2>
      <div className="flex gap-4 mt-4 mb-4">
        <div className="flex items-center">
          <label className="mr-2 text-slate-700">Customer full name</label>
          <input
            className="bg-slate-400"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <label className="mr-2  text-slate-700">National ID</label>
          <input
            className="bg-slate-400"
            value={nationalId}
            onChange={(e) => setNationalId(e.target.value)}
          />
        </div>
        <button
          className="ring-2 px-4 py-1 rounded-full bg-sky-700 text-white"
          onClick={handleClick}
        >
          Create new customer
        </button>
      </div>
    </div>
  );
}

export default Customer;
