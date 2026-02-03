import type { WishlistItem } from "../types";
import { generateXlsx } from "../lib/generateXlsx";

interface ExportButtonProps {
  items: WishlistItem[];
}

export function ExportButton({ items }: ExportButtonProps) {
  return (
    <button
      className="btn-export"
      disabled={items.length === 0}
      onClick={() => generateXlsx(items)}
    >
      Download .xlsx
    </button>
  );
}
