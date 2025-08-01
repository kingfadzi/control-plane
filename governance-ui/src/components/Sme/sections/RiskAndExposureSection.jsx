import React from "react";
import Section from "../../GovernanceCockpit/shared/SectionWide";
import UnlinkedRiskStoriesCard from "../cards/UnlinkedRiskStoriesCard";
import HighRiskExceptionsCard from "../cards/HighRiskExceptionsCard";

const RiskAndExposureSection = () => (
    <Section
        title="Emerging Risks & Exposure"
        insights="Tracks emerging risk signals based on exceptions, trends, or risk stories."
    >
        <UnlinkedRiskStoriesCard />
        <HighRiskExceptionsCard />
    </Section>
);

export default RiskAndExposureSection;
