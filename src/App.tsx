import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Event from './pages/Event';
import SharedAlbum from './pages/SharedAlbum';
import ProtectedRoute from './pages/ProtectedRoute';
import { CartProvider, useCart } from './hooks/CartContext';
import { AuthProvider } from './hooks/AuthContext';
import { APIProvider } from './hooks/APIContext';
import Album from './pages/Album';

const AppContent = () => {
  const { memories } = useCart();

  return (
    <div className="bg-cat bg-contain repeat-y px-4 sm:px-[25%] py-2">
      <nav className="bg-transparent text-[#b18984]">
        <ul className="flex relative">
          <li>
            <Link to="/">
              <IconContext.Provider value={{ color: "#b18984" }}>
                <FaHouse size={36} />
              </IconContext.Provider>
            </Link>
          </li>
          <li className="ml-auto relative">
            <Link to="/cart" className="relative inline-block">
              <IconContext.Provider value={{ color: "#b18984" }}>
                <FaShoppingCart size={36} />
              </IconContext.Provider>
              {memories.length > 0 && (
                <span className="absolute -bottom-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                  {memories.length}
                </span>
              )}
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/gan-2025" element={<ProtectedRoute><Event tags={["gan", "2025"]} storeName="GAN 2025"/></ProtectedRoute>} />
        <Route path="/retreat-2024" element={<ProtectedRoute><Event tags={["retreat", "2024"]} storeName="Retreat 2024"/></ProtectedRoute>} />
        <Route path="/retreat-2025" element={<ProtectedRoute><Event tags={["retreat", "2025"]} storeName="Retreat 2025"/></ProtectedRoute>} />
        <Route path="/san-2024" element={<ProtectedRoute><Event tags={["san", "2024"]} storeName="San 2024"/></ProtectedRoute>} />
        <Route path="/sso-2025" element={<ProtectedRoute><Event tags={["sso", "2025"]} storeName="SSO 2025"/></ProtectedRoute>} />
        <Route path="/album" element={<ProtectedRoute><Album /></ProtectedRoute>} />
        <Route
          path="/albums/:album_name"
          element={
              <SharedAlbum />
          }
        />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <APIProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </APIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;