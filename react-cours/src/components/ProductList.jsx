import ProductCard from './ProductCard'

export default function ProductList({ products, onSelect }) {
    return (
        <>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={onSelect} />
            ))}
            {products.length === 0 && (
                <li className="col-span-full rounded-2xl border border-dashed border-stone-300 py-10 text-center text-[12px] text-stone-500">
                    Aucun produit trouvé.
                </li>
            )}
        </>
    )
}
