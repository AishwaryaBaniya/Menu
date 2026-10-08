'use client'

import { useMemo, useState } from 'react'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Heart,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from 'lucide-react'

const categories = ['Popular', 'Starters', 'Mains', 'Pizza', 'Desserts', 'Drinks']

const dishes = [
  { id: 1, name: 'Burrata & garden tomatoes', description: 'Creamy puglian burrata, heirloom tomato, basil oil, sea salt', price: 14, category: 'Starters', image: 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?auto=format&fit=crop&w=900&q=85', tag: 'Chef’s pick' },
  { id: 2, name: 'Truffle mushroom pizza', description: 'Wild mushrooms, fontina, mozzarella, rosemary, white truffle oil', price: 22, category: 'Pizza', image: 'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=900&q=85', tag: 'Popular' },
  { id: 3, name: 'Roasted salmon', description: 'Miso glaze, charred broccolini, sesame, ginger-lime dressing', price: 26, category: 'Mains', image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=900&q=85', tag: 'New' },
  { id: 4, name: 'Crispy chicken milanese', description: 'Parmesan crumb, rocket salad, lemon, shaved pecorino', price: 24, category: 'Mains', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=85', tag: '' },
  { id: 5, name: 'Tiramisu al classico', description: 'Espresso-soaked ladyfingers, mascarpone, cocoa', price: 10, category: 'Desserts', image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85', tag: 'Sweet finish' },
  { id: 6, name: 'Citrus spritz', description: 'Blood orange, prosecco, rosemary, soda, served over ice', price: 9, category: 'Drinks', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=900&q=85', tag: '' },
]

export function RestaurantMenu() {
  const [activeCategory, setActiveCategory] = useState('Popular')
  const [query, setQuery] = useState('')
  const [cart, setCart] = useState<Record<number, number>>({})
  const [favorites, setFavorites] = useState<number[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)

  const visibleDishes = useMemo(() => dishes.filter((dish) => {
    const matchesCategory = activeCategory === 'Popular' || dish.category === activeCategory
    const matchesQuery = `${dish.name} ${dish.description}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [activeCategory, query])

  const itemCount = Object.values(cart).reduce((sum, value) => sum + value, 0)
  const subtotal = dishes.reduce((sum, dish) => sum + (cart[dish.id] || 0) * dish.price, 0)
  const addToCart = (id: number) => setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }))
  const updateCart = (id: number, amount: number) => setCart((current) => {
    const next = Math.max(0, (current[id] || 0) + amount)
    const result = { ...current }
    if (next === 0) delete result[id]
    else result[id] = next
    return result
  })

  return (
    <main className="min-h-screen bg-[#fbfaf7] text-[#20312b]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <header className="flex h-[76px] items-center justify-between border-b border-[#dfe7df]">
          <a href="#top" className="flex items-center gap-2.5" aria-label="Sage and Stone home">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e0eadf] text-[#4e735a]"><Sparkles size={17} /></span>
            <span className="text-[15px] font-semibold tracking-[0.22em] text-[#345441]">SAGE & STONE</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium text-[#607169] md:flex">
            <a className="text-[#20312b]" href="#menu">Menu</a><a href="#about" className="hover:text-[#20312b]">Our story</a><a href="#visit" className="hover:text-[#20312b]">Visit us</a>
          </nav>
          <div className="flex items-center gap-2">
            <button aria-label="Search menu" className="hidden rounded-full p-2.5 text-[#53665c] hover:bg-[#edf3ed] sm:block"><Search size={19} /></button>
            <button aria-label="Account" className="hidden rounded-full p-2.5 text-[#53665c] hover:bg-[#edf3ed] sm:block"><UserRound size={19} /></button>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-[#31553f] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#264733]" aria-label={`Open cart with ${itemCount} items`}><ShoppingBag size={17} /><span className="hidden sm:inline">Your order</span>{itemCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#e5b86e] px-1 text-xs text-[#23352a]">{itemCount}</span>}</button>
            <button onClick={() => setMobileMenu(!mobileMenu)} className="rounded-full p-2 text-[#53665c] md:hidden" aria-label="Toggle navigation"><Menu size={21} /></button>
          </div>
        </header>
        {mobileMenu && <div className="flex gap-6 border-b border-[#dfe7df] py-4 text-sm font-medium md:hidden"><a href="#menu">Menu</a><a href="#about">Our story</a><a href="#visit">Visit us</a></div>}

        <section id="top" className="grid gap-8 pb-16 pt-12 lg:grid-cols-[1.03fr_.97fr] lg:items-center lg:gap-16 lg:pb-20 lg:pt-20">
          <div className="max-w-xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#7e9a80]"><span className="h-px w-8 bg-[#9bb49d]" /> Seasonal kitchen · Est. 2018</p>
            <h1 className="font-serif text-5xl leading-[.96] tracking-[-.045em] text-[#21392c] sm:text-7xl">Good food,<br /><em className="font-normal text-[#6e8e72]">made slowly.</em></h1>
            <p className="mt-7 max-w-md text-lg leading-8 text-[#687870]">A neighborhood table serving honest, seasonal food and the people who make it worth gathering.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-[#31553f] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#264733]">Explore the menu <ArrowRight size={16} /></a><a href="#visit" className="inline-flex items-center gap-2 rounded-full border border-[#cbd9cc] px-6 py-3.5 text-sm font-semibold text-[#486452] hover:bg-[#eef4ee]">Find a table</a></div>
            <div className="mt-10 flex items-center gap-3 text-sm text-[#718078]"><span className="flex -space-x-2"><span className="h-8 w-8 rounded-full border-2 border-[#fbfaf7] bg-[#c9a989]" /><span className="h-8 w-8 rounded-full border-2 border-[#fbfaf7] bg-[#8da8a1]" /><span className="h-8 w-8 rounded-full border-2 border-[#fbfaf7] bg-[#c78d75]" /></span><span>Loved by 2,000+ neighbors</span></div>
          </div>
          <div className="relative"><div className="aspect-[1.15] overflow-hidden rounded-[28px] bg-[#dfe8de] shadow-[0_22px_60px_-25px_rgba(38,70,50,.45)]"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=90" alt="Friends enjoying a meal at a sunny restaurant table" className="h-full w-full object-cover" /></div><div className="absolute -bottom-5 -left-3 flex items-center gap-3 rounded-2xl bg-[#fffdf8] px-4 py-3 shadow-lg sm:-left-6"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7f0e4] text-[#547c5e]"><Clock3 size={19} /></span><span><strong className="block text-sm text-[#2d4936]">Open today</strong><span className="text-xs text-[#7b887f]">11:30 am – 10:00 pm</span></span></div></div>
        </section>

        <section id="menu" className="scroll-mt-8 border-t border-[#dfe7df] py-14 lg:py-20">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7e9a80]">From our kitchen</p><h2 className="mt-3 font-serif text-4xl tracking-[-.03em] text-[#21392c] sm:text-5xl">Made for lingering.</h2></div><div className="relative w-full md:w-64"><Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8a9990]" size={17} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search the menu" className="w-full rounded-full border border-[#d5e0d6] bg-white py-3 pl-10 pr-4 text-sm outline-none placeholder:text-[#98a69d] focus:border-[#6c9273]" /></div></div>
          <div className="mt-9 flex gap-2 overflow-x-auto pb-1">{categories.map((category) => <button key={category} onClick={() => setActiveCategory(category)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${activeCategory === category ? 'bg-[#31553f] text-white' : 'bg-[#edf3ed] text-[#66806d] hover:bg-[#e2ede2]'}`}>{category}</button>)}</div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visibleDishes.map((dish) => <article key={dish.id} className="group overflow-hidden rounded-2xl border border-[#e1e8e0] bg-white shadow-[0_8px_26px_-22px_rgba(27,57,38,.6)]"><div className="relative aspect-[1.15] overflow-hidden"><img src={dish.image} alt={dish.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /><div className="absolute inset-x-0 top-0 flex justify-between p-3">{dish.tag ? <span className="rounded-full bg-[#fffdf8]/95 px-3 py-1.5 text-[11px] font-bold text-[#52715a]">{dish.tag}</span> : <span /> }<button onClick={() => setFavorites((current) => current.includes(dish.id) ? current.filter((id) => id !== dish.id) : [...current, dish.id])} aria-label={`Favorite ${dish.name}`} className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#6c8271] backdrop-blur-sm"> <Heart size={16} fill={favorites.includes(dish.id) ? 'currentColor' : 'none'} /></button></div></div><div className="p-4"><div className="flex items-start justify-between gap-3"><h3 className="font-serif text-xl leading-tight text-[#294534]">{dish.name}</h3><span className="shrink-0 text-sm font-bold text-[#4c7256]">${dish.price}</span></div><p className="mt-2 min-h-10 text-sm leading-5 text-[#7a887f]">{dish.description}</p><button onClick={() => addToCart(dish.id)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-[#cbdacb] py-2.5 text-sm font-semibold text-[#41634b] transition hover:bg-[#edf4ed]"><Plus size={16} /> Add to order</button></div></article>)}</div>
          {visibleDishes.length === 0 && <div className="py-16 text-center text-[#718078]">No dishes found. Try another search.</div>}
        </section>

        <section id="about" className="grid gap-8 border-t border-[#dfe7df] py-14 lg:grid-cols-2 lg:gap-20 lg:py-20"><div className="overflow-hidden rounded-[26px]"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1100&q=85" alt="Fresh herbs and ingredients prepared in the kitchen" className="h-full min-h-72 w-full object-cover" /></div><div className="flex flex-col justify-center"><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7e9a80]">The Sage & Stone way</p><h2 className="mt-3 font-serif text-4xl leading-tight tracking-[-.03em] text-[#21392c] sm:text-5xl">Simple ingredients.<br /><em className="font-normal text-[#6e8e72]">Thoughtful cooking.</em></h2><p className="mt-6 max-w-lg text-base leading-8 text-[#687870]">We work with small farms, local growers, and fishermen we know by name. Our menu changes with the seasons, but the invitation stays the same: come as you are, stay a little longer.</p><a href="#visit" className="mt-7 flex w-fit items-center gap-2 text-sm font-bold text-[#41634b]">Meet the people behind the table <ArrowRight size={16} /></a></div></section>
        <section id="visit" className="mb-10 flex flex-col gap-6 rounded-[26px] bg-[#31553f] px-7 py-9 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b9cfb7]">Come by soon</p><h2 className="mt-2 font-serif text-3xl">Your table is waiting.</h2><p className="mt-2 text-sm text-[#d4e1d2]">18 Willow Lane · Mon–Sun, 11:30 am – 10:00 pm</p></div><button className="flex w-fit items-center gap-2 rounded-full bg-[#e8c27f] px-6 py-3.5 text-sm font-bold text-[#294534] hover:bg-[#f0cf91]">Reserve a table <ArrowRight size={16} /></button></section>
        <footer className="flex flex-col gap-4 border-t border-[#dfe7df] py-7 text-sm text-[#7b887f] sm:flex-row sm:items-center sm:justify-between"><span className="font-semibold tracking-[0.15em] text-[#486452]">SAGE & STONE</span><span>© 2025 Sage & Stone · Made with care</span><span className="flex gap-4"><a href="#about" className="hover:text-[#31553f]">Instagram</a><a href="#visit" className="hover:text-[#31553f]">Contact</a></span></footer>
      </div>

      {cartOpen && <div className="fixed inset-0 z-50 bg-[#20312b]/35" onClick={() => setCartOpen(false)}><aside role="dialog" aria-modal="true" aria-label="Your order" onClick={(event) => event.stopPropagation()} className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#fffdf8] p-6 shadow-2xl sm:p-8"><div className="flex items-center justify-between border-b border-[#e0e8df] pb-5"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-[#7e9a80]">Your order</p><h2 className="mt-1 font-serif text-3xl text-[#21392c]">A table for one?</h2></div><button onClick={() => setCartOpen(false)} aria-label="Close order" className="rounded-full p-2 text-[#718078] hover:bg-[#edf3ed]"><X size={20} /></button></div><div className="flex-1 overflow-y-auto py-6">{itemCount === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><ShoppingBag size={30} className="text-[#a3b5a4]" /><p className="mt-4 font-serif text-xl text-[#41634b]">Your order is empty</p><p className="mt-2 text-sm text-[#87948b]">Add something delicious from the menu.</p></div> : dishes.filter((dish) => cart[dish.id]).map((dish) => <div key={dish.id} className="flex gap-3 border-b border-[#e6ece5] py-4"><img src={dish.image} alt="" className="h-16 w-16 rounded-xl object-cover" /><div className="min-w-0 flex-1"><p className="font-semibold text-[#345441]">{dish.name}</p><p className="mt-1 text-sm text-[#7b887f]">${dish.price} each</p><div className="mt-2 flex items-center gap-3"><button onClick={() => updateCart(dish.id, -1)} className="rounded-full border border-[#d5e0d6] p-1" aria-label="Decrease quantity"><Minus size={13} /></button><span className="text-sm font-bold">{cart[dish.id]}</span><button onClick={() => updateCart(dish.id, 1)} className="rounded-full border border-[#d5e0d6] p-1" aria-label="Increase quantity"><Plus size={13} /></button></div></div><span className="font-bold text-[#4c7256]">${dish.price * cart[dish.id]}</span></div>)}</div>{itemCount > 0 && <div className="border-t border-[#e0e8df] pt-5"><div className="flex justify-between text-sm text-[#718078]"><span>Subtotal</span><span className="font-bold text-[#294534]">${subtotal}</span></div><button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-[#31553f] py-3.5 text-sm font-bold text-white hover:bg-[#264733]">Continue to checkout <ChevronDown className="-rotate-90" size={17} /></button><p className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-[#8a9990]"><Check size={13} /> Pickup and delivery options available</p></div>}</aside></div>}
    </main>
  )
}
