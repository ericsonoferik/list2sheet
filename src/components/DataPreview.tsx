import type { WishlistItem } from "../types";

interface DataPreviewProps {
  items: WishlistItem[];
}

export function DataPreview({ items }: DataPreviewProps) {
  const totalCost = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="preview-section">
      <div className="preview-header">
        <h2>
          Parsed Items <span className="badge">{items.length}</span>
        </h2>
        <p className="total-cost">
          Total: <strong>${totalCost.toFixed(2)}</strong>
        </p>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th className="col-name">Product Name</th>
              <th className="col-desc">Description</th>
              <th className="col-qty">Qty</th>
              <th className="col-price">Price</th>
              <th className="col-total">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={i}>
                <td className="col-name truncate">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.name}
                    </a>
                  ) : (
                    item.name
                  )}
                </td>
                <td className="col-desc truncate">{item.description}</td>
                <td className="col-qty">{item.quantity}</td>
                <td className="col-price">${item.price.toFixed(2)}</td>
                <td className="col-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
