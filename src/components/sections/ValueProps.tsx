/** AVENZO brand value strip */
export function ValueProps() {
  const props = [
    { icon: '✦', label: 'Free Shipping', desc: 'On orders over $150' },
    { icon: '↩', label: 'Easy Returns',  desc: '30-day return policy' },
    { icon: '♦', label: 'Genuine Leather', desc: 'Premium quality materials' },
    { icon: '◉', label: 'Secure Payment', desc: '100% safe & encrypted' },
  ];

  return (
    <section className="border-t border-[#e8e8e8] bg-[#fafafa]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x divide-[#e8e8e8]">
        {props.map(p => (
          <div key={p.label} className="flex flex-col items-center text-center px-4 gap-2">
            <span className="text-lg text-[#cbbba0]">{p.icon}</span>
            <p className="text-xs tracking-[0.15em] uppercase font-medium">{p.label}</p>
            <p className="text-[11px] text-[#6b6b6b]">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
