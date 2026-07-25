import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import SocialService from './pages/SocialService';
import Enquiry from './pages/Enquiry';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminLeads from './pages/admin/Leads';
import AdminProducts from './pages/admin/Products';
import AdminServices from './pages/admin/Services';
import AdminCategories from './pages/admin/Categories';
import AdminSettings from './pages/admin/Settings';
import ProtectedRoute from './components/ProtectedRoute';
import { getToken, clearTokens } from './api/client';

function Header() {
  const loggedIn = Boolean(getToken());
  return (
    <header className="header">
      <div className="container header-inner">
        <NavLink to="/" className="logo">BS Smart Solution</NavLink>
        <nav className="nav">
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/social-service">Social Service</NavLink>
          <NavLink to="/enquiry">Enquiry</NavLink>
          {loggedIn ? (
            <>
              <NavLink to="/admin">Admin</NavLink>
              <a
                href="/admin/login"
                onClick={() => clearTokens()}
              >
                Logout
              </a>
            </>
          ) : (
            <NavLink to="/admin/login">Admin Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/social-service" element={<SocialService />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/leads" element={<AdminLeads />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/services" element={<AdminServices />} />
            <Route path="/admin/categories" element={<AdminCategories />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </main>
    </>
  );
}
