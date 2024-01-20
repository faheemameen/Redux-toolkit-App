import { useSelector } from "react-redux";
import { CartIcon } from "../Icon";

const Navbar = () => {
  const { amount } = useSelector((store) => store.cart);
  return (
    <nav>
      <div className="nav-center">
        <h1>Redux Toolkit</h1>
        <div className="nav-container">
          <CartIcon />
          <div className="amount-container">
            <p className="total-amount">{amount}</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
