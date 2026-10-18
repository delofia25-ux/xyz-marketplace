"use client";

import { useMemo, useState } from "react";
import { Search, ShoppingBag, Heart, Truck, ShieldCheck, Headphones, Sparkles, Menu, X } from "lucide-react";

type Product = { id: number; name: string; category: string; price: number; oldPrice?: number; emoji: string; tag: string; rating: string };
const initialProducts: Product[] = [
  { id: 1, name: "Wireless Bluetooth Headphones", category: "Electronics", price: 1890, oldPrice: 2490, emoji: "🎧", tag: "POPULAR", rating: "4.8" },
  { id: 2, name: "Smart Watch Series", category: "Electronics", price: 2590, oldPrice: 3200, emoji: "⌚", tag: "SAVE 19%", rating: "4.7" },
  { id: 3, name: "Everyday Cotton T-Shirt", category: "Fashion", price: 490, oldPrice: 650, emoji: "👕", tag: "BESTSELLER", rating: "4.8" },
  { id: 4, name: "Classic Shoulder Bag", category: "Fashion", price: 1250, emoji: "👜", tag: "NEW", rating: "4.6" },
  { id: 5, name: "Minimal Table Lamp", category: "Home & Living", price: 990, oldPrice: 1250, emoji: "💡", tag: "HOME PICK", rating: "4.7" },
  { id: 6, name: "Soft Cushion Set", category: "Home & Living", price: 750, oldPrice: 900, emoji: "🛋️", tag: "SAVE 17%", rating: "4.6" },
  { id: 7, name: "Daily Skincare Set", category: "Beauty & Care", price: 1450, oldPrice: 1750, emoji: "🧴", tag: "SELF CARE", rating: "4.8" },
  { id: 8, name: "Gentle Face Cleanser", category: "Beauty & Care", price: 620, emoji: "🫧", tag: "POPULAR", rating: "4.7" },
  { id: 9, name: "Organic Pantry Bundle", category: "Groceries", price: 850, oldPrice: 990, emoji: "🛒", tag: "DAILY PICK", rating: "4.7" },
  { id: 10, name: "Yoga Mat", category: "Sports", price: 850, oldPrice: 1050, emoji: "🧘", tag: "FITNESS PICK", rating: "4.7" },
  { id: 11, name: "Notebook & Pen Bundle", category: "Books & Stationery", price: 320, oldPrice: 400, emoji: "📚", tag: "STUDY PICK", rating: "4.8" },
  { id: 12, name: "Creative Art Kit for Kids", category: "Kids & Baby", price: 780, oldPrice: 950, emoji: "🧸", tag: "KIDS FAVOURITE", rating: "4.7" },
];
const categories = ["All products", "Electronics", "Fashion", "Home & Living", "Beauty & Care", "Groceries", "Sports", "Books & Stationery", "Kids & Baby", "Other"];
const icons: Record<string, string> = { "All products": "✨", Electronics: "🎧", Fashion: "👕", "Home & Living": "🏡", "Beauty & Care": "🧴", Groceries: "🛒", Sports: "⚽", "Books & Stationery": "📚", "Kids & Baby": "🧸", Other: "📦" };
const money = (n: number) => `৳${n.toLocaleString("en-BD")}`;

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All products");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [notice, setNotice] = useState("");
  const filtered = useMemo(() => initialProducts.filter(p =>
    (category === "All products" || p.category === category) &&
    `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())
  ), [category, query]);
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const subtotal = Object.entries(cart).reduce((sum, [id, qty]) => sum + (initialProducts.find(p => p.id === Number(id))?.price ?? 0) * qty, 0);
  function add(id: number) { setCart(prev => ({ ...prev, [id]: (prev[id] ?? 0) + 1 })); setNotice("Added to your cart 💜"); setTimeout(() => setNotice(""), 1800); }
  function toggleWish(id: number) { setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); }
  return <main>
    <div className="announcement">✨ Welcome to XYZ — everyday finds, fair prices & doorstep delivery</div>
    <header className="header">
      <div className="headrow">
        <a className="brand" href="#"><span>XYZ</span><b>.</b></a>
        <form className="search" onSubmit={e => e.preventDefault()}><Search size={19}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search electronics, fashion, home, groceries..." aria-label="Search products"/><button>Search</button></form>
        <div className="headActions"><button className="iconButton" onClick={() => setNotice(wishlist.length ? `${wishlist.length} item(s) in your wishlist` : "Your wishlist is empty")} aria-label="Wishlist"><Heart size={19}/><span>{wishlist.length}</span></button><button className="cartButton" onClick={() => setShowCart(true)}><ShoppingBag size={18}/> Cart <b>{cartCount}</b></button><button className="mobileMenu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle menu">{mobileNav ? <X/> : <Menu/>}</button></div>
      </div>
      <nav className={mobileNav ? "nav navOpen" : "nav"}>{categories.map(c => <button key={c} onClick={() => {setCategory(c);setMobileNav(false)}} className={category === c ? "selected" : ""}>{c === "All products" ? "Home" : c}</button>)}</nav>
    </header>
    <section className="hero">
      <div className="heroCopy"><span className="eyebrow"><Sparkles size={14}/> EVERYTHING YOU NEED, ALL IN ONE PLACE</span><h1>Your everyday marketplace.<br/><em>One easy destination.</em></h1><p>Discover electronics, fashion, home essentials, beauty, groceries and more — thoughtfully brought together.</p><button className="primary" onClick={() => document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}>Explore products <span>→</span></button><div className="heroTrust"><span>✓ Curated finds</span><span>✓ Easy shopping</span><span>✓ Bangladesh focused</span></div></div>
      <div className="heroVisual"><div className="heroCircle"><span>🛍️</span></div><div className="floating f1">💜 Made for your day</div><div className="floating f2">✨ New finds weekly</div><div className="miniProduct mp1">🎧</div><div className="miniProduct mp2">👟</div><div className="miniProduct mp3">⌚</div></div>
    </section>
    <section className="benefits"><div><Truck/><span><b>Delivery across Bangladesh</b><small>Convenient doorstep service</small></span></div><div><ShieldCheck/><span><b>Shopping you can trust</b><small>Clear order details</small></span></div><div><Headphones/><span><b>Helpful support</b><small>We're here when you need us</small></span></div></section>
    <section className="section"><div className="sectionTitle"><div><span className="eyebrow purple">SHOP YOUR WAY</span><h2>Explore categories</h2><p>From daily essentials to your next favourite thing.</p></div></div><div className="categoryGrid">{categories.map(c => <button key={c} className={`categoryCard ${category === c ? "catActive" : ""}`} onClick={() => setCategory(c)}><span>{icons[c]}</span><b>{c}</b><small>Explore collection ↗</small></button>)}</div></section>
    <section className="section" id="products"><div className="sectionTitle productsTitle"><div><span className="eyebrow purple">THE XYZ EDIT</span><h2>{category === "All products" ? "Popular picks" : category}</h2><p>{filtered.length} products to explore</p></div><span className="sortLabel">✦ Thoughtfully selected</span></div><div className="productGrid">{filtered.map(p => <article className="productCard" key={p.id}><div className="productVisual"><span className="tag">{p.tag}</span><button className={`heart ${wishlist.includes(p.id) ? "heartOn" : ""}`} onClick={() => toggleWish(p.id)} aria-label="Toggle wishlist">{wishlist.includes(p.id) ? "♥" : "♡"}</button><span className="productEmoji">{p.emoji}</span></div><div className="productInfo"><div className="productName">{p.name}</div><div className="rating">★★★★★ <span>{p.rating} · customer favourite</span></div><div className="priceLine"><b>{money(p.price)}</b>{p.oldPrice && <del>{money(p.oldPrice)}</del>}</div><button className="addButton" onClick={() => add(p.id)}>＋ Add to cart</button></div></article>)}</div>{filtered.length === 0 && <div className="noResults">No products found. Try another search.</div>}</section>
    <section className="promoBand"><div><span className="eyebrow">A LITTLE SOMETHING EXTRA</span><h2>Good finds. Great everyday value.</h2><p>Browse new arrivals and special picks across the marketplace.</p></div><button onClick={() => {setCategory("All products");setQuery("");document.getElementById("products")?.scrollIntoView({behavior:"smooth"})}}>Discover more →</button></section>
    <footer className="footer"><div className="footerGrid"><div><a className="brand footerBrand" href="#">XYZ<b>.</b></a><p>Your everyday marketplace for the things you need and the things you'll love.</p></div><div><b>Shop</b><a href="#products">All products</a><a href="#products">Electronics</a><a href="#products">Fashion</a></div><div><b>Help</b><a href="#support">Contact support</a><a href="#support">Shipping & delivery</a><a href="#support">Returns & refunds</a></div><div><b>About</b><a href="#about">About XYZ</a><a href="#privacy">Privacy policy</a><a href="#terms">Terms of service</a></div></div><div className="copyright">© 2026 XYZ Marketplace. Starter project — demo products and cart.</div></footer>
    {showCart && <div className="cartBackdrop" onClick={() => setShowCart(false)}><aside className="cartDrawer" onClick={e => e.stopPropagation()}><div className="cartHeader"><h2>Your cart ({cartCount})</h2><button onClick={() => setShowCart(false)}><X/></button></div>{cartCount === 0 ? <div className="emptyCart"><span>🛍️</span><b>Your cart is waiting</b><p>Add a few favourites to get started.</p></div> : <><div className="cartItems">{Object.entries(cart).filter(([,q])=>q>0).map(([id,qty])=>{const p=initialProducts.find(x=>x.id===Number(id))!;return <div className="cartItem" key={id}><span>{p.emoji}</span><div><b>{p.name}</b><small>{money(p.price)} each</small><div className="quantity"><button onClick={()=>setCart(prev=>({...prev,[p.id]:Math.max(0,(prev[p.id]??0)-1)}))}>−</button>{qty}<button onClick={()=>setCart(prev=>({...prev,[p.id]:(prev[p.id]??0)+1}))}>＋</button></div></div><strong>{money(p.price*qty)}</strong></div>})}</div><div className="cartTotal"><span>Subtotal</span><b>{money(subtotal)}</b><p>Delivery fees are calculated at checkout.</p><button onClick={() => setNotice("Checkout will be enabled after Supabase setup.")}>Continue to checkout →</button></div></>}</aside></div>}
    {notice && <div className="toast">{notice}</div>}
  </main>;
}
