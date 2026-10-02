import ProductList from './ProductList'

export default function ProductSection({ id, title, products, onShowAll, onSelect }) {
    return (
        <section id={id} className="shell py-16 sm:py-20">
            <div className="mb-7 flex items-end justify-between">
                <h2 className="text-[clamp(22px,3vw,30px)] font-semibold tracking-[-0.04em]">{title}</h2>
                <button
                    type="button"
                    onClick={() => onShowAll(id)}
                    className="rounded-full border border-gray-300 px-3 py-2 text-[12px] font-medium text-gray-700 transition duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.98]"
                >
                    Voir tout
                </button>
            </div>

            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
                <ProductList products={products} onSelect={onSelect} />
            </ul>
        </section>
    )
}
