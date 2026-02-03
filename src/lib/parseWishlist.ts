import type { WishlistItem } from "../types";

export interface ParseResult {
  items: WishlistItem[];
  error?: string;
}

export function parseWishlist(html: string): ParseResult {
  if (!html.trim()) {
    return { items: [], error: "Please paste HTML content first." };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const containers = doc.querySelectorAll("li.g-item-sortable");

  if (containers.length === 0) {
    return {
      items: [],
      error:
        "No wishlist items found. Make sure you pasted the full page source of an Amazon wishlist page.",
    };
  }

  const items: WishlistItem[] = [];

  containers.forEach((li) => {
    const name = parseName(li);
    const price = parsePrice(li);
    const quantity = parseQuantity(li);
    const description = parseDescription(li);
    const url = parseUrl(li);

    items.push({ name, price, quantity, description, url });
  });

  return { items };
}

function parseName(li: Element): string {
  const anchor = li.querySelector('a[id^="itemName_"]');
  if (!anchor) return "Unknown Item";
  const title = anchor.getAttribute("title");
  if (title) return title.trim();
  return anchor.textContent?.trim() || "Unknown Item";
}

function parsePrice(li: Element): number {
  // Prefer data-price attribute on the li element
  const dataPrice = (li as HTMLElement).dataset?.price;
  if (dataPrice) {
    const parsed = parseFloat(dataPrice);
    if (!isNaN(parsed)) return parsed;
  }

  // Fallback: parse from price span
  const priceSpan = li.querySelector('span[id^="itemPrice_"]');
  if (priceSpan) {
    const text = priceSpan.textContent || "";
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parsed = parseFloat(cleaned);
    if (!isNaN(parsed)) return parsed;
  }

  return 0;
}

function parseQuantity(li: Element): number {
  const qtySpan = li.querySelector('span[id^="itemRequested_"]');
  if (qtySpan) {
    const parsed = parseInt(qtySpan.textContent || "", 10);
    if (!isNaN(parsed) && parsed > 0) return parsed;
  }
  return 1;
}

function parseDescription(li: Element): string {
  const byline = li.querySelector('span[id^="item-byline"]');
  return byline?.textContent?.trim() || "";
}

function parseUrl(li: Element): string {
  // Try data attribute with ASIN
  const repoParams = (li as HTMLElement).dataset?.repositionActionParams;
  if (repoParams) {
    try {
      const parsed = JSON.parse(repoParams);
      const externalId = parsed.itemExternalId;
      if (externalId) {
        // Extract ASIN — typically format like "ASIN:B0XXXXX"
        const asinMatch = externalId.match(/ASIN:([A-Z0-9]+)/i);
        if (asinMatch) {
          return `https://www.amazon.com/dp/${asinMatch[1]}`;
        }
      }
    } catch {
      // Fall through to fallback
    }
  }

  // Fallback: href from the name link
  const anchor = li.querySelector('a[id^="itemName_"]');
  if (anchor) {
    const href = anchor.getAttribute("href");
    if (href) {
      // If relative URL, prepend Amazon domain
      if (href.startsWith("/")) {
        return `https://www.amazon.com${href}`;
      }
      return href;
    }
  }

  return "";
}
