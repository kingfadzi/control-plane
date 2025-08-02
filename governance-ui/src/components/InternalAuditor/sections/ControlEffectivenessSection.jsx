import React from "react";
import SectionWide from "../../GovernanceCockpit/shared/SectionWide";
import RepeatedBypassControlsCard from "../cards/RepeatedBypassControlsCard";
import WeakEvidenceSignalsCard from "../cards/WeakEvidenceSignalsCard";

const ControlEffectivenessSection = () => (
    <SectionWide
        title="Control Effectiveness & Gaps"
        insights="Are controls being bypassed, rubber-stamped, or executed without evidence? This section flags weak enforcement or systemic circumvention."
    >
        <RepeatedBypassControlsCard />
        <WeakEvidenceSignalsCard />
    </SectionWide>
);

export default ControlEffectivenessSection;
