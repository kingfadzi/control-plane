import React from "react";
import SectionWide from "../../GovernanceCockpit/shared/SectionWide";
import ReleasesMissingGovernanceCard from "../cards/ReleasesMissingGovernanceCard";
import ControlMappingFailuresCard from "../cards/ControlMappingFailuresCard";

const GovernanceBreakdownsSection = () => (
    <SectionWide
        title="Governance Breakdowns & Missed Checks"
        insights="Which releases went live without critical gates? Where did controls silently fail due to mapping or enforcement gaps?"
    >
        <ReleasesMissingGovernanceCard />
        <ControlMappingFailuresCard />
    </SectionWide>
);

export default GovernanceBreakdownsSection;
