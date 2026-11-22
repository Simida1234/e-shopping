// src/components/CartPage.jsx
import React from 'react';
import ProductArtwork from './ProductArtwork';

export default function CartPage({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onBackToShop,
  onProceedToCheckout,
}) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const grandTotal = subtotal;

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
            Shopping Cart Page
          </span>
          <h1 className="mt-2 text-2xl font-bold text-stone-900">Your Cart</h1>
          <p className="mt-1 text-sm text-stone-600">
            Review items, update quantities, or remove products before checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToShop}
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-stone-100"
        >
          ← Continue Shopping
        </button>
      </div>

      {cartItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-10 text-center">
          <p className="text-base font-semibold text-stone-800">
            Your shopping cart is empty.
          </p>
          <p className="mt-1 text-sm text-stone-500">
            Add Laptop, Mouse, Keyboard, or Monitor from the product list.
          </p>
          <button
            type="button"
            onClick={onBackToShop}
            className="mt-5 rounded-xl bg-amber-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => {
              const lineTotal = item.price * item.qty;

              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-center gap-4">
                    <ProductArtwork
                      productId={item.id}
                      className="h-24 w-28 shrink-0"
                    />
                    <div>
                      <h2 className="text-base font-bold text-stone-900">
                        {item.name}
                      </h2>
                      <p className="text-xs text-stone-500">
                        {item.variant} • {item.color}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-stone-700">
                        Unit Price: ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 sm:justify-end">
                    <div className="flex items-center rounded-xl border border-stone-300">
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        aria-label={`Decrease quantity of ${item.name}`}
                        className="px-3 py-1.5 text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="min-w-[2.25rem] text-center text-sm font-semibold text-stone-900">
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        aria-label={`Increase quantity of ${item.name}`}
                        className="px-3 py-1.5 text-sm font-bold text-stone-700 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>

                    <div className="min-w-[5.5rem] text-right">
                      <p className="text-xs text-stone-400">Item Total</p>
                      <p className="text-base font-bold text-stone-900">
                        ${lineTotal.toFixed(2)}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-100"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>

            <div className="mt-4 space-y-3 border-b border-stone-200 pb-4 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Shipping</span>
                <span className="text-stone-500">Calculated at checkout</span>
              </div>
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-base font-bold text-stone-900">
                Grand Total
              </span>
              <span className="text-2xl font-bold text-amber-700">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={onProceedToCheckout}
              className="mt-6 w-full rounded-xl bg-stone-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
            >
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </section>
  );
}