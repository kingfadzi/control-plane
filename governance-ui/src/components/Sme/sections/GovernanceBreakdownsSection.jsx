import React from "react";
import Section from "../../GovernanceCockpit/shared/Section";
import ExceptionAndEvidenceGapsCard from "../cards/ExceptionAndEvidenceGapsCard";
import GovernanceBlockersCard from "../cards/GovernanceBlockersCard";
import SectionWide from "../../GovernanceCockpit/shared/SectionWide.jsx";

const GovernanceBreakdownsSection = () => (
    <SectionWide
        title="Governance Process Breakdowns"
        insights="Highlights blockers, missing evidence, or exception delays."
    >
        <ExceptionAndEvidenceGapsCard  className="w-full md:w-[44%]"/>
        <GovernanceBlockersCard  className="w-full md:w-[44%]"/>

    </SectionWide>
);

export default GovernanceBreakdownsSection;