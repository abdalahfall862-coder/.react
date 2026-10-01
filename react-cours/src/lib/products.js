export function normalize(value) {
    return String(value).trim().toLocaleLowerCase('fr-FR')
}

export function filterProducts(products, { searchTerm = '', category = null } = {}) {
    const needle = normalize(searchTerm)

    return products.filter((product) => {
        const matchesCategory = !category || product.category === category
        const searchable = normalize(`${product.name} ${product.description} ${product.category}`)
        const matchesSearch = !needle || searchable.includes(needle)

        return matchesCategory && matchesSearch
    })
}

export function collectCategories(products) {
    return [...new Set(products.map((product) => product.category))]
}

export function formatCategory(category) {
    return category.charAt(0).toUpperCase() + category.slice(1)
}

export function formatResultCount(count, category, hasFilters) {
    if (!hasFilters) {
        return ''
    }

    const plural = count > 1
    const categoryText = category ? ` dans ${formatCategory(category)}` : ''

    return `${count} produit${plural ? 's' : ''} trouvé${plural ? 's' : ''}${categoryText}.`
}
