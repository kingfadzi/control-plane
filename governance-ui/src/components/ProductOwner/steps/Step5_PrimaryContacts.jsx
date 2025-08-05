import React, { useState } from "react";

const dummyContacts = [
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Smith", email: "bob.smith@example.com" },
    { name: "Carlos Diaz", email: "carlos.diaz@example.com" },
];

const contactTypes = [
    "Product Owner",
    "Architecture Owner",
    "Agile Team Lead",
    "Service Owner",
    "Accessibility SME",
    "Data Architecture SME",
    "Enterprise Architecture SME",
    "Security SME",
    "Service Transition",
];

const Step5_PrimaryContacts = ({ formData, updateField }) => {
    const [query, setQuery] = useState("");
    const [selectedType, setSelectedType] = useState(contactTypes[0]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSearch = async () => {
        setLoading(true);
        setTimeout(() => {
            const filtered = dummyContacts.filter(
                (c) =>
                    c.name.toLowerCase().includes(query.toLowerCase()) ||
                    c.email.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filtered);
            setError(filtered.length === 0 ? "No matching contacts found." : "");
            setLoading(false);
        }, 300);
    };

    const handleAddContact = (contact) => {
        const newEntry = { ...contact, role: selectedType };
        const updated = [...formData.contacts, newEntry];
        updateField("contacts", updated);
        setResults([]);
        setQuery("");
    };

    const handleRemoveContact = (index) => {
        const updated = [...formData.contacts];
        updated.splice(index, 1);
        updateField("contacts", updated);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="text-sm font-medium text-slate-700 block mb-1">Assign Contact</label>
                <div className="flex flex-wrap items-center gap-2">
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="border border-slate-300 rounded px-3 py-2 text-sm"
                    >
                        {contactTypes.map((type) => (
                            <option key={type}>{type}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setResults([]);
                            setError("");
                        }}
                        placeholder="Enter name or email"
                        className="flex-1 border border-slate-300 rounded px-3 py-2 text-sm"
                    />
                    <button
                        onClick={handleSearch}
                        disabled={!query || loading}
                        className="px-4 py-2 bg-blue-600 text-white text-sm rounded"
                    >
                        {loading ? "..." : "Search"}
                    </button>
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {results.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm text-slate-600">Select a contact:</p>
                    {results.map((contact, i) => (
                        <button
                            key={i}
                            onClick={() => handleAddContact(contact)}
                            className="block w-full text-left border border-slate-300 rounded p-2 hover:bg-slate-50"
                        >
                            <strong>{contact.name}</strong> ({contact.email}) — <em>{selectedType}</em>
                        </button>
                    ))}
                </div>
            )}

            {formData.contacts.length > 0 && (
                <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-700">Assigned Contacts</h3>
                    <ul className="space-y-1">
                        {formData.contacts.map((c, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center border border-slate-200 rounded px-3 py-2"
                            >
                                <span className="text-sm text-slate-800">
                                    <strong>{c.name}</strong> ({c.email}) — <em>{c.role}</em>
                                </span>
                                <button
                                    onClick={() => handleRemoveContact(i)}
                                    className="text-sm text-red-600 hover:underline"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Step5_PrimaryContacts;
