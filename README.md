# Mini E-Commerce (React)

A small e-commerce UI built with React + TypeScript.

## Features

- Product grid (loads from DummyJSON, falls back to local mocked data)
- Search by name (debounced)
- Filter by category
- Sort by price (low → high / high → low)
- Clear all filters
- Cart: add/remove/update quantity (quantity capped by stock)
- Cart totals: total items + total price
- Empty states: no results, empty cart
- Cart persistence via localStorage
- Product details modal
- Light/Dark mode toggle (persisted) with smooth transitions

## Run locally

- Install: `npm install`
- Dev: `npm run dev`
- Build: `npm run build`

## Notes

- No UI libraries are used.
- The product list is isolated from cart state updates to avoid unnecessary re-renders.
