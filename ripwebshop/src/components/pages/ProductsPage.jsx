import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import products from '../../data/products';

const categories = [
    { value: 'all', label: 'All Products' },
    { value: 'vp', label: 'VP Bundles' },
    { value: 'skins', label: 'Weapon Skins' },
    { value: 'bundles', label: 'Premium Bundles' },
];

export default function ProductsPage() {
    const [currentCategory, setCurrentCategory] = useState('all');
    const { addToCart } = useCart();

    const filtered = currentCategory === 'all'
        ? products
        : products.filter(p => p?.category === currentCategory);

    return (
        <>
            <h2>Product Catalog</h2>

            <aside className="filter-section">
                <h3>Filter by Category</h3>
                <aside className="filter-buttons">
                    {categories.map(cat => (
                        <button
                            key={cat.value}
                            className={`filter-btn${currentCategory === cat.value ? ' active' : ''}`}
                            data-category={cat.value}
                            onClick={() => setCurrentCategory(cat.value)}
                        >
                            {cat.label}
                        </button>
                    ))}
                </aside>
            </aside>

            <aside className="catalog-grid" id="catalog-grid">
                {filtered.map(product => (
                    <aside className="catalog-card" key={product.id}>
                        <aside className="catalog-image">
                            <img src={product?.image || ''} alt={product.name} width="150" height="150" />
                        </aside>
                        <h3>{product.name}</h3>
                        <p className="catalog-description">{product.description}</p>
                        <p className="catalog-price">₱{product.price.toFixed(2)}</p>
                        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
                            Add to Cart
                        </button>
                    </aside>
                ))}
            </aside>
        </>
    );
}
