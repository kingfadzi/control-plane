import React from "react";
import ProductList from "./ProductOwner/sections/ProductList.jsx";
import GovernanceActionSection from "./ProductOwner/sections/GovernanceActionSection";

const ProductOwnerLanding = ({ onSelect }) => (
    <div className="p-6 max-w-screen-xl mx-auto font-sans space-y-8">
        <ProductList onSelect={onSelect} />
        <GovernanceActionSection />
    </div>
);

export default ProductOwnerLanding;
