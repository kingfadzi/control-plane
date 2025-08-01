import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import AppsMissingMandatoryControlsCard from "../cards/AppsMissingMandatoryControlsCard.jsx";
import InvalidArtifactsCard from "../cards/InvalidArtifactsCard.jsx";
import PendingApprovalsCard from "../cards/PendingApprovalsCard.jsx";
import LowEngagementScoreCard from "../cards/LowEngagementScoreCard.jsx";

const ControlImplementationSection = () => (
    <Section
        title="Control Implementation Gaps"
        insights="Where are your controls incomplete or unreviewed?"
    >
        <AppsMissingMandatoryControlsCard />
        <InvalidArtifactsCard />
        <PendingApprovalsCard />
        <LowEngagementScoreCard />
    </Section>
);

export default ControlImplementationSection;
