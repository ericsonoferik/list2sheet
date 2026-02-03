import * as XLSX from "xlsx";
import type { WishlistItem } from "../types";

export function generateXlsx(items: WishlistItem[]): void {
  const header = [
    "Product Name",
    "Quantity",
    "Description",
    "Price Each",
    "Total Price",
    "Link",
  ];

  const rows: (string | number | { f: string })[][] = items.map(
    (item, idx) => [
      item.name,
      item.quantity,
      item.description,
      item.price,
      { f: `B${idx + 2}*D${idx + 2}` },
      item.url,
    ]
  );

  const lastDataRow = items.length + 1;
  const totalRow: (string | number | { f: string })[] = [
    "TOTAL",
    "",
    "",
    "",
    { f: `SUM(E2:E${lastDataRow})` },
    "",
  ];

  const wsData = [header, ...rows, totalRow];
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Column widths
  ws["!cols"] = [
    { wch: 50 }, // Product Name
    { wch: 10 }, // Quantity
    { wch: 30 }, // Description
    { wch: 15 }, // Price Each
    { wch: 15 }, // Total Price
    { wch: 50 }, // Link
  ];

  // Apply currency format to Price Per Item (col D) and Total Price (col E)
  const currencyFmt = '"$"#,##0.00';
  for (let r = 1; r <= items.length + 1; r++) {
    const priceCell = ws[XLSX.utils.encode_cell({ r, c: 3 })];
    if (priceCell) priceCell.z = currencyFmt;
    const totalCell = ws[XLSX.utils.encode_cell({ r, c: 4 })];
    if (totalCell) totalCell.z = currencyFmt;
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Wishlist");
  XLSX.writeFile(wb, "amazon-wishlist.xlsx");
}
