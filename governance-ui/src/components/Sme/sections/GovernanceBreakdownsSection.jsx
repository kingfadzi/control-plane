import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import MissingEvidenceCard from "../cards/MissingEvidenceCard.jsx";
import PendingExceptionsCard from "../cards/PendingExceptionsCard.jsx";
import RepeatedExceptionsCard from "../cards/RepeatedExceptionsCard.jsx";
import BlockedTasksCard from "../cards/BlockedTasksCard.jsx";

const GovernanceBreakdownsSection = () => (
    <Section
        title="Governance Process Breakdowns"
        insights="Where are governance gaps occurring in execution?"
    >
        <MissingEvidenceCard />
        <PendingExceptionsCard />
        <RepeatedExceptionsCard />
        <BlockedTasksCard />
    </Section>
);

export default GovernanceBreakdownsSection;
