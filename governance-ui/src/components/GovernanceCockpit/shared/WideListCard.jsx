import React from "react";

const WideListCard = ({ title, items, renderItem, className = "" }) => (
    <div className={`col-span-2 bg-white rounded-lg shadow-sm p-4 border border-slate-200 ${className}`}>
        <div className="pb-3 mb-3 border-b border-slate-200">
            <h2 className="text-base font-semibold text-slate-800">{title}</h2>
        </div>
        <ul className="space-y-2 text-sm text-slate-600">
            {items.map((item, i) => (
                <React.Fragment key={i}>{renderItem(item, i)}</React.Fragment>
            ))}
        </ul>
    </div>
);

export default WideListCard;
