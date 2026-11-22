import React, { useState } from 'react';

const PRODUCTS = [
  {
    id: 'prod-laptop',
    name: 'Laptop',
    category: 'Computers',
    price: 650,
    badge: 'Popular',
    variant: 'Pro Series 15"',
    color: 'Ocean Slate',
    description:
      'High-performance laptop for work, coding, and everyday multitasking.',
  },
  {
    id: 'prod-mouse',
    name: 'Mouse',
    category: 'Accessories',
    price: 15,
    badge: 'Best Value',
    variant: 'Wireless Ergonomic',
    color: 'Deep Navy',
    description:
      'Precision wireless mouse with comfortable grip and smooth tracking.',
  },
  {
    id: 'prod-keyboard',
    name: 'Keyboard',
    category: 'Accessories',
    price: 25,
    badge: 'Tactile',
    variant: 'Compact Mechanical',
    color: 'Coastal Blue',
    description:
      'Responsive keyboard designed for fast typing and clean desk setups.',
  },
  {
    id: 'prod-monitor',
    name: 'Monitor',
    category: 'Displays',
    price: 120,
    badge: 'Crisp FHD',
    variant: '24" IPS Display',
    color: 'Sky Navy',
    description:
      'Sharp widescreen monitor with accurate colors and slim bezels.',
  },
];

const SHIPPING_METHODS = [
  { id: 'free', label: 'Free Shipping', eta: '7-20 Days', cost: 0 },
  { id: 'express', label: 'Express Shipping', eta: '1-3 Days', cost: 9 },
];

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  shippingMethod: 'free',
};

function ProductArtwork({ productId, className = 'h-44 w-full' }) {
  switch (productId) {
    case 'prod-laptop':
      return (
        <div
          className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-sky-950 via-sky-900 to-cyan-800 p-4 text-sky-100 ${className}`}
        >
          <div className="h-20 w-32 rounded-t-lg border-2 border-sky-300/60 bg-slate-950 p-1.5 shadow-md">
            <div className="flex h-full items-center justify-center rounded bg-sky-500/20 text-[10px] font-semibold tracking-wider text-sky-200">
              LAPTOP 15&quot;
            </div>
          </div>
          <div className="h-2 w-36 rounded-b-md bg-sky-200/80" />
        </div>
      );
    case 'prod-mouse':
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 via-cyan-50 to-slate-100 p-4 ${className}`}
        >
          <div className="flex h-24 w-14 flex-col items-center rounded-[28px] border-2 border-sky-900 bg-slate-900 shadow-md">
            <div className="mt-4 h-5 w-1.5 rounded-full bg-sky-400" />
            <div className="mt-2 h-[1px] w-10 bg-slate-700" />
          </div>
        </div>
      );
    case 'prod-keyboard':
      return (
        <div
          className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 via-sky-50 to-cyan-100 p-4 ${className}`}
        >
          <div className="grid grid-cols-6 gap-1.5 rounded-xl border border-sky-800/30 bg-sky-950 p-3 shadow-md">
            {Array.from({ length: 18 }).map((_, idx) => (
              <span
                key={idx}
                className="h-2.5 w-3.5 rounded-[2px] bg-sky-100"
              />
            ))}
          </div>
        </div>
      );
    case 'prod-monitor':
    default:
      return (
        <div
          className={`flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-slate-900 via-sky-950 to-sky-800 p-4 ${className}`}
        >
          <div className="flex h-20 w-32 items-center justify-center rounded-lg border-2 border-sky-300/60 bg-sky-950/90 text-[10px] font-semibold tracking-wider text-sky-200 shadow-md">
            24&quot; MONITOR
          </div>
          <div className="h-3 w-1 bg-sky-300/80" />
          <div className="h-1.5 w-12 rounded-full bg-sky-300/80" />
        </div>
      );
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('shop');
  const [cartItems, setCartItems] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [orderCounter, setOrderCounter] = useState(1);
  const [latestOrder, setLatestOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [profileSavedMessage, setProfileSavedMessage] = useState('');

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);
  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const selectedShipping =
    SHIPPING_METHODS.find((m) => m.id === formData.shippingMethod) ||
    SHIPPING_METHODS[0];
  const checkoutGrandTotal = subtotal + selectedShipping.cost;

  const isWishlisted = (productId) => wishlistIds.includes(productId);

  const handleToggleWishlist = (productId) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOpenProductDetail = (product) => {
    setSelectedProduct(product);
    setDetailQty(1);
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    setDetailQty(1);
  };

  const handleAddToCart = (product, quantityToAdd = 1) => {
    const qty = Math.max(1, quantityToAdd);
    setCartItems((prev) => {
      const idx = prev.findIndex((item) => item.id === product.id);
      if (idx > -1) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...prev, { ...product, qty }];
    });
  };

  const handleUpdateQty = (productId, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, qty: nextQty } : item))
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (profileSavedMessage) setProfileSavedMessage('');
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateCheckout = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) nextErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim()) nextErrors.lastName = 'Last name is required.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) nextErrors.phone = 'Phone number is required.';
    if (!formData.address.trim()) nextErrors.address = 'Address is required.';
    return nextErrors;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSavedMessage('Customer profile updated for checkout.');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const validationErrors = validateCheckout();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderId = `ORD-${String(orderCounter).padStart(4, '0')}`;
    const createdOrder = {
      orderId,
      orderDate: new Date().toLocaleString(),
      status: 'Pending',
      customer: {
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      },
      shippingMethod: selectedShipping,
      items: cartItems,
      subtotal,
      shippingCost: selectedShipping.cost,
      grandTotal: checkoutGrandTotal,
    };

    setLatestOrder(createdOrder);
    setOrderHistory((prev) => [createdOrder, ...prev]);
    setOrderCounter((prev) => prev + 1);
    setCartItems([]);
    setErrors({});
    setActiveTab('confirmation');
  };

  const handleViewHistoryOrder = (order) => {
    setLatestOrder(order);
    setActiveTab('confirmation');
  };

  const handleClearHistory = () => {
    setOrderHistory([]);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 w-full border-b border-sky-900/10 bg-white/95 shadow-xs backdrop-blur">
        <div className="flex w-full flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className="flex items-center gap-3 text-left"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-800 text-sm font-bold text-white shadow-xs">
              SH
            </span>
            <div>
              <p className="text-base font-bold tracking-tight text-slate-900">
                Shopping Cart App
              </p>
              <p className="text-xs text-sky-800/80">
                Ocean Blue Storefront • React + Tailwind
              </p>
            </div>
          </button>

          <div className="flex flex-wrap items-center gap-2">
            <nav className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === 'shop'
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-sky-50'
                  }`}
              >
                Products
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('cart')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === 'cart'
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-sky-50'
                  }`}
              >
                <span>Shopping Cart</span>
                <span className="rounded-full bg-sky-600 px-2 py-0.5 text-xs font-semibold text-white">
                  {cartCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('checkout')}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === 'checkout'
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-sky-50'
                  }`}
              >
                Checkout
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === 'history'
                    ? 'bg-sky-800 text-white shadow-xs'
                    : 'text-slate-700 hover:bg-sky-50'
                  }`}
              >
                <span>History</span>
                <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-semibold text-sky-900">
                  {orderHistory.length}
                </span>
              </button>
            </nav>

            <div className="ml-1 flex items-center gap-1.5 border-l border-slate-200 pl-3">
              <button
                type="button"
                onClick={() => setActiveTab('wishlist')}
                aria-label="Wishlist"
                title="Wishlist"
                className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition ${activeTab === 'wishlist'
                    ? 'border-sky-800 bg-sky-800 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800'
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill={wishlistIds.length > 0 ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                {wishlistIds.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                    {wishlistIds.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('account')}
                aria-label="Account"
                title="Customer Account"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition ${activeTab === 'account'
                    ? 'border-sky-800 bg-sky-800 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800'
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="w-full flex-1 px-6 py-8 lg:px-10">
        {activeTab === 'shop' && (
          <section className="space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
                <div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                    Featured Tech Products
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Click any product card to view details, or click Add to Cart.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('cart')}
                  className="rounded-xl bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-sky-900"
                >
                  View Shopping Cart ({cartCount})
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((product) => {
                  const inCart = cartItems.find((item) => item.id === product.id);
                  const liked = isWishlisted(product.id);
                  return (
                    <article
                      key={product.id}
                      onClick={() => handleOpenProductDetail(product)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenProductDetail(product);
                        }
                      }}
                      className="flex cursor-pointer flex-col justify-between rounded-2xl border border-sky-900/10 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-sky-300 hover:shadow-md"
                    >
                      <div>
                        <ProductArtwork productId={product.id} />
                        <div className="mt-4 flex items-center justify-between text-xs">
                          <span className="rounded-md bg-slate-100 px-2.5 py-1 font-medium text-slate-700">
                            {product.category}
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sky-700">
                              {product.badge}
                            </span>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleWishlist(product.id);
                              }}
                              aria-label={`Save ${product.name} to wishlist`}
                              className={`rounded-full p-1 transition ${liked
                                  ? 'text-rose-600 hover:bg-rose-50'
                                  : 'text-slate-400 hover:bg-slate-100 hover:text-rose-600'
                                }`}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill={liked ? 'currentColor' : 'none'}
                                stroke="currentColor"
                                strokeWidth="2"
                                className="h-4 w-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <h2 className="mt-2.5 text-lg font-bold text-slate-900">
                          {product.name}
                        </h2>
                      </div>

                      <div className="mt-5 border-t border-slate-100 pt-4">
                        <div className="mb-3 flex items-baseline justify-between">
                          <span className="text-xs font-medium text-slate-500">
                            Price
                          </span>
                          <span className="text-xl font-bold text-sky-900">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product, 1);
                          }}
                          className="w-full rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 active:scale-[0.99]"
                        >
                          Add to Cart {inCart ? `(${inCart.qty})` : ''}
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <footer className="overflow-hidden rounded-2xl border border-sky-900/10 bg-white shadow-sm">
              <div className="grid grid-cols-1 gap-8 p-6 md:grid-cols-3 lg:px-8">
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-800 text-xs font-bold text-white">
                      SH
                    </span>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Shopping Cart App
                      </p>
                      <p className="text-xs text-sky-800/80">
                        Ocean Blue Storefront
                      </p>
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-relaxed text-slate-500">
                    Quality tech gear with fast delivery, easy cart updates, and
                    clear order tracking.
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-900">
                    Quick Links
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('cart')}
                      className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-900 transition hover:bg-sky-100"
                    >
                      Shopping Cart ({cartCount})
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('checkout')}
                      className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-900 transition hover:bg-sky-100"
                    >
                      Checkout
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('history')}
                      className="rounded-lg bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-900 transition hover:bg-sky-100"
                    >
                      History ({orderHistory.length})
                    </button>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-sky-900">
                    Shipping &amp; Support
                  </p>
                  <p className="mt-3 text-xs text-slate-600">
                    Free Shipping (7-20 Days) • Express Shipping (1-3 Days)
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Phnom Penh, Cambodia
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 bg-sky-950 px-6 py-3 text-center text-xs text-sky-100 lg:px-8">
                <span>© 2026 Shopping Cart App. All rights reserved.</span>
              </div>
            </footer>
          </section>
        )}

        {activeTab === 'cart' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Shopping Cart
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Update quantities, remove items, and review Subtotal &amp; Grand
                  Total.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ← Back to Products
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center shadow-xs">
                <p className="text-base font-semibold text-slate-800">
                  Your cart is currently empty.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="mt-4 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-sky-900/10 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <ProductArtwork
                          productId={item.id}
                          className="h-24 w-28 shrink-0"
                        />
                        <div>
                          <h2 className="text-base font-bold text-slate-900">
                            {item.name}
                          </h2>
                          <p className="text-xs text-slate-500">
                            {item.variant} • {item.color}
                          </p>
                          <p className="mt-1 text-sm font-semibold text-sky-800">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center rounded-xl border border-slate-300">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, item.qty - 1)}
                            className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                          >
                            -
                          </button>
                          <span className="min-w-[2rem] text-center text-sm font-semibold">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, item.qty + 1)}
                            className="px-3 py-1.5 text-sm font-bold text-slate-700 hover:bg-slate-100"
                          >
                            +
                          </button>
                        </div>

                        <p className="min-w-[4.5rem] text-right text-base font-bold text-slate-900">
                          ${(item.price * item.qty).toFixed(2)}
                        </p>

                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <aside className="h-fit rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">
                    Order Summary
                  </h2>
                  <div className="mt-4 space-y-3 border-b border-slate-200 pb-4 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Grand Total</span>
                      <span className="text-lg font-bold text-sky-800">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('checkout')}
                    className="mt-6 w-full rounded-xl bg-sky-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-900"
                  >
                    Proceed to Checkout
                  </button>
                </aside>
              </div>
            )}
          </section>
        )}

        {activeTab === 'checkout' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Checkout Form
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Enter customer details, choose a shipping method, and place
                  your order.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('cart')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                ← Back to Cart
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-sky-900/10 bg-white p-10 text-center shadow-sm">
                <p className="text-base font-semibold text-slate-800">
                  Please add items to cart before checking out.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="mt-4 rounded-xl bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white"
                >
                  Go to Products
                </button>
              </div>
            ) : (
              <form
                onSubmit={handlePlaceOrder}
                noValidate
                className="grid grid-cols-1 gap-6 lg:grid-cols-3"
              >
                <div className="space-y-5 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm lg:col-span-2">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleFormChange}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleFormChange}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                        className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      rows={3}
                      value={formData.address}
                      onChange={handleFormChange}
                      className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                    />
                    {errors.address && (
                      <p className="mt-1 text-xs text-rose-600">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="mb-2 text-sm font-semibold text-slate-800">
                      Shipping Method
                    </p>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {SHIPPING_METHODS.map((method) => (
                        <label
                          key={method.id}
                          className={`flex cursor-pointer items-center justify-between rounded-xl border p-3.5 transition ${formData.shippingMethod === method.id
                              ? 'border-sky-700 bg-sky-50'
                              : 'border-slate-200 hover:border-slate-300'
                            }`}
                        >
                          <span className="flex items-center gap-2.5 text-sm font-medium">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={method.id}
                              checked={formData.shippingMethod === method.id}
                              onChange={handleFormChange}
                              className="accent-sky-700"
                            />
                            <span>
                              {method.label} ({method.eta})
                            </span>
                          </span>
                          <span className="text-sm font-bold text-slate-900">
                            ${method.cost.toFixed(2)}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                <aside className="h-fit rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
                  <h2 className="text-lg font-bold text-slate-900">
                    Order Summary
                  </h2>
                  <ul className="mt-4 space-y-2 border-b border-slate-200 pb-4 text-sm">
                    {cartItems.map((item) => (
                      <li key={item.id} className="flex justify-between">
                        <span>
                          {item.name} × {item.qty}
                        </span>
                        <span className="font-semibold">
                          ${(item.price * item.qty).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 space-y-2 border-b border-slate-200 pb-4 text-sm">
                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Shipping</span>
                      <span>${selectedShipping.cost.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between text-lg font-bold">
                    <span>Grand Total</span>
                    <span className="text-sky-800">
                      ${checkoutGrandTotal.toFixed(2)}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="mt-6 w-full rounded-xl bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Place Order
                  </button>
                </aside>
              </form>
            )}
          </section>
        )}

        {activeTab === 'confirmation' && latestOrder && (
          <section className="w-full rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-2xl font-bold text-emerald-700">
              Order Placed Successfully!
            </h1>
            <div className="mt-5 grid grid-cols-1 gap-4 rounded-xl bg-sky-50/70 p-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Order ID</p>
                <p className="font-bold text-slate-900">{latestOrder.orderId}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Order Status</p>
                <p className="font-bold text-sky-800">{latestOrder.status}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Customer Name</p>
                <p className="font-semibold text-slate-900">
                  {latestOrder.customer.fullName}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Order Date</p>
                <p className="font-semibold text-slate-900">
                  {latestOrder.orderDate}
                </p>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <thead className="bg-sky-950 text-xs uppercase text-white">
                  <tr>
                    <th className="px-4 py-3">Ordered Product</th>
                    <th className="px-4 py-3">Price</th>
                    <th className="px-4 py-3">QTY</th>
                    <th className="px-4 py-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {latestOrder.items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-4 py-3 font-medium">{item.name}</td>
                      <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3">{item.qty}</td>
                      <td className="px-4 py-3 text-right font-semibold">
                        ${(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-4">
              <span className="text-lg font-bold">Total Amount</span>
              <span className="text-2xl font-bold text-sky-800">
                ${latestOrder.grandTotal.toFixed(2)}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                View History
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="rounded-xl bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-900"
              >
                Continue Shopping
              </button>
            </div>
          </section>
        )}

        {activeTab === 'history' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Order History
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  All placed orders in your current session.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {orderHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearHistory}
                    className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
                  >
                    Clear History
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="rounded-xl bg-sky-800 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-900"
                >
                  ← Back to Products
                </button>
              </div>
            </div>

            {orderHistory.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center shadow-xs">
                <p className="text-base font-semibold text-slate-800">
                  No orders in history yet.
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Complete a checkout to see your placed orders here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="mt-4 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Shop Products
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orderHistory.map((order) => (
                  <article
                    key={order.orderId}
                    className="rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-base font-bold text-slate-900">
                          {order.orderId}
                        </span>
                        <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-semibold text-sky-900">
                          {order.status}
                        </span>
                        <span className="text-xs text-slate-500">
                          {order.orderDate}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold text-sky-800">
                          ${order.grandTotal.toFixed(2)}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleViewHistoryOrder(order)}
                          className="rounded-xl bg-sky-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-sky-800"
                        >
                          View Details
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
                      <div>
                        <span className="font-semibold text-slate-800">
                          Customer:
                        </span>{' '}
                        {order.customer.fullName} ({order.customer.phone})
                      </div>
                      <div>
                        <span className="font-semibold text-slate-800">
                          Items:
                        </span>{' '}
                        {order.items
                          .map((item) => `${item.name} ×${item.qty}`)
                          .join(', ')}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'wishlist' && (
          <section className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Saved Wishlist
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Products you marked with the heart icon.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                ← Back to Products
              </button>
            </div>

            {wishlistProducts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-300 bg-white p-10 text-center shadow-xs">
                <p className="text-base font-semibold text-slate-800">
                  Your wishlist is empty.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveTab('shop')}
                  className="mt-4 rounded-xl bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {wishlistProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex flex-col justify-between rounded-2xl border border-sky-900/10 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <ProductArtwork productId={product.id} />
                      <h2 className="mt-3 text-lg font-bold text-slate-900">
                        {product.name}
                      </h2>
                      <p className="mt-1 text-lg font-bold text-sky-900">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                      <button
                        type="button"
                        onClick={() => handleAddToCart(product, 1)}
                        className="flex-1 rounded-xl bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800"
                      >
                        Add to Cart
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleWishlist(product.id)}
                        className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {activeTab === 'account' && (
          <section className="w-full space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Customer Account
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Save your customer contact and shipping details for faster
                  checkout.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('shop')}
                className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
              >
                ← Back to Products
              </button>
            </div>

            <form
              onSubmit={handleSaveProfile}
              className="space-y-5 rounded-2xl border border-sky-900/10 bg-white p-6 shadow-sm"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Address
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleFormChange}
                  className="mt-1 w-full rounded-xl border border-slate-300 px-3.5 py-2 text-sm focus:border-sky-600 focus:outline-none"
                />
              </div>

              {profileSavedMessage && (
                <p className="text-xs font-semibold text-emerald-700">
                  {profileSavedMessage}
                </p>
              )}

              <div className="flex justify-end gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-900"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </section>
        )}
      </main>

      {selectedProduct && (
        <div
          onClick={handleCloseProductDetail}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl overflow-hidden rounded-2xl border border-sky-900/15 bg-white shadow-xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="rounded-md bg-sky-100 px-2.5 py-1 text-xs font-semibold text-sky-900">
                  {selectedProduct.category}
                </span>
                <span className="text-xs font-semibold text-sky-700">
                  {selectedProduct.badge}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleWishlist(selectedProduct.id)}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-semibold transition ${isWishlisted(selectedProduct.id)
                      ? 'border-rose-200 bg-rose-50 text-rose-700'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {isWishlisted(selectedProduct.id) ? '♥ Saved' : '♡ Save'}
                </button>
                <button
                  type="button"
                  onClick={handleCloseProductDetail}
                  className="rounded-lg px-2.5 py-1 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
              <ProductArtwork
                productId={selectedProduct.id}
                className="h-60 w-full"
              />

              <div className="flex flex-col justify-between space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {selectedProduct.name}
                  </h2>
                  <p className="mt-1 text-2xl font-bold text-sky-800">
                    ${selectedProduct.price.toFixed(2)}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {selectedProduct.description}
                  </p>

                  <dl className="mt-4 space-y-1.5 rounded-xl bg-sky-50/70 p-3 text-xs text-slate-700">
                    <div className="flex justify-between">
                      <dt className="font-medium text-slate-500">Variant</dt>
                      <dd className="font-semibold">{selectedProduct.variant}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="font-medium text-slate-500">Color</dt>
                      <dd className="font-semibold">{selectedProduct.color}</dd>
                    </div>
                  </dl>
                </div>

                <div className="space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-600">
                      Quantity
                    </span>
                    <div className="flex items-center rounded-xl border border-slate-300">
                      <button
                        type="button"
                        onClick={() =>
                          setDetailQty((q) => Math.max(1, q - 1))
                        }
                        className="px-3 py-1 text-sm font-bold text-slate-700 hover:bg-slate-100"
                      >
                        -
                      </button>
                      <span className="min-w-[2rem] text-center text-sm font-semibold">
                        {detailQty}
                      </span>
                      <button
                        type="button"
                        onClick={() => setDetailQty((q) => q + 1)}
                        className="px-3 py-1 text-sm font-bold text-slate-700 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(selectedProduct, detailQty);
                      handleCloseProductDetail();
                    }}
                    className="w-full rounded-xl bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800"
                  >
                    Add {detailQty} to Cart ($
                    {(selectedProduct.price * detailQty).toFixed(2)})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}