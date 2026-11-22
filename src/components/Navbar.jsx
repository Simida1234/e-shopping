// src/components/Navbar.jsx
import React from 'react';

export default function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  onResetOrder,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/90 bg-stone-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={() => setActiveTab('shop')}
          className="flex items-center gap-3 text-left"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-sm font-bold text-amber-50">
            SH
          </span>
          <div>
            <p className="text-base font-bold tracking-tight text-stone-900">
              Shopping Cart App
            </p>
            <p className="text-xs text-stone-500">
              React Storefront &amp; Order Flow
            </p>
          </div>
        </button>

        <nav className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('shop')}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'shop'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            Products
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('cart')}
            className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'cart'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            <span>Shopping Cart</span>
            <span className="rounded-full bg-amber-600 px-2 py-0.5 text-xs font-semibold text-white">
              {cartCount}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('checkout')}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'checkout'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            Checkout
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('erd')}
            className={`rounded-lg px-3.5 py-2 text-sm font-medium transition ${
              activeTab === 'erd'
                ? 'bg-stone-900 text-white'
                : 'text-stone-700 hover:bg-stone-200/70'
            }`}
          >
            Database ERD
          </button>

          {onResetOrder && (
            <button
              type="button"
              onClick={onResetOrder}
              className="rounded-lg border border-stone-300 px-3 py-2 text-xs font-medium text-stone-600 transition hover:bg-stone-100"
            >
              Reset Demo
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}