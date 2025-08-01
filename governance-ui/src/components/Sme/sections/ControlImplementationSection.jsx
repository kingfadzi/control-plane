import React from "react";
import SectionWide from "../../GovernanceCockpit/shared/SectionWide.jsx";
import MissingAndUnassignedControlsCard from "../cards/MissingAndUnassignedControlsCard";
import EngagementAndApprovalGapsCard from "../cards/EngagementAndApprovalGapsCard";

const ControlImplementationSection = () => (
    <SectionWide
        title="Control Implementation Gaps"
        insights="Detects controls that are missing, unassigned, or have low SME activity."
    >
        <MissingAndUnassignedControlsCard className="w-full md:w-[44%]" />
        <EngagementAndApprovalGapsCard className="w-full md:w-[44%]" />
    </SectionWide>
);

export default ControlImplementationSection;
