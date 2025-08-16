// src/components/Forms/FormRenderer.jsx
import SinglePageRenderer from './renderers/SinglePageRenderer';
import WizardRenderer from './renderers/WizardRenderer';

function isWizard(ui) {
    return ui?.type === 'Categorization'; // treat any Categorization as multi-step
}

export default function FormRenderer(props) {
    const { bundle } = props;
    const wizard = isWizard(bundle?.uiSchema);
    return wizard ? <WizardRenderer {...props} /> : <SinglePageRenderer {...props} />;
}
