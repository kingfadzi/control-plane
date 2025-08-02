import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import TechnicalCodeQualityCard from "../cards/TechnicalCodeQualityCard";
import ArtifactTestingCard from "../cards/ArtifactTestingCard.jsx";
import BusinessOutcomesControlsCard from "../cards/BusinessOutcomesControlsCard.jsx";
import GovernanceProcessFlowCard from "../cards/GovernanceProcessFlowCard.jsx";

const GovernanceReadinessSection = () => (
    <Section
        title="Governance Readiness"
        insights="Is this product meeting the governance bar? What are the gaps?"
    >
        <TechnicalCodeQualityCard />
        <ArtifactTestingCard />
        <BusinessOutcomesControlsCard />
        <GovernanceProcessFlowCard />
    </Section>
);

export default GovernanceReadinessSection;