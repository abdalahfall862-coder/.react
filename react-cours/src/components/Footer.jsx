import { formatCategory } from '../lib/products'

const INFO_LINKS = ['À propos', 'Contact', 'Livraison', 'Conditions']

const LINK_BASE =
    'mb-2 block w-fit rounded-md px-2 py-1.5 text-[12px] transition duration-200 active:scale-[0.98]'
const LINK_IDLE = `${LINK_BASE} text-stone-400 hover:bg-white/10 hover:text-white`
const LINK_ACTIVE = `${LINK_BASE} bg-white/10 text-white`

export default function Footer({
    categories,
    activeCategory,
    nouveautesAnchor,
    onSelectCategory,
    onShowSection,
    onOpenInfo
}) {
    return (
        <footer className="border-t border-stone-800 bg-[#111] py-20 text-white">
            <div className="shell grid gap-10 md:grid-cols-3">

                <div>
                    <h3 className="mb-4 text-[15px] font-semibold tracking-[0.12em]">SN-SHOP</h3>
                    <p className="max-w-[280px] text-[12px] leading-6 text-stone-400">
                        Votre boutique en ligne.
                    </p>
                </div>

                <nav aria-label="Liens boutique">
                    <h3 className="mb-4 text-[14px] font-semibold">Boutique</h3>
                    <ul>
                        <li>
                            <button
                                type="button"
                                onClick={() => onShowSection(nouveautesAnchor)}
                                className={`${LINK_BASE} text-left text-stone-400 hover:bg-white/10 hover:text-white`}
                            >
                                Nouveautés
                            </button>
                        </li>
                        {categories.map((category) => {
                            const isActive = category === activeCategory

                            return (
                                <li key={category}>
                                    <button
                                        type="button"
                                        onClick={() => onSelectCategory(category)}
                                        aria-current={isActive ? 'true' : undefined}
                                        className={isActive ? LINK_ACTIVE : LINK_IDLE}
                                    >
                                        {formatCategory(category)}
                                    </button>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                <nav aria-label="Informations">
                    <h3 className="mb-4 text-[14px] font-semibold">Informations</h3>
                    <ul>
                        {INFO_LINKS.map((label) => (
                            <li key={label}>
                                <button
                                    type="button"
                                    onClick={() => onOpenInfo(label)}
                                    className={`${LINK_BASE} text-left text-stone-400 hover:bg-white/10 hover:text-white`}
                                >
                                    {label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

            </div>
        </footer>
    )
}
