import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";

import UnlinkedRiskStoriesCard from "../cards/UnlinkedRiskStoriesCard.jsx";
import ExpiredExceptionsCard from "../cards/ExpiredExceptionsCard.jsx";
import DecliningControlCoverageCard from "../cards/DecliningControlCoverageCard.jsx";
import PoorEvidenceQualityCard from "../cards/PoorEvidenceQualityCard.jsx";

const RiskAndExposureSection = () => (
    <Section
        title="Risk Signals & Exposure"
        insights="What emerging risks or control failures require action?"
    >
        <UnlinkedRiskStoriesCard />
        <ExpiredExceptionsCard />
        <DecliningControlCoverageCard />
        <PoorEvidenceQualityCard />
    </Section>
);

export default RiskAndExposureSection;
