export type Dish = {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  tag: string
}

export const dishes: Dish[] = [
  { id: 1, name: 'Burrata & garden tomatoes', description: 'Creamy puglian burrata, heirloom tomato, basil oil, sea salt', price: 14, category: 'Starters', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=85', tag: 'Chef\'s pick' },
  { id: 2, name: 'Truffle mushroom pizza', description: 'Wild mushrooms, fontina, mozzarella, rosemary, white truffle oil', price: 22, category: 'Pizza', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', tag: 'Popular' },
  { id: 3, name: 'Roasted salmon', description: 'Miso glaze, charred broccolini, sesame, ginger-lime dressing', price: 26, category: 'Mains', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85', tag: 'New' },
  { id: 4, name: 'Crispy chicken milanese', description: 'Parmesan crumb, rocket salad, lemon, shaved pecorino', price: 24, category: 'Mains', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85', tag: '' },
  { id: 5, name: 'Tiramisu al classico', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: 10, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', tag: 'Sweet finish' },
  { id: 6, name: 'Citrus spritz', description: 'Blood orange, prosecco, rosemary, soda, served over ice', price: 9, category: 'Drinks', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85', tag: '' },
]

export const categories = ['Popular', 'Starters', 'Mains', 'Pizza', 'Desserts', 'Drinks']

export function getDishById(id: number) {
  return dishes.find((dish) => dish.id === id)
}

export function getDishesInCart(cart: Record<number, number>) {
  return dishes.filter((dish) => cart[dish.id])
}

export function getCartSubtotal(cart: Record<number, number>) {
  return dishes.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0)
}

export function getCartItemCount(cart: Record<number, number>) {
  return Object.values(cart).reduce((sum, value) => sum + value, 0)
}

export function filterDishes(activeCategory: string, query: string) {
  const normalizedQuery = query.toLowerCase()
  return dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'Popular' || dish.category === activeCategory
    const matchesQuery = `${dish.name} ${dish.description}`.toLowerCase().includes(normalizedQuery)
    return matchesCategory && matchesQuery
  })
}

export function formatPrice(price: number) {
  return `$${price}`
}

export function formatCurrency(amount: number) {
  return `$${amount.toFixed(2)}`
}

export function getDishName(id: number) {
  return getDishById(id)?.name ?? 'Unknown dish'
}

export function getDishPrice(id: number) {
  return getDishById(id)?.price ?? 0
}

export function getDishImage(id: number) {
  return getDishById(id)?.image ?? ''
}

export function getDishDescription(id: number) {
  return getDishById(id)?.description ?? ''
}

export function getDishCategory(id: number) {
  return getDishById(id)?.category ?? ''
}

export function getDishTag(id: number) {
  return getDishById(id)?.tag ?? ''
}
