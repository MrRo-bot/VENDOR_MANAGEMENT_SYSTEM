import { useState } from "react";
import { Drawer, Menu, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import logo from "../assets/ven.png";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../AuthContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const auth = getAuth(); // Initialize the auth instance

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login"); // Redirect to the login page after sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  return (
    <nav className="flex items-center bg-gray-50 h-[8vh]">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link to="/">
              <img src={logo} alt="logo" className="w-24 h-16" />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-4">
              <Link
                to="/"
                className="px-3 py-2 font-bold text-indigo-900 rounded-md hover:bg-indigo-700 hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/add"
                className="px-3 py-2 font-bold text-indigo-900 rounded-md hover:bg-indigo-700 hover:text-white"
              >
                Add
              </Link>
              <button
                onClick={handleLogout}
                className="px-3 py-2 font-bold text-indigo-900 rounded-md hover:bg-indigo-700 hover:text-white"
              >
                Logout
              </button>
              <div className="flex items-center justify-center gap-2 px-3 py-2 text-lg font-bold text-white bg-indigo-700 rounded-md">
                {user.displayName}
                <div className="grid self-center place-center">
                  {user.photoURL ? (
                    <img
                      referrerPolicy="no-referrer"
                      className="w-10 text-center rounded-full aspect-square"
                      loading="lazy"
                      src={user.photoURL}
                    />
                  ) : (
                    user.displayName[0]
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="block md:hidden">
            <Button
              type="primary"
              onClick={showDrawer}
              icon={<MenuOutlined />}
            />
            <Drawer
              title="Menu"
              placement="right"
              closable={false}
              onClose={onClose}
              open={visible}
            >
              <Menu
                theme="dark"
                mode="inline"
                onClick={onClose}
                defaultSelectedKeys={["home"]}
              >
                <Menu.Item key="home">
                  <Link to="/">Home</Link>
                </Menu.Item>
                <Menu.Item key="add">
                  <Link to="/add">Add</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                  <button onClick={handleLogout}>Logout</button>
                </Menu.Item>
              </Menu>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
