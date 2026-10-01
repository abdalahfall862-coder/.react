import { formatCategory } from '../lib/products'

const LINK_BASE =
    'rounded-full px-3 py-2 text-[13px] font-medium transition duration-200 active:scale-[0.98]'
const LINK_ACTIVE = `${LINK_BASE} bg-stone-100 text-stone-950`
const LINK_IDLE = `${LINK_BASE} text-stone-700 hover:bg-stone-100 hover:text-stone-950`

export default function Header({
    categories,
    activeCategory,
    isSearchOpen,
    searchToggleRef,
    onHome,
    onToggleSearch,
    onSelectCategory
}) {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
            <div className="shell flex min-h-[78px] items-center justify-between gap-8">

                <a
                    href="#contenu"
                    onClick={onHome}
                    data-nav
                    className="group flex items-center gap-3 whitespace-nowrap transition duration-200 hover:opacity-70 active:scale-[0.98]"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-[10px] font-bold tracking-[-0.04em] text-white transition duration-200 group-hover:bg-stone-700">
                        SN
                    </span>
                    <span className="text-[15px] font-semibold tracking-[0.16em]">SN-SHOP</span>
                </a>

                <nav aria-label="Navigation principale" className="hidden md:block">
                    <ul className="flex items-center gap-8">
                        <li>
                            <a href="#contenu" onClick={onHome} data-nav className={LINK_IDLE}>
                                Accueil
                            </a>
                        </li>
                        {categories.map((category) => {
                            const isActive = category === activeCategory

                            return (
                                <li key={category}>
                                    <a
                                        href="#produits-populaires"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            onSelectCategory(category)
                                        }}
                                        data-nav
                                        aria-current={isActive ? 'page' : undefined}
                                        className={isActive ? LINK_ACTIVE : LINK_IDLE}
                                    >
                                        {formatCategory(category)}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <div className="flex items-center gap-2 sm:gap-5">
                    <button
                        id="search-toggle"
                        ref={searchToggleRef}
                        type="button"
                        onClick={onToggleSearch}
                        aria-controls="search-panel"
                        aria-expanded={isSearchOpen}
                        className="whitespace-nowrap rounded-full border border-gray-300 px-4 py-2 text-[11px] font-medium text-gray-700 transition duration-200 hover:border-black hover:bg-black hover:text-white active:scale-[0.98] sm:text-[12px]"
                    >
                        Recherche
                    </button>
                </div>

            </div>
        </header>
    )
}
