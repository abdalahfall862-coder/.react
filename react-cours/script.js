const CATEGORIES = ['Nouveautés', 'Hommes', 'Femmes', 'Enfants']

let activeCategory = null
let searchTerm = ''
let infoPanelLabel = ''

function getProductCards() {
    return [...document.querySelectorAll('[data-product-card]')]
}

function matchesCard(card) {
    const searchableText = (card.dataset.search || '').toLocaleLowerCase('fr-FR')
    const matchesSearch = !searchTerm || searchableText.includes(searchTerm)
    const matchesCategory = !activeCategory || card.dataset.category === activeCategory
    return matchesSearch && matchesCategory
}

function updateProductVisibility() {
    const grids = [...document.querySelectorAll('#produits-populaires, #nouveautes')]

    grids.forEach((grid) => {
        const cards = [...grid.querySelectorAll('[data-product-card]')]
        let visibleCount = 0

        cards.forEach((card) => {
            const isVisible = matchesCard(card)
            card.hidden = !isVisible
            if (isVisible) {
                visibleCount += 1
            }
        })

        const emptyState = grid.querySelector('[data-empty-state]')
        if (emptyState) {
            emptyState.hidden = visibleCount !== 0
        }
    })
}

function updateCategoryLinks() {
    const links = document.querySelectorAll('#categories [data-action="category"]')

    links.forEach((link) => {
        const isActive = activeCategory === link.dataset.category || (activeCategory === null && link.dataset.category === 'Nouveautés')
        const className = isActive
            ? 'whitespace-nowrap rounded-full bg-[#111] px-6 py-3 text-[12px] font-medium text-white shadow-sm transition duration-200'
            : 'whitespace-nowrap rounded-full border border-stone-300 bg-white px-6 py-3 text-[12px] font-medium text-stone-700 transition duration-200 hover:-translate-y-0.5 hover:border-stone-950 hover:text-stone-950 hover:shadow-sm active:scale-[0.98]'

        link.className = className
        link.setAttribute('aria-current', isActive ? 'page' : 'false')
    })
}

function setSearchPanelVisibility(isVisible) {
    const panel = document.getElementById('search-panel')
    const toggle = document.getElementById('search-toggle')
    if (panel) {
        panel.classList.toggle('hidden', !isVisible)
    }
    if (toggle) {
        toggle.setAttribute('aria-expanded', String(isVisible))
        toggle.setAttribute('aria-label', isVisible ? 'Fermer la recherche' : 'Ouvrir la recherche')
        toggle.title = isVisible ? 'Fermer la recherche' : 'Ouvrir la recherche'
    }
}

function setInfoPanelVisibility(isVisible) {
    const panel = document.getElementById('info-panel')
    if (panel) {
        panel.classList.toggle('hidden', !isVisible)
    }
}

function openSearchPanel() {
    setInfoPanelVisibility(false)
    infoPanelLabel = ''
    setSearchPanelVisibility(true)
    document.getElementById('search-input')?.focus()
}

function closeSearchPanel() {
    setSearchPanelVisibility(false)
    document.getElementById('search-toggle')?.focus()
}

function closePanels() {
    setSearchPanelVisibility(false)
    setInfoPanelVisibility(false)
    infoPanelLabel = ''
}

function renderInfoPanel() {
    if (!infoPanelLabel) {
        return
    }

    const title = document.getElementById('info-panel-title')
    const content = document.getElementById('info-panel-content')
    if (!title || !content) {
        return
    }

    const productButton = [...document.querySelectorAll('[data-action="product"]')].find((button) => button.dataset.label === infoPanelLabel)
    if (productButton) {
        title.textContent = productButton.dataset.label
        content.textContent = `${productButton.dataset.description} — ${productButton.dataset.price}`
        return
    }

    const messages = {
        'À propos': 'La page À propos sera bientôt disponible.',
        Contact: 'Utilisez le formulaire de contact pour nous écrire.',
        Livraison: 'Les informations de livraison seront bientôt disponibles.',
        Conditions: 'Les conditions seront bientôt disponibles.'
    }

    title.textContent = infoPanelLabel
    content.textContent = messages[infoPanelLabel] || 'Cette page sera bientôt disponible.'
}

function openInfoPanel(label) {
    setSearchPanelVisibility(false)
    infoPanelLabel = label
    setInfoPanelVisibility(true)
    renderInfoPanel()
}

function updateSearchStatus() {
    const status = document.getElementById('search-status')
    if (!status) {
        return
    }

    if (!searchTerm && !activeCategory) {
        status.textContent = ''
        return
    }

    const count = getProductCards().filter(matchesCard).length
    const categoryText = activeCategory ? ` dans ${activeCategory}` : ''
    status.textContent = `${count} produit${count > 1 ? 's' : ''} trouvé${count > 1 ? 's' : ''}${categoryText}.`
}

function scrollToId(id) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function setCategory(category) {
    if (!CATEGORIES.includes(category)) {
        return
    }

    activeCategory = activeCategory === category ? null : category
    updateCategoryLinks()
    updateProductVisibility()
    updateSearchStatus()
    scrollToId('produits-section')
}

function handleSearch(event) {
    searchTerm = event.target.value.trim().toLocaleLowerCase('fr-FR')
    updateProductVisibility()
    updateSearchStatus()
}

function handleAction(event) {
    const element = event.target.closest('[data-action]')
    if (!element) {
        return
    }

    const action = element.dataset.action
    if (element.tagName === 'A') {
        event.preventDefault()
    }

    switch (action) {
        case 'home':
            closePanels()
            window.scrollTo({ top: 0, behavior: 'smooth' })
            break
        case 'toggle-search':
            if (document.getElementById('search-panel')?.classList.contains('hidden')) {
                openSearchPanel()
            } else {
                closeSearchPanel()
            }
            break
        case 'close-search':
            closeSearchPanel()
            break
        case 'close-info':
            closePanels()
            break
        case 'discover':
            activeCategory = null
            searchTerm = ''
            document.getElementById('search-input').value = ''
            updateCategoryLinks()
            updateProductVisibility()
            updateSearchStatus()
            closePanels()
            scrollToId('produits-section')
            break
        case 'show-products':
            closePanels()
            scrollToId(element.dataset.target || 'produits-section')
            break
        case 'category':
            closePanels()
            setCategory(element.dataset.category)
            break
        case 'product':
            closePanels()
            openInfoPanel(element.dataset.label)
            break
        case 'info':
            openInfoPanel(element.dataset.label)
            break
        default:
            break
    }
}

function handleKeydown(event) {
    if (event.key !== 'Escape') {
        return
    }

    const searchPanel = document.getElementById('search-panel')
    const infoPanel = document.getElementById('info-panel')
    if (searchPanel && !searchPanel.classList.contains('hidden')) {
        closeSearchPanel()
        return
    }
    if (infoPanel && !infoPanel.classList.contains('hidden')) {
        closePanels()
    }
}

document.getElementById('search-input').addEventListener('input', handleSearch)
document.addEventListener('click', handleAction)
document.addEventListener('keydown', handleKeydown)

updateCategoryLinks()
updateProductVisibility()
updateSearchStatus()
