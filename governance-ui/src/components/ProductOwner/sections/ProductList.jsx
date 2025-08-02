import React from "react";
import ProductCard from "../cards/ProductCard";
import AddProductCard from "../cards/AddProductCard";

const products = [
    {
        id: "APP001",
        name: "Jumpstart App",
        code: "APP123042",
        readiness: "At Risk",
        score: 78,
        latestRelease: "RLS-002",
        releaseStatus: "In Progress",
    },
    {
        id: "APP002",
        name: "Payments Portal",
        code: "APP923114",
        readiness: "Ready",
        score: 92,
        latestRelease: "RLS-045",
        releaseStatus: "Approved",
    },
];

const ProductList = ({ onSelect }) => (
    <div className="space-y-4">
        <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4">
            <h1 className="text-xl font-medium text-slate-800">Welcome, Fadzi</h1>
            <p className="text-slate-600 text-sm">You are responsible for {products.length} products.</p>
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", display: "grid" }}>
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onSelect={onSelect} />
            ))}
            <AddProductCard />
        </div>
    </div>
);

export default ProductList;
