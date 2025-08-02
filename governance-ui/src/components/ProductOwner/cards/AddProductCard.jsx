import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

const AddProductCard = () => (
  <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 transition">
    <PlusCircleIcon className="h-8 w-8 text-slate-400 mb-2" />
    <p className="text-sm text-slate-500">Add New Product</p>
  </div>
);

export default AddProductCard;