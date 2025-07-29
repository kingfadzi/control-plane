import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import ControlCoverageCard from "../cards/ControlCoverageCard";
import EvidenceCompletionCard from "../cards/EvidenceCompletionCard";
import PolicyComplianceScoreCard from "../cards/PolicyComplianceScoreCard";
import GovernanceHeatmapCard from "../cards/GovernanceHeatmapCard";

const GovernanceReadinessSection = () => (
    <Section
        title="Governance Readiness"
        insights="Is this product meeting the governance bar? What are the gaps?"
    >
        <ControlCoverageCard />
        <EvidenceCompletionCard />
        <PolicyComplianceScoreCard />
        <GovernanceHeatmapCard />
    </Section>
);

export default GovernanceReadinessSection;
