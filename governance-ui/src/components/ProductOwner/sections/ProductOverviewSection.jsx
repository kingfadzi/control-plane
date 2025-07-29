import React from 'react';
import Section from '../../GovernanceCockpit/shared/Section';

import AppOwnershipCard from '../cards/AppOwnershipCard';
import GovernanceLinksCard from '../cards/GovernanceLinksCard';
import ProductStatusCard from '../cards/ProductStatusCard';
import DependenciesCard from '../cards/DependenciesCard';

const ProductOverviewSection = () => (
    <Section
        title="Product Overview"
        insights="What is this product? Who owns it? Where are the key touchpoints?"
    >
      <AppOwnershipCard />
      <GovernanceLinksCard />
      <ProductStatusCard />
      <DependenciesCard />
    </Section>
);

export default ProductOverviewSection;
