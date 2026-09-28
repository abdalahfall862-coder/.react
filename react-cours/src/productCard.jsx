export default function ProductCard({ product }) {
  const { name, description, category, price } = product

  return (
    <li
      className="min-w-0"
      data-product-card
      data-category={category}
      data-search={`${name} ${description} ${category}`}
    >
      <article className="product-card group flex h-full flex-col overflow-hidden">
        <div className="product-visual" aria-hidden="true">
          <span className="product-label">{category}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.02em]">{name}</h3>
          <p className="text-[12px] leading-5 text-stone-500">{description}</p>
          <div className="mt-5 flex items-end justify-between gap-3">
            <strong className="text-[13px] font-semibold">{price}</strong>
            <button
              type="button"
              data-action="product"
              data-label={name}
              data-description={description}
              data-price={price}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] transition duration-200 hover:text-stone-500 active:scale-[0.98]"
              aria-label={`Voir ${name}`}
            >
              Voir →
            </button>
          </div>
        </div>
      </article>
    </li>
  )
}