// src/components/personas/ProductOwnerView.jsx
import React from 'react';
import ApplicationOverview from '../GovernanceCockpit/ApplicationOverview';
import CurrentGovernanceProgress from '../GovernanceCockpit/CurrentGovernanceProgress';
import GovernanceReadinessScore from '../GovernanceCockpit/GovernanceReadinessScore';
import OutstandingGovernanceTasks from '../GovernanceCockpit/OutstandingGovernanceTasks';
import EvidenceStatus from '../GovernanceCockpit/EvidenceStatus';
import OpenRisks from '../GovernanceCockpit/OpenRisks';
import ExceptionsAndDispensations from '../GovernanceCockpit/ExceptionsAndDispensations';
import UpcomingMilestones from '../GovernanceCockpit/UpcomingMilestones';
import NextReleaseCTA from '../GovernanceCockpit/NextReleaseCTA';
import ReleaseHistoryOverview from '../GovernanceCockpit/ReleaseHistoryOverview';
import TraceabilityMatrix from '../GovernanceCockpit/TraceabilityMatrix';
import AuditLogSummary from '../GovernanceCockpit/AuditLogSummary';

const Section = ({ title, description, children }) => (
    <section className="space-y-4">
        <div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
            <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="grid grid-cols-auto-fill-grid gap-6">{children}</div>
    </section>
);

const ProductOwnerView = () => {
    return (
        <div className="p-6 space-y-10 font-sans">
            <Section
                title="Application Snapshot"
                description="High-level context about this application’s ownership and governance scope."
            >
                <ApplicationOverview />
            </Section>

            <Section
                title="Governance Readiness"
                description="Understand how far along this product is in meeting required governance controls."
            >
                <CurrentGovernanceProgress />
                <GovernanceReadinessScore />
            </Section>

            <Section
                title="Action Required"
                description="View pending tasks and incomplete evidence that need your team’s input."
            >
                <OutstandingGovernanceTasks />
                <EvidenceStatus />
            </Section>

            <Section
                title="Risks & Exceptions"
                description="Review unresolved governance risks and formally granted exceptions."
            >
                <OpenRisks />
                <ExceptionsAndDispensations />
            </Section>

            <Section
                title="Timeline to Release"
                description="Track upcoming governance milestones and final release readiness."
            >
                <UpcomingMilestones />
                <NextReleaseCTA />
            </Section>

            <Section
                title="Past Releases"
                description="See historical releases and their compliance posture at time of deployment."
            >
                <ReleaseHistoryOverview />
            </Section>

            <Section
                title="Audit & Assurance"
                description="Ensure that your product is traceable, logged, and audit-ready."
            >
                <TraceabilityMatrix />
                <AuditLogSummary />
            </Section>
        </div>
    );
};

export default ProductOwnerView;
