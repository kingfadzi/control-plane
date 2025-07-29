import React from 'react';

const GovernanceModal = ({ title, onClose, children }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white z-10">
                    <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
                    <button
                        className="text-sm text-slate-500 hover:text-slate-800"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default GovernanceModal;
