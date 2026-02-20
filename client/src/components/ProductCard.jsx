import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axios";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }
    addToCart(product._id, 1);
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert("Please login to add items to wishlist");
      return;
    }
    try {
      await axios.post(`/wishlist/add/${product._id}`);
      alert("Added to wishlist!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition relative">
      {/* Heart button - positioned absolutely over the image */}
      <button
        onClick={handleAddToWishlist}
        className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-pink-50 transition z-10"
      >
        <Heart size={20} className="text-pink-500" />
      </button>

      {/* Product Image */}
      <Link to={`/products/${product._id}`}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>

      {/* Product Details */}
      <div className="p-4">
        <Link to={`/products/${product._id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-500 text-sm mt-1 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-2xl font-bold text-pink-500">
            ₹{product.price}
          </span>

          <button
            onClick={handleAddToCart}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition flex items-center gap-2"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>

        <p className="text-gray-400 text-xs mt-2">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
      </div>
    </div>
  );
}

export default ProductCard;
