import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import OutstandingTasksCard from "../cards/OutstandingTasksCard";
import PendingApprovalsCard from "../cards/PendingApprovalsCard";
import UpcomingMilestonesCard from "../cards/UpcomingMilestonesCard";
import BlockingIssuesCard from "../cards/BlockingIssuesCard";

const ReadinessActionsSection = () => (
    <Section
        title="Readiness Actions"
        insights="What needs to be done before this product can be released?"
    >
        <OutstandingTasksCard />
        <PendingApprovalsCard />
        <UpcomingMilestonesCard />
        <BlockingIssuesCard />
    </Section>
);

export default ReadinessActionsSection;
