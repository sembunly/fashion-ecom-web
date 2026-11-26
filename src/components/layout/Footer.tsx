export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-light tracking-widest uppercase mb-1">Join the AVENZO Club</h3>
            <p className="text-sm text-white/50">Get early access, exclusive offers, and style inspiration.</p>
          </div>
          <form
            className="flex w-full md:w-auto gap-0"
            onSubmit={e => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 md:w-72 bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/50 transition-colors"
            />
            <button
              type="submit"
              className="bg-white text-[#0a0a0a] text-xs tracking-[0.2em] uppercase px-5 py-3 hover:bg-[#cbbba0] hover:text-white transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <p className="font-light text-xl tracking-[0.35em] uppercase mb-4">AVENZO</p>
          <p className="text-xs text-white/50 leading-relaxed max-w-xs">
            Modern essentials in exceptional leather and refined materials, made for a quieter kind of luxury.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener" className="text-white/50 hover:text-white transition-colors">
              <span className="text-xs tracking-wider">IG</span>
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener" className="text-white/50 hover:text-white transition-colors">
              <span className="text-xs tracking-wider">YT</span>
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">Shop</h4>
          <ul className="flex flex-col gap-3">
            {['Women', 'Men', 'New Arrivals', 'Collections', 'Sale'].map(l => (
              <li key={l}>
                <a href={`/${l.toLowerCase().replace(' ', '-')}`} className="text-xs text-white/60 hover:text-white tracking-wide transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">Help</h4>
          <ul className="flex flex-col gap-3">
            {['Shipping & Returns', 'Size Guide', 'Store Locator', 'Contact Us', 'FAQs'].map(l => (
              <li key={l}>
                <a href="#" className="text-xs text-white/60 hover:text-white tracking-wide transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-[10px] tracking-[0.25em] uppercase text-white/40 mb-5">Account</h4>
          <ul className="flex flex-col gap-3">
            {['Sign In', 'Register', 'My Orders', 'Wishlist', 'Loyalty Program'].map(l => (
              <li key={l}>
                <a href="#" className="text-xs text-white/60 hover:text-white tracking-wide transition-colors">{l}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/30">
          <p>© {new Date().getFullYear()} AVENZO. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white/60 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
