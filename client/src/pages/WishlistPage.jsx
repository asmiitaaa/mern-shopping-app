import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Trash2, ShoppingCart } from "lucide-react";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchWishlist();
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const { data } = await axios.get("/wishlist");
      setWishlist(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(`/wishlist/remove/${productId}`);
      setWishlist(wishlist.filter((item) => item._id !== productId));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (productId) => {
    addToCart(productId, 1);
  };

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Your wishlist is empty
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={product.image || "https://via.placeholder.com/300"}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
            </Link>

            <div className="p-4">
              <Link to={`/products/${product._id}`}>
                <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                  {product.name}
                </h3>
              </Link>

              <p className="text-gray-500 text-sm mt-1 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-bold text-blue-600">
                  ₹{product.price}
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
                    title="Add to cart"
                  >
                    <ShoppingCart size={18} />
                  </button>

                  <button
                    onClick={() => handleRemove(product._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                    title="Remove from wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
