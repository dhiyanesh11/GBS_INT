import type { FAQ } from "@/lib/site";

export function FaqList({
  items,
  grouped = true,
}: {
  items: FAQ[];
  grouped?: boolean;
}) {
  if (!grouped) {
    return (
      <div className="faq-list">
        {items.map((item) => (
          <details className="faq-item" key={item.question}>
            <summary>{item.question}</summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
    );
  }

  const categories = Array.from(new Set(items.map((item) => item.category)));

  return (
    <>
      {categories.map((category) => (
        <div className="faq-group" key={category}>
          <h2>{category}</h2>
          <div className="faq-list">
            {items
              .filter((item) => item.category === category)
              .map((item) => (
                <details className="faq-item" key={item.question}>
                  <summary>{item.question}</summary>
                  <div className="faq-answer">
                    <p>{item.answer}</p>
                  </div>
                </details>
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
