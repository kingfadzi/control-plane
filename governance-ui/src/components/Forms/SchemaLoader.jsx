// src/components/Forms/SchemaLoader.jsx

async function fetchJSON(path) {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
    return res.json();
}

export async function loadManifest() {
    return fetchJSON('/schemas/manifest.json');
}

export async function loadBundleByKV(kind, version) {
    const manifest = await loadManifest();
    const entry = manifest?.[kind]?.[version];
    if (!entry?.path) throw new Error(`Schema not found for ${kind} ${version}`);
    const bundle = await fetchJSON(entry.path);
    return bundle;
}

// Placeholder for future token-based resolution (via Spring)
export async function loadBundleByToken(_token) {
    throw new Error('Token-based loading not implemented in standalone mode.');
}

export async function loadFormBundle(req) {
    if ('token' in req) return loadBundleByToken(req.token);
    return loadBundleByKV(req.kind, req.version);
}

// Local draft storage key
export const draftKey = (kind, version) => `form-draft:${kind}:${version}`;
