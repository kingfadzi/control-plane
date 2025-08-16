// src/components/Forms/DevPanel.jsx
import { Collapse, Alert, AlertTitle, List, ListItem, ListItemText, Divider, Box, Typography } from '@mui/material';

export default function DevPanel({ errors, data, uiSchema }) {
    const isWizard = uiSchema?.type === 'Categorization' && uiSchema?.options?.variant === 'stepper';
    const stepCount = isWizard ? (uiSchema?.elements?.length ?? 0) : 0;

    return (
        <Collapse in>
            <Box sx={{ mt: 3 }}>
                <Alert severity={errors.length ? 'warning' : 'success'}>
                    <AlertTitle>Dev Panel</AlertTitle>
                    <Typography variant="body2">
                        {isWizard ? `Wizard detected (${stepCount} steps).` : 'Single-page layout.'}{' '}
                        {errors.length ? `Validation issues: ${errors.length}` : 'No validation issues.'}
                    </Typography>
                </Alert>
                {errors.length > 0 && (
                    <>
                        <Divider sx={{ my: 1.5 }} />
                        <Typography variant="subtitle2" gutterBottom>First few issues</Typography>
                        <List dense>
                            {errors.slice(0, 8).map((e, i) => (
                                <ListItem key={i} disableGutters>
                                    <ListItemText
                                        primary={e.message}
                                        secondary={e.instancePath || (e.params?.missingProperty ? `missing: ${e.params.missingProperty}` : '')}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )}
            </Box>
        </Collapse>
    );
}
