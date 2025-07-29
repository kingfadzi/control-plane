import React from 'react';
import ApplicationOverview from "./GovernanceCockpit/ApplicationOverview.jsx";
import CurrentGovernanceProgress from './GovernanceCockpit/CurrentGovernanceProgress';
import OutstandingGovernanceTasks from './GovernanceCockpit/OutstandingGovernanceTasks';
import OpenRisks from './GovernanceCockpit/OpenRisks';
import EvidenceStatus from './GovernanceCockpit/EvidenceStatus';
import CollaborationHealth from './GovernanceCockpit/CollaborationHealth';
import AuditLogSummary from './GovernanceCockpit/AuditLogSummary';
import ReleaseHistoryOverview from './GovernanceCockpit/ReleaseHistoryOverview';
import ComplianceTrends from './GovernanceCockpit/ComplianceTrends';
import HistoricalGovernanceDebt from './GovernanceCockpit/HistoricalGovernanceDebt';
import TraceabilityMatrix from './GovernanceCockpit/TraceabilityMatrix';
import GovernanceReadinessScore from './GovernanceCockpit/GovernanceReadinessScore';
import NextGovernanceActions from './GovernanceCockpit/NextGovernanceActions';
import ChangeRequestStatus from './GovernanceCockpit/ChangeRequestStatus';
import UpcomingMilestones from './GovernanceCockpit/UpcomingMilestones';
import NextReleaseCTA from './GovernanceCockpit/NextReleaseCTA';
import ExceptionsAndDispensations from './GovernanceCockpit/ExceptionsAndDispensations';
import StageTimingTrends from './GovernanceCockpit/StageTimingTrends';
import EvidenceReuseSuggestions from './GovernanceCockpit/EvidenceReuseSuggestions';
import PolicyComplianceSnapshot from './GovernanceCockpit/PolicyComplianceSnapshot';
import ControlQuestionnaireResponses from './GovernanceCockpit/ControlQuestionnaireResponses';

const GovernanceCockpit = () => {
    return (
        <div className="p-6 font-sans">
            <section
                className="grid gap-6 items-start"
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
            >
                <ApplicationOverview />
                <CurrentGovernanceProgress />
                <OutstandingGovernanceTasks />
                <OpenRisks />
                <EvidenceStatus />
                <CollaborationHealth />
                <AuditLogSummary />
                <ReleaseHistoryOverview />
                <ComplianceTrends />
                <HistoricalGovernanceDebt />
                <TraceabilityMatrix />
                <GovernanceReadinessScore />
                <NextGovernanceActions />
                <ChangeRequestStatus />
                <UpcomingMilestones />
                <NextReleaseCTA />
                <ExceptionsAndDispensations />
                <StageTimingTrends />
                <EvidenceReuseSuggestions />
                <PolicyComplianceSnapshot />
                <ControlQuestionnaireResponses />
            </section>
        </div>
    );
};

export default GovernanceCockpit;
