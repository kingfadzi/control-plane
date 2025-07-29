import React, { useState } from 'react';
import GovernanceModal from './GovernanceModal';

const GovernanceCard = ({ title, items, maxVisible = 3, modalTitle, renderItem }) => {
    const [showModal, setShowModal] = useState(false);

    const visibleItems = items.slice(0, maxVisible);
    const hasMore = items.length > maxVisible;

    return (
        <>
            <div className="flex flex-col h-full min-h-[220px] rounded-lg bg-white shadow-sm max-w-96 p-4 border border-slate-200">
                <div className="pb-3 mb-3 border-b border-slate-200">
                    <h2 className="text-base font-semibold text-slate-800 text-center">{title}</h2>
                </div>

                <ul className="flex flex-col gap-3 text-sm text-slate-600 flex-grow">
                    {visibleItems.map(renderItem)}
                </ul>

                {hasMore && (
                    <button
                        onClick={() => setShowModal(true)}
                        className="text-xs text-blue-600 underline mt-3 self-center"
                    >
                        View more
                    </button>
                )}
            </div>

            {showModal && (
                <GovernanceModal title={modalTitle || title} onClose={() => setShowModal(false)}>
                    <ul className="flex flex-col gap-3 text-sm text-slate-600">
                        {items.map(renderItem)}
                    </ul>
                </GovernanceModal>
            )}
        </>
    );
};

export default GovernanceCard;
