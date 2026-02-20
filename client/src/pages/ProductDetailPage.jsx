import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ShoppingCart, Heart, ArrowLeft } from "lucide-react";
import axios from "../api/axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function ProductDetailPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product._id, quantity);
    alert("Added to cart!");
  };

  const handleAddToWishlist = async () => {
    if (!user) {
      alert("Please login to add items to wishlist");
      navigate("/login");
      return;
    }
    try {
      await axios.post(`/wishlist/add/${product._id}`);
      alert("Added to wishlist!");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading product...</div>;
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Product not found
        </h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to products
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img
            src={product.image || "https://via.placeholder.com/500"}
            alt={product.name}
            className="w-full rounded-2xl shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl font-bold text-blue-600">
              ${product.price}
            </span>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                product.stock > 0
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>

          <p className="text-gray-600 mb-6 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Category</p>
            <span className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">
              {product.category}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={handleAddToWishlist}
              className="bg-white border-2 border-red-500 text-red-500 px-6 py-3 rounded-lg font-medium hover:bg-red-50 transition flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
