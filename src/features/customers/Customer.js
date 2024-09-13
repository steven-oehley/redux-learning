import { useSelector } from "react-redux";

function Customer() {
  const customerName = useSelector((store) => store.customer.fullName);
  return (
    <h2 className="mb-4 text-sky-600 text-2xl">👋 Welcome, {customerName}</h2>
  );
}

export default Customer;
