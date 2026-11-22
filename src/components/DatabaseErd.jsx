// src/components/DatabaseErd.jsx
import React, { useState } from 'react';

const TABLES = [
  {
    name: 'Customers',
    columns: [
      'customer_id (PK)',
      'first_name',
      'last_name',
      'email',
      'phone_number',
      'address',
    ],
  },
  {
    name: 'Categories',
    columns: ['category_id (PK)', 'category_name', 'description'],
  },
  {
    name: 'Products',
    columns: [
      'product_id (PK)',
      'category_id (FK)',
      'product_name',
      'price',
      'stock_qty',
    ],
  },
  {
    name: 'Orders',
    columns: [
      'order_id (PK)',
      'customer_id (FK)',
      'order_date',
      'shipping_method',
      'total_amount',
      'status',
    ],
  },
  {
    name: 'Order_Items',
    columns: [
      'order_item_id (PK)',
      'order_id (FK)',
      'product_id (FK)',
      'quantity',
      'unit_price',
    ],
  },
];

const MERMAID_ERD = `erDiagram
    Customers ||--o{ Orders : places
    Categories ||--o{ Products : categorizes
    Orders ||--|{ Order_Items : contains
    Products ||--o{ Order_Items : included_in

    Customers {
        int customer_id PK
        varchar first_name
        varchar last_name
        varchar email
        varchar phone_number
        text address
    }
    Categories {
        int category_id PK
        varchar category_name
        text description
    }
    Products {
        int product_id PK
        int category_id FK
        varchar product_name
        decimal price
        int stock_qty
    }
    Orders {
        int order_id PK
        int customer_id FK
        datetime order_date
        varchar shipping_method
        decimal total_amount
        varchar status
    }
    Order_Items {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal unit_price
    }`;

export default function DatabaseErd() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(MERMAID_ERD);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="space-y-6">
      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <span className="inline-block rounded-full bg-stone-100 px-3 py-1 text-xs font-semibold text-stone-700">
          Practical Exercise • Database Design
        </span>
        <h1 className="mt-2 text-2xl font-bold text-stone-900">
          E-Commerce Order Database ERD
        </h1>
        <p className="mt-1 text-sm text-stone-600">
          Relationships across Customers, Categories, Products, Orders, and
          Order_Items.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {TABLES.map((table) => (
          <div
            key={table.name}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h2 className="border-b border-stone-100 pb-2 text-base font-bold text-stone-900">
              {table.name}
            </h2>
            <ul className="mt-3 space-y-1.5 text-xs text-stone-700">
              {table.columns.map((col) => (
                <li
                  key={col}
                  className="rounded bg-stone-50 px-2.5 py-1.5 font-mono"
                >
                  {col}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-bold text-stone-900">
            Mermaid ERD Script
          </h2>
          <button
            type="button"
            onClick={handleCopy}
            className="rounded-lg bg-stone-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-stone-800"
          >
            {copied ? 'Copied!' : 'Copy Mermaid'}
          </button>
        </div>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-stone-900 p-4 text-xs leading-relaxed text-amber-100">
          <code>{MERMAID_ERD}</code>
        </pre>
      </div>
    </section>
  );
}