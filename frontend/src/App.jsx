import React, { useState } from 'react';
import { Tabs, Tab } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

const Overview = () => (
    <div className="grid grid-cols-3 gap-4">
        <Card>
            <CardContent>
                <h3 className="font-semibold text-lg mb-2">Business Outcomes</h3>
                <ul>
                    <li>✔️ BO-001: Token Auth</li>
                    <li>☐ BO-002: Reporting UI</li>
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <h3 className="font-semibold text-lg mb-2">Risk Stories</h3>
                <ul>
                    <li>⚠️ SEC-004: Logging</li>
                    <li>✅ ACC-002: Accessibility</li>
                </ul>
            </CardContent>
        </Card>
        <Card>
            <CardContent>
                <h3 className="font-semibold text-lg mb-2">Controls</h3>
                <ul>
                    <li>Security: Engaged</li>
                    <li>Data: Pending</li>
                </ul>
            </CardContent>
        </Card>
        <Card className="col-span-3">
            <CardContent>
                <h3 className="font-semibold text-lg mb-2">Release Readiness</h3>
                <p>Next Release: August 5, 2025</p>
                <p>✅ 85% complete</p>
                <p>📂 Evidence: 4 of 5 artifacts uploaded</p>
            </CardContent>
        </Card>
    </div>
);

const BusinessOutcomes = () => (
    <div>Business Outcomes content (Jira integration view)</div>
);

const RiskStories = () => (
    <div>Risk Stories content (Jira integration view)</div>
);

const Evidence = () => (
    <div>Evidence from GitLab or uploaded artifacts</div>
);

const AuditTrail = () => (
    <div>Timeline view of all key governance events</div>
);

const GovernanceUI = () => {
    const [selectedTab, setSelectedTab] = useState('overview');

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Governance: jumpstart-app</h1>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                <Tab value="overview" label="Overview" />
                <Tab value="business" label="Business Outcomes" />
                <Tab value="risk" label="Risk Stories" />
                <Tab value="evidence" label="Evidence" />
                <Tab value="audit" label="Audit Trail" />
            </Tabs>
            <div className="mt-4">
                {selectedTab === 'overview' && <Overview />}
                {selectedTab === 'business' && <BusinessOutcomes />}
                {selectedTab === 'risk' && <RiskStories />}
                {selectedTab === 'evidence' && <Evidence />}
                {selectedTab === 'audit' && <AuditTrail />}
            </div>
        </div>
    );
};

export default GovernanceUI;
