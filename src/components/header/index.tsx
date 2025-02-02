import { ROUTES } from "../../enums/routes";
import { useAuthViewModal } from "../../pages/auth/authViewModal";
import LogoText from "../logo";
import "./style.scss";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { Menu } from "@szhsin/react-menu";
import avatar from "../../assets/images/Avatar.svg";
const Header = ({ onInputChange }: { onInputChange?: (e) => void }) => {
  const { handleLogout } = useAuthViewModal();
  const location = useLocation();
  const { user } = useAuthViewModal();
  return (
    <div className="container center spaceBetween">
      <LogoText />
      {location.pathname === ROUTES.Home && (
        <input
          type="text"
          className="inputField"
          style={{ width: "25vw", margin: 0 }}
          placeholder="Search here..."
          onChange={onInputChange}
        />
      )}
      <div className="center">
        <Link
          to={location.pathname === ROUTES.Home ? "#" : ROUTES.Home}
          className={location.pathname === ROUTES.Home ? "active tab" : "tab"}
        >
          <h4>Home</h4>
        </Link>
        <Link
          to={location.pathname === ROUTES.Cart ? "#" : ROUTES.Cart}
          className={location.pathname === ROUTES.Cart ? "active tab" : "tab"}
        >
          <h4>Cart</h4>
        </Link>
        <Link
          to={location.pathname === ROUTES.MyOrders ? "#" : ROUTES.MyOrders}
          className={
            location.pathname === ROUTES.MyOrders ? "active tab" : "tab"
          }
        >
          <h4>Orders</h4>
        </Link>
        {user.isAdmin && (
          <Link
            to={
              location.pathname === ROUTES.AddProduct ? "#" : ROUTES.AddProduct
            }
            className={
              location.pathname === ROUTES.AddProduct ? "active tab" : "tab"
            }
          >
            <h4>Add Product</h4>
          </Link>
        )}
      </div>

      <Menu
        gap={10}
        viewScroll="close"
        menuClassName={"headerMenu"}
        align="end"
        menuButton={
          <h4 className="pointer menuButton center smallGap">
            <img src={avatar} className="avatar" />
            {user.name.first} {user.name.last}
          </h4>
        }
        transition
      >
        <div className="">
          <div className="detailContainer center smallGap">
            <img src={avatar} className="avatar" />

            <div>
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>{user.email}</p>
            </div>
          </div>
          <h3 onClick={handleLogout} className="pointer  smallGap logoutText">
            Logout
            <AiOutlineLogout />
          </h3>
        </div>
      </Menu>
    </div>
  );
};

export default Header;
