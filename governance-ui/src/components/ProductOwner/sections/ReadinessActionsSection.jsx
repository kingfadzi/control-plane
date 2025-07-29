import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import ChangeControlActionsCard from "../cards/ChangeControlActionsCard.jsx";
import EngagementActionsCard from "../cards/EngagementActionsCard.jsx";
import TaskWorkflowCard from "../cards/TaskWorkflowCard.jsx";
import ReleasePipelineHealthCard from "../cards/ReleasePipelineHealthCard.jsx";

const ReadinessActionsSection = () => (
    <Section
        title="Readiness Actions"
        insights="What needs to be done before this product can be released?"
    >
        <ChangeControlActionsCard />
        <EngagementActionsCard />
        <TaskWorkflowCard />
        <ReleasePipelineHealthCard />
    </Section>
);

export default ReadinessActionsSection;
