interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}

interface ProductListProps {
    products: Product[];
}

function ProductList({ products }: ProductListProps) {
    return (
        <div>
            <h2>Список товаров</h2>

            {products.map((product) => (
                <div className="product-card" key={product.id}>
                    <h3>{product.name}</h3>

                    <p>Цена: {product.price} ₽</p>

                    <p>
                        {product.inStock
                            ? "В наличии"
                            : "Нет в наличии"}
                    </p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
