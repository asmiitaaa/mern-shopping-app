import { Link } from "react-router-dom";
import { Package, ShoppingBag, ArrowLeft } from "lucide-react";

function AdminDashboard() {
  return (
    <div>
      <Link
        to="/"
        className="flex items-center gap-2 text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={20} />
        Back to shop
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/admin/products"
          className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-4 rounded-full">
              <Package size={32} className="text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Manage Products
              </h2>
              <p className="text-gray-500 mt-1">
                Add, edit, or delete products
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/orders"
          className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-4 rounded-full">
              <ShoppingBag size={32} className="text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Manage Orders
              </h2>
              <p className="text-gray-500 mt-1">View and update order status</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
