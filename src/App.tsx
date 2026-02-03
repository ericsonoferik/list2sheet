import { useState } from "react";
import { HtmlInput } from "./components/HtmlInput";
import { DataPreview } from "./components/DataPreview";
import { ExportButton } from "./components/ExportButton";
import { parseWishlist } from "./lib/parseWishlist";
import type { WishlistItem } from "./types";
import "./App.css";

function App() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string>();
  const [parsed, setParsed] = useState(false);

  const handleParse = (html: string) => {
    const result = parseWishlist(html);
    if (result.error) {
      setError(result.error);
      setItems([]);
      setParsed(false);
    } else {
      setError(undefined);
      setItems(result.items);
      setParsed(true);
    }
  };

  return (
    <div className="app">
      <header>
        <h1>list2sheet</h1>
        <p className="subtitle">Amazon Wishlist to Spreadsheet</p>
      </header>
      <main>
        <HtmlInput onParse={handleParse} error={error} />
        {parsed && items.length > 0 && (
          <>
            <DataPreview items={items} />
            <div className="export-bar">
              <ExportButton items={items} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
