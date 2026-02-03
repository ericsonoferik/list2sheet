interface HtmlInputProps {
  onParse: (html: string) => void;
  error?: string;
}

export function HtmlInput({ onParse, error }: HtmlInputProps) {
  let textareaEl: HTMLTextAreaElement | null = null;

  const handleParse = () => {
    onParse(textareaEl?.value || "");
  };

  return (
    <section className="input-section">
      <div className="instructions">
        <h2>How to get your wishlist HTML</h2>
        <ol>
          <li>Open your Amazon wishlist page in a browser</li>
          <li>
            <strong>Scroll all the way to the bottom</strong> so every item
            loads
          </li>
          <li>
            Open DevTools (<kbd>F12</kbd>), go to the <strong>Console</strong>{" "}
            tab
          </li>
          <li>
            Run: <code>copy(document.documentElement.outerHTML)</code>
          </li>
          <li>Paste here</li>
        </ol>
      </div>
      <textarea
        ref={(el) => { textareaEl = el; }}
        placeholder="Paste full page source HTML here..."
        spellCheck={false}
      />
      {error && <p className="error-msg">{error}</p>}
      <button className="btn-primary" onClick={handleParse}>
        Parse Wishlist
      </button>
    </section>
  );
}
