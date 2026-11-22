// src/components/OrderConfirmation.jsx
import React from 'react';

export default function OrderConfirmation({ order, onContinueShopping }) {
  if (!order) return null;

  return (
    <section className="mx-auto max-w-3xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="border-b border-stone-200 pb-6">
        <span className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
          Practical Exercise 3 • Order Confirmation
        </span>
        <h1 className="mt-3 text-2xl font-bold text-emerald-700">
          Order Placed Successfully!
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Thank you for your order. Below are your confirmation details.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-stone-50 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs font-medium text-stone-500">Order ID</p>
          <p className="mt-0.5 text-base font-bold text-stone-900">
            {order.orderId}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-500">Order Status</p>
          <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-0.5 text-xs font-bold text-amber-800">
            {order.status}
          </span>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-500">Customer Name</p>
          <p className="mt-0.5 text-sm font-semibold text-stone-900">
            {order.customer.fullName}
          </p>
          <p className="text-xs text-stone-500">
            {order.customer.email} • {order.customer.phone}
          </p>
        </div>

        <div>
          <p className="text-xs font-medium text-stone-500">Order Date</p>
          <p className="mt-0.5 text-sm font-semibold text-stone-900">
            {order.orderDate}
          </p>
          <p className="text-xs text-stone-500">{order.customer.address}</p>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-base font-bold text-stone-900">Ordered Products</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-stone-100 text-xs uppercase text-stone-600">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">QTY</th>
                <th className="px-4 py-3 text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-3 font-medium text-stone-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-3 text-stone-700">
                    ${item.price.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-stone-700">{item.qty}</td>
                  <td className="px-4 py-3 text-right font-semibold text-stone-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 space-y-2 border-t border-stone-200 pt-4 text-sm">
        <div className="flex justify-between text-stone-600">
          <span>Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-stone-600">
          <span>Shipping ({order.shippingMethod.label})</span>
          <span>${order.shippingCost.toFixed(2)}</span>
        </div>
        <div className="flex justify-between pt-2 text-lg font-bold text-stone-900">
          <span>Total Amount</span>
          <span className="text-amber-700">
            ${order.grandTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onContinueShopping}
          className="rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-800"
        >
          Start New Order
        </button>
      </div>
    </section>
  );
}