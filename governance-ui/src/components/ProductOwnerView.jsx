import React from "react";
import ProductOverviewSection from "./ProductOwner/sections/ProductOverviewSection.jsx";
import GovernanceReadinessSection from "./ProductOwner/sections/GovernanceReadinessSection";
import RisksAndExceptionsSection from "./ProductOwner/sections/RisksAndExceptionsSection";
import ReadinessActionsSection from "./ProductOwner/sections/ReadinessActionsSection";
import ReleaseListingsSection from "./ProductOwner/sections/ReleaseListingsSection";

const ProductOwnerView = ({ onSelect }) => (
    <div className="p-6 max-w-screen-xl mx-auto font-sans space-y-8">
        <ProductOverviewSection />
        <GovernanceReadinessSection />
        <RisksAndExceptionsSection />
        <ReadinessActionsSection />
        <ReleaseListingsSection onSelect={onSelect} />
    </div>
);

export default ProductOwnerView;
