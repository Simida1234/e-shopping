// src/components/ProductList.jsx
import React from 'react';
import ProductArtwork from './ProductArtwork';

export default function ProductList({
  products,
  cartItems,
  onAddToCart,
  onGoToCart,
}) {
  const getItemQty = (productId) => {
    const found = cartItems.find((item) => item.id === productId);
    return found ? found.qty : 0;
  };

  return (
    <section className="space-y-6">
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            Practical Exercise 1
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
            Featured Products
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Select items to add to your shopping cart and proceed to checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={onGoToCart}
          className="inline-flex items-center justify-center rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          View Shopping Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => {
          const qtyInCart = getItemQty(product.id);

          return (
            <article
              key={product.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div>
                <ProductArtwork productId={product.id} className="h-36 w-full" />

                <div className="mt-4 flex items-center justify-between gap-2">
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600">
                    {product.category}
                  </span>
                  <span className="text-xs font-semibold text-amber-700">
                    {product.badge}
                  </span>
                </div>

                <h2 className="mt-2 text-lg font-bold text-stone-900">
                  {product.name}
                </h2>
                <p className="mt-1 text-xs leading-relaxed text-stone-500">
                  {product.description}
                </p>
              </div>

              <div className="mt-5 border-t border-stone-100 pt-4">
                <div className="mb-3 flex items-baseline justify-between">
                  <span className="text-xs text-stone-500">Price</span>
                  <span className="text-xl font-bold text-stone-900">
                    ${product.price.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="w-full rounded-xl bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-amber-700 active:scale-[0.99]"
                >
                  Add to Cart {qtyInCart > 0 ? `(${qtyInCart})` : ''}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}