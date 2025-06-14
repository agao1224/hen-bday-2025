import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FaHouse } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IconContext } from 'react-icons/lib';

import Home from './pages/Home';
import Cart from './pages/Cart';
import { CartProvider } from './hooks/CartContext';

/*
  Components:
- Filters + tags on each "store"
-- Tag ideas: year, relationship (school, church, family, etc)
- "Store" display component, each store is an event in her life
- Checkout page listing pictures selected
- "Delivery" page = a collage (or something) that displays said photos
*/

/*
Headings / Emphasis
#7B4B3A
Warm brown
Cute and soft but readable
Subtle text
#b18984
Muted rose
Harmonizes with the background
Accent / Button
#FFD1DC
Baby pink
Lighter tone for layered kawaii style
Link color
#e8bdc7
Pink coral
Friendly and visible on pink
*/

/*
  TODO(andrew):
- add memories to each store that you can checkout
- searching (big stretch feature)
- category icons to filter by (slight stretch)
- * collect photos + come up w different categories (HIGH PRIORITY)
- add song with checkout? (stretch)
- * ask aleena to come up with better color to contrast against background
*/

const App = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="bg-cat bg-contain repeat-y px-4 sm:px-[25%] py-2">
          <nav className="bg-transparent text-[#b18984]">
            <ul className="flex">
              <li>
                <Link to="/">
                  <IconContext.Provider value={{
                    color: "#b18984"
                  }}>
                    <FaHouse size={36} />
                  </IconContext.Provider>
                </Link>
              </li>
              <li className="ml-auto">
                <Link to="/cart">
                  <IconContext.Provider value={{
                    color: "#b18984"
                  }}>
                    <FaShoppingCart size={36} />
                  </IconContext.Provider>
                </Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App;