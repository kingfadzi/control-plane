import React from "react";
import ControlImplementationSection from "./Sme/sections/ControlImplementationSection";
import GovernanceBreakdownsSection from "./Sme/sections/GovernanceBreakdownsSection";
import RiskAndExposureSection from "./Sme/sections/RiskAndExposureSection";

const SmeView = ({ onSelect }) => (
    <div className="p-6 max-w-screen-xl mx-auto font-sans space-y-8">
        <ControlImplementationSection />
        <GovernanceBreakdownsSection />
        <RiskAndExposureSection />
    </div>
);

export default SmeView;