import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";

import { useSelector } from "react-redux";

function App() {
  const customerName = useSelector((store) => store.customer.fullName);

  return (
    <div>
      <h1 className="text-4xl text-sky-800">🏦 The React-Redux Bank ⚛️</h1>
      {!customerName && <CreateCustomer />}
      <Customer />
      <AccountOperations />
      <BalanceDisplay />
    </div>
  );
}

export default App;
