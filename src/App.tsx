import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AccountPage } from './pages/AccountPage';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<CatalogPage />} />
          <Route path="/products/search" element={<CatalogPage mode="search" />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/categories/:slug" element={<CatalogPage mode="category" />} />
          <Route path="/collections/:slug" element={<CatalogPage mode="collection" />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

function NotFound() {
  return (
    <main className="flex flex-col flex-1 items-center justify-center py-32 gap-6 px-6 text-center">
      <span className="text-7xl font-thin text-[#e8e8e8]">404</span>
      <h1 className="text-2xl font-light tracking-widest uppercase">Page Not Found</h1>
      <p className="text-sm text-[#6b6b6b] max-w-xs">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <a
        href="/"
        className="mt-2 text-xs tracking-[0.2em] uppercase border border-[#0a0a0a] px-8 py-3 hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
      >
        Back to Home
      </a>
    </main>
  );
}

export default App;
