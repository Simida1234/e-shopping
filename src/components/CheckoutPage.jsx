// src/components/CheckoutPage.jsx
import React, { useState } from 'react';
import { SHIPPING_METHODS } from '../data/products';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  shippingMethod: 'free',
};

export default function CheckoutPage({
  cartItems,
  onBackToCart,
  onPlaceOrder,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const selectedShipping =
    SHIPPING_METHODS.find((m) => m.id === formData.shippingMethod) ||
    SHIPPING_METHODS[0];

  const grandTotal = subtotal + selectedShipping.cost;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.firstName.trim()) {
      nextErrors.firstName = 'First name is required.';
    }
    if (!formData.lastName.trim()) {
      nextErrors.lastName = 'Last name is required.';
    }
    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      nextErrors.phone = 'Phone number is required.';
    }
    if (!formData.address.trim()) {
      nextErrors.address = 'Address is required.';
    }
    return nextErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onPlaceOrder({
      customer: {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        fullName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
      },
      shippingMethod: selectedShipping,
      items: cartItems,
      subtotal,
      shippingCost: selectedShipping.cost,
      grandTotal,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-10 text-center shadow-sm">
        <h2 className="text-xl font-bold text-stone-900">
          No items available for checkout
        </h2>
        <p className="mt-2 text-sm text-stone-600">
          Please add products to your cart before placing an order.
        </p>
        <button
          type="button"
          onClick={onBackToCart}
          className="mt-5 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div>
          <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">
            Practical Exercise 2
          </span>
          <h1 className="mt-2 text-2xl font-bold text-stone-900">
            Checkout &amp; Shipping
          </h1>
          <p className="mt-1 text-sm text-stone-600">
            Enter customer details, choose a shipping method, and review your
            order summary.
          </p>
        </div>

        <button
          type="button"
          onClick={onBackToCart}
          className="rounded-xl border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 hover:bg-stone-100"
        >
          ← Back to Cart
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-1 gap-6 lg:grid-cols-3"
      >
        <div className="space-y-6 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-lg font-bold text-stone-900">
            Customer Information
          </h2>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-stone-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Sokha"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.firstName && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Chan"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.lastName && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="sokha.chan@example.com"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.email && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="012 345 678"
                className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
              />
              {errors.phone && (
                <p className="mt-1 text-xs font-medium text-rose-600">
                  {errors.phone}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">
              Address *
            </label>
            <textarea
              name="address"
              rows={3}
              value={formData.address}
              onChange={handleChange}
              placeholder="Street 271, Sangkat Boeng Tumpun, Khan Meanchey, Phnom Penh"
              className="mt-1 w-full rounded-xl border border-stone-300 px-3.5 py-2.5 text-sm text-stone-900 focus:border-amber-600 focus:outline-none"
            />
            {errors.address && (
              <p className="mt-1 text-xs font-medium text-rose-600">
                {errors.address}
              </p>
            )}
          </div>

          <div className="space-y-3 border-t border-stone-200 pt-5">
            <h2 className="text-lg font-bold text-stone-900">
              Shipping Method
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {SHIPPING_METHODS.map((method) => {
                const isSelected = formData.shippingMethod === method.id;
                return (
                  <label
                    key={method.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                      isSelected
                        ? 'border-amber-600 bg-amber-50/70'
                        : 'border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={isSelected}
                        onChange={handleChange}
                        className="h-4 w-4 accent-amber-600"
                      />
                      <div>
                        <p className="text-sm font-semibold text-stone-900">
                          {method.label}
                        </p>
                        <p className="text-xs text-stone-500">{method.eta}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-stone-900">
                      ${method.cost.toFixed(2)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-stone-900">Order Summary</h2>

          <ul className="mt-4 divide-y divide-stone-100 border-b border-stone-200 pb-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-2.5 text-sm"
              >
                <div>
                  <p className="font-medium text-stone-900">{item.name}</p>
                  <p className="text-xs text-stone-500">
                    Qty: {item.qty} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-stone-900">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-2.5 border-b border-stone-200 pb-4 text-sm">
            <div className="flex justify-between text-stone-600">
              <span>Subtotal</span>
              <span className="font-semibold text-stone-900">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-stone-600">
              <span>Shipping ({selectedShipping.label})</span>
              <span className="font-semibold text-stone-900">
                ${selectedShipping.cost.toFixed(2)}
              </span>
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
            type="submit"
            className="mt-6 w-full rounded-xl bg-amber-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-amber-700"
          >
            Place Order
          </button>
        </aside>
      </form>
    </section>
  );
}