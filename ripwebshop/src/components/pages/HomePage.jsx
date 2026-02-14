import { useCart } from '../../context/CartContext';
import products from '../../data/products';

const featuredProducts = [
    { ...products.find(p => p.id === 2), image: '/assets/241px-Classic_shimmer_VALORANT.png' },
    { ...products.find(p => p.id === 3), image: '/assets/valorant-forsaken-vandal-skin.png' },
    { ...products.find(p => p.id === 4), image: '/assets/241px-Melee_reaver_2.0_karambit_VALORANT.png' },
];

export default function HomePage() {
    const { addToCart } = useCart();

    return (
        <section id="home-section">
            <h2>Featured Products</h2>
            <aside className="product-grid">
                {featuredProducts.map(product => (
                    <aside className="product-card" key={product.id}>
                        <aside className="product-image">
                            <img src={product.image} alt={product.name} width="120" height="120" />
                        </aside>
                        <h3>{product.name}</h3>
                        <p className="product-price">₱{product.price.toFixed(2)}</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </aside>
                ))}
            </aside>
        </section>
    );
}
