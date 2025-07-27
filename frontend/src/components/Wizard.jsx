// React + Bootstrap wizard frontend (React 18, Bootstrap 5)
// File: src/components/Wizard.js

import React, { useEffect, useState } from 'react';
import { Form, Button, ProgressBar, Container } from 'react-bootstrap';

const steps = ['email', 'address', 'payment'];

const Wizard = ({ workflowId }) => {
    const [currentStep, setCurrentStep] = useState('email');
    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetch(`/api/wizard/${workflowId}/step`)
            .then(res => res.json())
            .then(data => setCurrentStep(data.step));
    }, [workflowId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`/api/wizard/${workflowId}/step/${currentStep}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        }).then(() => {
            const nextIndex = steps.indexOf(currentStep) + 1;
            setCurrentStep(steps[nextIndex] || 'complete');
        });
    };

    const renderForm = () => {
        switch (currentStep) {
            case 'email':
                return (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" name="email" onChange={handleChange} required />
                        </Form.Group>
                        <Button type="submit">Next</Button>
                    </Form>
                );
            case 'address':
                return (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formAddress">
                            <Form.Label>Address</Form.Label>
                            <Form.Control type="text" name="address" onChange={handleChange} required />
                        </Form.Group>
                        <Button type="submit">Next</Button>
                    </Form>
                );
            case 'payment':
                return (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formCard">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control type="text" name="card" onChange={handleChange} required />
                        </Form.Group>
                        <Button type="submit">Submit</Button>
                    </Form>
                );
            case 'complete':
                return <h3>Workflow Complete 🎉</h3>;
            default:
                return <p>Loading...</p>;
        }
    };

    const stepIndex = steps.indexOf(currentStep);
    const progress = ((stepIndex + 1) / steps.length) * 100;

    return (
        <Container className="mt-4">
            <h2>Wizard Flow</h2>
            <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />
            {renderForm()}
        </Container>
    );
};

export default Wizard;
