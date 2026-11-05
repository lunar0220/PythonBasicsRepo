
import ProductList from "./ProductList";
import "./App.css";

const products = [
    {
        id: 1,
        name: "Ноутбук",
        price: 75000,
        inStock: true
    },
    {
        id: 2,
        name: "Мышь",
        price: 1500,
        inStock: false
    },
    {
        id: 3,
        name: "Монитор",
        price: 12000,
        inStock: true
    }
];

function App() {
    return (
        <div className="container">
            <h1>Домашнее задание: TypeScript</h1>

            <ProductList products={products} />
        </div>
    );
}

export default App;
