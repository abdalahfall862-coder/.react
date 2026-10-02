const populaires = [
    { id: 1, name: 'iphone 16', description: 'bleu ciel', category: 'phone', price: '256$', image: '' },
    { id: 2, name: 'iphone 16 pro', description: 'rose', category: 'phone', price: '300$', image: '' },
    { id: 3, name: 'iphone 17 air', description: 'gris', category: 'phone', price: '360$', image: '' },
    { id: 4, name: 'iphone 17 pro', description: 'orange', category: 'phone', price: '420$', image: '' }
]

const nouveautes = [
    { id: 5, name: 'iphone 18', description: 'rouge', category: 'phone', price: '500$', image: '' },
    { id: 6, name: 'iphone 18 pro', description: 'gris', category: 'phone', price: '580$', image: '' },
    { id: 7, name: 'iphone 18 pro max', description: 'blanc', category: 'phone', price: '630$', image: '' },
    { id: 8, name: 'iphone 18 air', description: 'bleu ciel', category: 'phone', price: '699$', image: '' }
]

export const sections = [
    {
        id: 'produits-populaires',
        title: 'Produits populaires',
        products: populaires
    },
    {
        id: 'nouveautes-section',
        title: 'Nouveautés',
        products: nouveautes
    }
]

export const allProducts = sections.flatMap((section) =>
    section.products.map((product) => ({ ...product, section: section.id }))
)
