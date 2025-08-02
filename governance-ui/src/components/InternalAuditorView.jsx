import React from "react";
import ControlEffectivenessSection from "./InternalAuditor/sections/ControlEffectivenessSection";
import GovernanceBreakdownsSection from "./InternalAuditor/sections/GovernanceBreakdownsSection";
import AccountabilityRemediationSection from "./InternalAuditor/sections/AccountabilityRemediationSection";

const InternalAuditorView = ({ onSelect }) => (
    <div className="p-6 max-w-screen-xl mx-auto font-sans space-y-10">
        <ControlEffectivenessSection />
        <GovernanceBreakdownsSection />
        <AccountabilityRemediationSection />
    </div>
);

export default InternalAuditorView;
