// src/components/Forms/renderers/SinglePageRenderer.jsx
import { useEffect, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, Stack, Button } from '@mui/material';
import Ajv from 'ajv';
import DevPanel from '../DevPanel';

// collect all property names referenced by the current (single page) uiSchema
function collectVisibleProps(ui) {
    const out = [];
    const walk = (node) => {
        if (!node) return;
        if (node.type === 'Control' && typeof node.scope === 'string') {
            const m = node.scope.match(/#\/properties\/([^/]+)/);
            if (m) out.push(m[1]);
        }
        (node.elements || []).forEach(walk);
    };
    walk(ui);
    return Array.from(new Set(out));
}

// does any AJV error touch one of these properties?
function errorsTouchProps(props, ajvErrors) {
    if (!ajvErrors || ajvErrors.length === 0) return false;
    const set = new Set(props);
    return ajvErrors.some((e) => {
        if (e?.keyword === 'required' && e?.params?.missingProperty) {
            return set.has(e.params.missingProperty);
        }
        if (typeof e?.instancePath === 'string' && e.instancePath) {
            const prop = e.instancePath.replace(/^\//, '').split('/')[0];
            return set.has(prop);
        }
        return false;
    });
}

export default function SinglePageRenderer({
                                               bundle,
                                               mode,
                                               initialData,
                                               onChange,
                                               onSubmit,
                                               devPanel,
                                           }) {
    const readOnly = mode !== 'edit';
    const [data, setData] = useState(initialData ?? {});

    useEffect(() => {
        setData(initialData ?? {});
    }, [initialData]);

    // AJV (global validation), but we'll gate buttons using only VISIBLE fields
    const ajv = useMemo(() => new Ajv({ allErrors: true, strict: false, allowUnionTypes: true }), []);
    const validate = useMemo(() => ajv.compile(bundle.jsonSchema), [ajv, bundle.jsonSchema]);
    const ajvErrors = useMemo(() => {
        try { validate(data); return validate.errors ?? []; }
        catch (e) { return [{ message: e?.message || 'Schema validation error' }]; }
    }, [validate, data]);

    // Only block Finish on errors that affect controls actually shown on the page
    const visibleProps = useMemo(() => collectVisibleProps(bundle.uiSchema), [bundle.uiSchema]);
    const blockingVisible = errorsTouchProps(visibleProps, ajvErrors);
    const canFinish = !blockingVisible;

    return (
        <Box>
            <JsonForms
                schema={bundle.jsonSchema}
                uischema={bundle.uiSchema}
                data={data}
                renderers={materialRenderers}
                cells={materialCells}
                readonly={readOnly}
                validationMode="ValidateAndShow"
                onChange={({ data }) => {
                    if (!readOnly) setData(data ?? {});
                    onChange?.(data ?? {});
                }}
            />

            {!readOnly && (
                <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
                    <Button
                        variant="contained"
                        onClick={() => onSubmit?.(data)}
                        disabled={!canFinish || !onSubmit}
                    >
                        Finish
                    </Button>
                    <Button variant="outlined" onClick={() => window.history.back()}>
                        Cancel
                    </Button>
                </Stack>
            )}

            {devPanel && <DevPanel errors={ajvErrors} data={data} uiSchema={bundle.uiSchema} />}
        </Box>
    );
}
