import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import RiskStoryManagementCard from "../cards/RiskStoryManagementCard.jsx";
import ExceptionManagementCard from "../cards/ExceptionManagementCard.jsx";
import BlockersBacklogCard from "../cards/BlockersBacklogCard.jsx";
import DependencySecurityRiskCard from "../cards/DependencySecurityRiskCard.jsx";

const RisksAndExceptionsSection = () => (
    <Section
        title="Risks & Exceptions"
        insights="What could prevent this product from going live successfully?"
    >
        <RiskStoryManagementCard />
        <ExceptionManagementCard />
        <BlockersBacklogCard />
        <DependencySecurityRiskCard />
    </Section>
);

export default RisksAndExceptionsSection;
