// src/components/Forms/FormPage.jsx
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    ThemeProvider, createTheme, CssBaseline, Container, Paper,
    Typography, Alert, Box, Divider, Stack, Button, TextField
} from '@mui/material';
import FormRenderer from './FormRenderer';
import { loadFormBundle, draftKey, loadManifest } from './SchemaLoader';

const theme = createTheme({ palette: { mode: 'light' }, shape: { borderRadius: 16 } });

export default function FormPage({ mode }) {
    const loc = useLocation();
    const nav = useNavigate();
    const params = new URLSearchParams(loc.search);

    const kind = params.get('k') || '';
    const version = params.get('v') || '';
    const dev = params.get('dev') === '1';
    const hasKV = !!kind && !!version;
    const readOnly = mode !== 'edit';

    const [bundle, setBundle] = useState(null);
    const [manifest, setManifest] = useState(null);
    const [err, setErr] = useState(null);
    const [initialData, setInitialData] = useState({});
    const [q, setQ] = useState('');

    // Load either the bundle (if k/v present) or the manifest (if not)
    useEffect(() => {
        (async () => {
            try {
                setErr(null);
                setBundle(null);
                setManifest(null);
                if (hasKV) {
                    const b = await loadFormBundle({ kind, version });
                    setBundle(b);
                    const draft = localStorage.getItem(draftKey(kind, version));
                    setInitialData(draft ? JSON.parse(draft) : {});
                } else {
                    const m = await loadManifest();
                    setManifest(m);
                }
            } catch (e) {
                setErr(e?.message || 'Failed to load form assets.');
            }
        })();
    }, [hasKV, kind, version]);

    const title = useMemo(() => (bundle?.meta?.title || kind || 'Forms'), [bundle, kind]);

    const handleChange = (data) => {
        if (!readOnly && hasKV) {
            localStorage.setItem(draftKey(kind, version), JSON.stringify(data || {}));
        }
    };

    const handleSubmit = (data) => {
        alert('Form submitted (standalone demo).\n\n' + JSON.stringify(data, null, 2));
        if (hasKV) {
            nav(`/form/view?k=${encodeURIComponent(kind)}&v=${encodeURIComponent(version)}`, { replace: true });
        }
    };

    const linkFor = (k, v) => {
        const p = new URLSearchParams({ k, v });
        if (dev) p.set('dev', '1');
        return `/form?${p.toString()}`;
    };

    // Flatten manifest to a list for display + simple filter
    const catalog = useMemo(() => {
        if (!manifest) return [];
        const items = [];
        Object.entries(manifest).forEach(([k, versions]) => {
            Object.keys(versions).forEach((v) => {
                items.push({ k, v, path: versions[v]?.path });
            });
        });
        if (!q.trim()) return items;
        const needle = q.toLowerCase();
        return items.filter(({ k, v }) => k.toLowerCase().includes(needle) || v.toLowerCase().includes(needle));
    }, [manifest, q]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                    {!hasKV ? (
                        // ---- Catalog view (no k/v) ----
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                                <Typography variant="h5" component="h1">Form Catalog</Typography>
                                <Box sx={{ flex: 1 }} />
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Mode: {mode}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
                            {!manifest && !err && <Typography>Loading…</Typography>}
                            {manifest && (
                                <>
                                    <TextField
                                        size="small"
                                        fullWidth
                                        placeholder="Search by form key or version…"
                                        value={q}
                                        onChange={(e) => setQ(e.target.value)}
                                        sx={{ mb: 2 }}
                                    />
                                    {catalog.length === 0 ? (
                                        <Typography>No forms found.</Typography>
                                    ) : (
                                        <Stack spacing={1}>
                                            {catalog.map(({ k, v }) => (
                                                <Stack
                                                    key={`${k}-${v}`}
                                                    direction="row"
                                                    alignItems="center"
                                                    justifyContent="space-between"
                                                    sx={{ p: 1, border: '1px solid #eee', borderRadius: 1 }}
                                                >
                                                    <Box>
                                                        <Typography variant="subtitle1">{k}</Typography>
                                                        <Typography variant="caption" sx={{ opacity: 0.7 }}>version {v}</Typography>
                                                    </Box>
                                                    <Box>
                                                        <Button size="small" variant="text" href={linkFor(k, v)}>
                                                            Open
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                            ))}
                                        </Stack>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        // ---- Form view (k/v present) ----
                        <>
                            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                                <Typography variant="h5" component="h1">{title}</Typography>
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                                    (v{(bundle?.meta?.version || version).replace(/^v/i, '')})
                                </Typography>
                                <Box sx={{ flex: 1 }} />
                                <Typography variant="body2" sx={{ opacity: 0.7 }}>Mode: {mode}</Typography>
                            </Box>
                            <Divider sx={{ mb: 2 }} />
                            {err && <Alert severity="error" sx={{ mb: 2 }}>{err}</Alert>}
                            {!bundle && !err && <Typography>Loading…</Typography>}
                            {bundle && (
                                <FormRenderer
                                    bundle={bundle}
                                    mode={mode}
                                    initialData={initialData}
                                    onChange={handleChange}
                                    onSubmit={handleSubmit}
                                    devPanel={dev}
                                />
                            )}
                        </>
                    )}
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
