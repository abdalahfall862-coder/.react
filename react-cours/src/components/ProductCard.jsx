import { formatCategory } from '../lib/products'

export default function ProductCard({ product, onSelect }) {
    const { name, description, category, price } = product

    return (
        <li className="min-w-0">
            <article className="product-card group flex h-full flex-col overflow-hidden">
                <div className="relative flex aspect-[4/5] items-end overflow-hidden bg-stone-100 p-4">
                    <img
                        src={product.image || undefined}
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                    <span className="relative z-[1] text-[10px] font-bold uppercase tracking-[0.16em] text-stone-500">
                        {formatCategory(category)}
                    </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-2 text-[15px] font-semibold tracking-[-0.02em]">{name}</h3>
                    <p className="text-[12px] leading-5 text-stone-500">{description}</p>
                    <div className="mt-5 flex items-end justify-between gap-3">
                        <strong className="text-[13px] font-semibold">{price}</strong>
                        <button
                            type="button"
                            onClick={() => onSelect(product)}
                            aria-label={`Voir ${name}`}
                            className="text-[11px] font-semibold uppercase tracking-[0.12em] transition duration-200 hover:text-stone-500 active:scale-[0.98]"
                        >
                            Voir
                        </button>
                    </div>
                </div>
            </article>
        </li>
    )
}
