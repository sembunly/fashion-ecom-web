import { X, Trash2, Plus, Minus } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface Props {
  onClose: () => void;
}

function formatPrice(n: number) { return `$${n.toFixed(2)}`; }

export function CartDrawer({ onClose }: Props) {
  const { cartItems, updateQty, removeFromCart } = useStore();

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.salePrice ?? item.price;
    return acc + price * item.quantity;
  }, 0);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden />

      {/* Drawer */}
      <aside className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-white flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b border-[#e8e8e8]">
          <span className="text-xs tracking-[0.2em] uppercase">
            Your Bag {cartItems.length > 0 && `(${cartItems.reduce((a, c) => a + c.quantity, 0)})`}
          </span>
          <button onClick={onClose} aria-label="Close cart">
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16">
              <span className="text-5xl opacity-20">🛍</span>
              <p className="text-sm text-[#6b6b6b] tracking-wide">Your bag is empty</p>
              <button onClick={onClose} className="text-xs tracking-[0.15em] uppercase underline underline-offset-4">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#f0f0f0]">
              {cartItems.map(item => (
                <li key={item.productId} className="flex gap-4 px-6 py-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#ebebeb]" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm tracking-wide leading-snug mb-1 truncate">{item.name}</p>
                    <p className="text-xs text-[#6b6b6b] mb-3">
                      {item.salePrice != null ? formatPrice(item.salePrice) : formatPrice(item.price)}
                    </p>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border border-[#e8e8e8]">
                        <button
                          onClick={() => updateQty(item.productId, item.quantity - 1)}
                          aria-label="Decrease qty"
                          className="px-2.5 py-1.5 hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-3 text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQty(item.productId, item.quantity + 1)}
                          aria-label="Increase qty"
                          className="px-2.5 py-1.5 hover:bg-[#f5f5f5] transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        aria-label="Remove item"
                        className="text-[#9b9b9b] hover:text-[#0a0a0a] transition-colors"
                      >
                        <Trash2 size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="text-sm text-right flex-shrink-0">
                    {formatPrice((item.salePrice ?? item.price) * item.quantity)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-[#e8e8e8] p-6 flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <span className="tracking-wide text-[#6b6b6b]">Subtotal</span>
              <span className="font-medium">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-[#9b9b9b] text-center">Shipping calculated at checkout</p>
            <a
              href="/checkout"
              className="block w-full bg-[#0a0a0a] text-white text-center text-xs tracking-[0.2em] uppercase py-4 hover:bg-[#cbbba0] transition-colors duration-300"
            >
              Checkout
            </a>
            <button
              onClick={onClose}
              className="text-center text-xs tracking-[0.15em] uppercase text-[#6b6b6b] underline underline-offset-4 hover:text-[#0a0a0a]"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
