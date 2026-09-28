import ProductCard from './productCard'

export default function ProductList({ products }) {
  return (
    <>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
      <li
        data-empty-state
        hidden
        className="col-span-full rounded-2xl border border-dashed border-stone-300 py-10 text-center text-[12px] text-stone-500"
      >
        Aucun produit trouvé.
      </li>
    </>
  )
}