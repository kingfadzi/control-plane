import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import ReleaseHistoryTableCard from "../cards/ReleaseHistoryTableCard";
import GovernanceScoreHistoryCard from "../cards/GovernanceScoreHistoryCard";
import AuditTrailSummaryCard from "../cards/AuditTrailSummaryCard";
import TraceabilityMatrixCard from "../cards/TraceabilityMatrixCard";

const ReleaseHistorySection = () => (
    <Section
        title="Release History & Assurance"
        insights="How have we performed in the past? Is this product auditable?"
    >
        <ReleaseHistoryTableCard />
        <GovernanceScoreHistoryCard />
        <AuditTrailSummaryCard />
        <TraceabilityMatrixCard />
    </Section>
);

export default ReleaseHistorySection;
