// src/components/Forms/renderers/WizardRenderer.jsx
import { useEffect, useMemo, useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import { materialRenderers, materialCells } from '@jsonforms/material-renderers';
import { Box, Stack, Button, Stepper, Step, StepLabel } from '@mui/material';
import Ajv from 'ajv';
import DevPanel from '../DevPanel';

function collectStepProps(ui) {
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

function errorTouchesProps(stepProps, ajvErrors) {
    if (!ajvErrors || ajvErrors.length === 0) return false;
    const stepSet = new Set(stepProps);
    return ajvErrors.some((e) => {
        if (e?.keyword === 'required' && e?.params?.missingProperty) {
            return stepSet.has(e.params.missingProperty);
        }
        if (typeof e?.instancePath === 'string' && e.instancePath) {
            const prop = e.instancePath.replace(/^\//, '').split('/')[0];
            return stepSet.has(prop);
        }
        return false;
    });
}

export default function WizardRenderer({
                                           bundle,
                                           mode,
                                           initialData,
                                           onChange,
                                           onSubmit,
                                           devPanel,
                                       }) {
    const readOnly = mode !== 'edit';
    const [data, setData] = useState(initialData ?? {});
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        setData(initialData ?? {});
        setActiveStep(0);
    }, [initialData]);

    const categories = Array.isArray(bundle.uiSchema?.elements) ? bundle.uiSchema.elements : [];
    const stepLabels = categories.map((c, i) => c.label || `Step ${i + 1}`);
    const safeIdx = Math.min(Math.max(activeStep, 0), Math.max(categories.length - 1, 0));
    const currentCategory = categories[safeIdx] || { elements: [] };
    const uiForStep = { type: 'VerticalLayout', elements: currentCategory.elements || [] };

    // AJV validity = single source of truth
    const ajv = useMemo(() => new Ajv({ allErrors: true, strict: false, allowUnionTypes: true }), []);
    const validate = useMemo(() => ajv.compile(bundle.jsonSchema), [ajv, bundle.jsonSchema]);
    const ajvErrors = useMemo(() => {
        try { validate(data); return validate.errors ?? []; }
        catch (e) { return [{ message: e?.message || 'Schema validation error' }]; }
    }, [validate, data]);

    const stepProps = collectStepProps(uiForStep);
    const disableNext = errorTouchesProps(stepProps, ajvErrors);
    const disableFinish = ajvErrors.length > 0;
    const isLast = safeIdx === Math.max(0, stepLabels.length - 1);

    return (
        <Box>
            <Stepper activeStep={safeIdx} sx={{ mb: 3 }}>
                {stepLabels.map((label, i) => (
                    <Step key={i}><StepLabel>{label}</StepLabel></Step>
                ))}
            </Stepper>

            <JsonForms
                schema={bundle.jsonSchema}
                uischema={uiForStep}
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
                        variant="outlined"
                        onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                        disabled={safeIdx === 0}
                    >
                        Back
                    </Button>
                    {isLast ? (
                        <Button
                            variant="contained"
                            onClick={() => onSubmit?.(data)}
                            disabled={disableFinish || !onSubmit}
                        >
                            Finish
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setActiveStep((s) => Math.min(stepLabels.length - 1, s + 1))}
                            disabled={disableNext}
                        >
                            Next
                        </Button>
                    )}
                </Stack>
            )}

            {devPanel && <DevPanel errors={ajvErrors} data={data} uiSchema={bundle.uiSchema} />}
        </Box>
    );
}
