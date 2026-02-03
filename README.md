# list2sheet

Convert Amazon wishlists into downloadable Excel spreadsheets. Runs entirely in the browser — no backend, no data leaves your machine.

## Usage

1. Open your Amazon wishlist in a browser
2. Scroll all the way to the bottom so every item loads
3. Open DevTools (F12) → Console tab
4. Run: `copy(document.documentElement.outerHTML)`
5. Paste the HTML into the app and click **Parse Wishlist**
6. Review the preview, then click **Export to Excel**

The exported `.xlsx` includes product name, quantity, price, totals with formulas, and links back to each product.

## Development

```sh
npm install
npm run dev
```

Build for production:

```sh
npm run build
```
