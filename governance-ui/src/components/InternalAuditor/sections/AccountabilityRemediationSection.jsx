import React from "react";
import SectionWide from "../../GovernanceCockpit/shared/SectionWide";
import StaleExceptionsCard from "../cards/StaleExceptionsCard";
import HighRiskTeamsAppsCard from "../cards/HighRiskTeamsAppsCard";

const AccountabilityRemediationSection = () => (
    <SectionWide
        title="Accountability & Remediation Patterns"
        insights="Which teams or systems are repeatedly deferring governance? This section highlights stale exceptions, audit inaction, and recurring violations."
    >
        <StaleExceptionsCard />
        <HighRiskTeamsAppsCard />
    </SectionWide>
);

export default AccountabilityRemediationSection;
