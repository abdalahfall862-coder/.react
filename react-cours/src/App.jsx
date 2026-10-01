import { useEffect, useMemo, useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import InfoPanel from './components/InfoPanel'
import ProductSection from './components/ProductSection'
import SearchPanel from './components/SearchPanel'
import { allProducts, sections } from './data/products'
import { collectCategories, filterProducts, formatResultCount } from './lib/products'

const PRODUCTS_ANCHOR = sections[0].id
const NOUVEAUTES_ANCHOR = sections[1].id

const INFO_MESSAGES = {
    'À propos': 'La page À propos sera bientôt disponible.',
    Contact: 'Utilisez le formulaire de contact pour nous écrire.',
    Livraison: 'Les informations de livraison seront bientôt disponibles.',
    Conditions: 'Les conditions seront bientôt disponibles.'
}

const DEFAULT_INFO_MESSAGE = 'Cette page sera bientôt disponible.'

function scrollToSection(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function App() {
    const [searchTerm, setSearchTerm] = useState('')
    const [activeCategory, setActiveCategory] = useState(null)
    const [panel, setPanel] = useState(null)

    const searchToggleRef = useRef(null)

    const categories = useMemo(() => collectCategories(allProducts), [])

    const filteredProducts = useMemo(
        () => filterProducts(allProducts, { searchTerm, category: activeCategory }),
        [searchTerm, activeCategory]
    )

    const productsBySection = useMemo(
        () =>
            Object.fromEntries(
                sections.map((section) => [
                    section.id,
                    filteredProducts.filter((product) => product.section === section.id)
                ])
            ),
        [filteredProducts]
    )

    const isSearchOpen = panel?.kind === 'search'
    const hasFilters = Boolean(searchTerm || activeCategory)
    const searchStatus = formatResultCount(filteredProducts.length, activeCategory, hasFilters)

    useEffect(() => {
        if (!panel) {
            return undefined
        }

        function handleKeydown(event) {
            if (event.key !== 'Escape') {
                return
            }
            if (panel.kind === 'search') {
                searchToggleRef.current?.focus()
            }
            setPanel(null)
        }

        document.addEventListener('keydown', handleKeydown)
        return () => document.removeEventListener('keydown', handleKeydown)
    }, [panel])

    function closePanels() {
        if (panel?.kind === 'search') {
            searchToggleRef.current?.focus()
        }
        setPanel(null)
    }

    function goHome(event) {
        event.preventDefault()
        closePanels()
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function showSection(id) {
        closePanels()
        scrollToSection(id)
    }

    function toggleSearch() {
        setPanel((current) => (current?.kind === 'search' ? null : { kind: 'search' }))
    }

    function openInfo(label, product = null) {
        setPanel({ kind: 'info', label, product })
    }

    function openProduct(product) {
        openInfo(product.name, product)
    }

    function resetFilters() {
        setSearchTerm('')
        setActiveCategory(null)
    }

    function selectCategory(category) {
        setPanel(null)
        setActiveCategory((current) => (current === category ? null : category))
        scrollToSection(PRODUCTS_ANCHOR)
    }

    function showAllProducts(id) {
        resetFilters()
        closePanels()
        scrollToSection(id)
    }

    function discoverProducts() {
        resetFilters()
        closePanels()
        scrollToSection(PRODUCTS_ANCHOR)
    }

    const infoContent =
        panel?.kind !== 'info'
            ? ''
            : (panel.product
                  ? `${panel.product.description} — ${panel.product.price}`
                  : (INFO_MESSAGES[panel.label] ?? DEFAULT_INFO_MESSAGE))

    return (
        <>
            <a
                href="#contenu"
                className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:bg-black focus:px-4 focus:py-2 focus:text-[12px] focus:text-white"
            >
                Aller au contenu
            </a>

            <Header
                categories={categories}
                activeCategory={activeCategory}
                isSearchOpen={isSearchOpen}
                searchToggleRef={searchToggleRef}
                onHome={goHome}
                onToggleSearch={toggleSearch}
                onSelectCategory={selectCategory}
            />

            {isSearchOpen && (
                <SearchPanel
                    searchTerm={searchTerm}
                    status={searchStatus}
                    onSearchChange={setSearchTerm}
                    onClose={closePanels}
                />
            )}

            {panel?.kind === 'info' && (
                <InfoPanel title={panel.label} content={infoContent} onClose={closePanels} />
            )}

            <main id="contenu">
                <Hero onDiscover={discoverProducts} />

                {sections.map((section) => (
                    <ProductSection
                        key={section.id}
                        id={section.id}
                        title={section.title}
                        products={productsBySection[section.id]}
                        onShowAll={showAllProducts}
                        onSelect={openProduct}
                    />
                ))}
            </main>

            <Footer
                categories={categories}
                activeCategory={activeCategory}
                onSelectCategory={selectCategory}
                onShowSection={showSection}
                nouveautesAnchor={NOUVEAUTES_ANCHOR}
                onOpenInfo={openInfo}
            />
        </>
    )
}
