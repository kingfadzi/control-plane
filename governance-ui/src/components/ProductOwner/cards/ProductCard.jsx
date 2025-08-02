import React from "react";
import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/solid";

const statusIcons = {
    Ready: <CheckCircleIcon className="w-5 h-5 text-green-500" />,
    "At Risk": <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />,
};

const ProductCard = ({ product, onSelect }) => (
    <div className="bg-white border border-slate-200 shadow-sm rounded-2xl p-4 space-y-1">
        <div className="flex justify-between items-center">
            <h3 className="font-semibold text-slate-900">{product.name}</h3>
            {statusIcons[product.readiness]}
        </div>
        <p className="text-sm text-slate-500">Code: {product.code}</p>
        <p className="text-sm text-slate-500">
            Latest: {product.latestRelease} ({product.releaseStatus})
        </p>
        <p className="text-sm text-slate-500">Score: {product.score}%</p>
        <button
            onClick={onSelect}
            className="text-blue-600 hover:underline text-sm font-medium mt-1"
        >
            View Dashboard →
        </button>
    </div>
);

export default ProductCard;
