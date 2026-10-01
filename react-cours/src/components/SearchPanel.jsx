import { useEffect, useRef } from 'react'

export default function SearchPanel({ searchTerm, status, onSearchChange, onClose }) {
    const inputRef = useRef(null)

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <section id="search-panel" className="border-b border-gray-200 bg-[#fafaf9]" aria-label="Recherche">
            <div className="shell py-5">
                <div className="mb-3 flex items-center justify-between gap-4">
                    <label htmlFor="search-input" className="text-[13px] font-semibold">
                        Rechercher un produit
                    </label>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full border border-gray-300 px-3 py-2 text-[12px] font-medium text-gray-500 transition duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.98]"
                    >
                        Fermer
                    </button>
                </div>
                <input
                    id="search-input"
                    ref={inputRef}
                    type="search"
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    placeholder="Nom, description ou catégorie"
                    className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-[13px] outline-none transition duration-200 focus:border-black focus:ring-2 focus:ring-black focus:ring-offset-2"
                />
                <p id="search-status" className="mt-2 text-[12px] text-gray-500" aria-live="polite">
                    {status}
                </p>
            </div>
        </section>
    )
}
