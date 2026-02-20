import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, LogOut, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MyShop
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <span className="text-gray-600 font-medium">Hi, {user.name}</span>
              {/* Orders link */}
              <Link
                to="/orders"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Orders
              </Link>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="text-gray-600 hover:text-red-500 transition"
              >
                <Heart size={22} />
              </Link>

              {/* Cart with badge */}
              <Link
                to="/cart"
                className="relative text-gray-600 hover:text-blue-600 transition"
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Admin link */}
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-purple-600 font-medium hover:text-purple-800"
                >
                  Admin
                </Link>
              )}

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-500 transition"
              >
                <LogOut size={22} />
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-600 font-medium transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
