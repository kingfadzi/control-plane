import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import OpenRisksCard from "../cards/OpenRisksCard";
import ExceptionsCard from "../cards/ExceptionsCard";
import ViolationSummaryCard from "../cards/ViolationSummaryCard";
import RiskBreakdownCard from "../cards/RiskBreakdownCard";

const RisksAndExceptionsSection = () => (
    <Section
        title="Risks & Exceptions"
        insights="What could prevent this product from going live successfully?"
    >
        <OpenRisksCard />
        <ExceptionsCard />
        <ViolationSummaryCard />
        <RiskBreakdownCard />
    </Section>
);

export default RisksAndExceptionsSection;
