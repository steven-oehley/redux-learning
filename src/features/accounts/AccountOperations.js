import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deposit, withdraw, requestLoan, payLoan } from "./accountSlice";

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanPurpose, setLoanPurpose] = useState("");
  const [currency, setCurrency] = useState("USD");

  const dispatch = useDispatch();
  const accountInfo = useSelector((store) => store.account);

  function handleDeposit() {
    if (!depositAmount) return;
    dispatch(deposit(depositAmount, currency));
    setDepositAmount("");
    setCurrency("");
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return;
    dispatch(withdraw(withdrawalAmount));
    setWithdrawalAmount("");
  }

  function handleRequestLoan() {
    if (!loanAmount || !loanPurpose) return;
    dispatch(requestLoan(loanAmount, loanPurpose));
    setLoanAmount("");
    setLoanPurpose("");
  }

  function handlePayLoan() {
    dispatch(payLoan());
  }

  return (
    <div className="text-slate-700">
      <h2 className="text-slate-700 mb-4 text-2xl">Your account operations</h2>
      <div className="inputs">
        <div className="flex items-center gap-2 mb-2">
          <label>Deposit</label>
          <input
            className="bg-slate-400"
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-slate-700"
            text-slate-700
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button
            className="bg-sky-700 text-white px-4 py-1 rounded-full ring-2 ring-sky-400"
            onClick={handleDeposit}
          >
            Deposit {depositAmount}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label>Withdraw</label>
          <input
            className="bg-slate-400"
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <label>Request loan</label>
          <input
            className="bg-slate-400"
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            className="bg-slate-400"
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {accountInfo.loanAmount > 0 && (
          <div className="text-slate-700">
            <span className="text-slate-700">
              Pay back ${accountInfo.loanAmount}({accountInfo.loanPurpose})
            </span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountOperations;
