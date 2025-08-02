import React from "react";

const GovernanceActionTable = ({ items }) => (
    <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
        <tr>
          <th className="px-4 py-2">Product</th>
          <th className="px-4 py-2">Release</th>
          <th className="px-4 py-2">Issue Type</th>
          <th className="px-4 py-2">Details</th>
          <th className="px-4 py-2">Action</th>
        </tr>
        </thead>
        <tbody>
        {items.map((item, idx) => (
            <tr key={idx} className="border-t">
              <td className="px-4 py-2">{item.product}</td>
              <td className="px-4 py-2">{item.release}</td>
              <td className="px-4 py-2">{item.type}</td>
              <td className="px-4 py-2">{item.detail}</td>
              <td className="px-4 py-2 text-blue-600 hover:underline cursor-pointer">{item.actionLabel}</td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>
);

export default GovernanceActionTable;
