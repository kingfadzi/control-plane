import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import AppOwnershipCard from "../cards/AppOwnershipCard";
import GovernanceLinksCard from "../cards/GovernanceLinksCard";
// Replace these two…
import ProductContactsCard from "../cards/ProductContactsCard";
import ControlSMEContactsCard from "../cards/ControlSMEContactsCard";

const ProductOverviewSection = () => (
    <Section
        title="Product Overview"
        insights="Who owns this product, and who are the points of contact for delivery vs. controls?"
    >
        <AppOwnershipCard />
        <GovernanceLinksCard />
        <ProductContactsCard />
        <ControlSMEContactsCard />
    </Section>
);

export default ProductOverviewSection;