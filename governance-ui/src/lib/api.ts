import axios from 'axios';

const api = axios.create({ baseURL: '/api/v1' });

export async function resolveForm(token: string) {
    const { data } = await api.get('/forms/resolve', { params: { token } });
    return data as {
        instance_id: string;
        form_kind: string;
        form_version: string;
        schema_sha256?: string;
        status: 'OPEN' | 'SUBMITTED' | 'CLOSED' | 'EXPIRED';
        answers?: any;
    };
}

export async function submitForm(token: string, answers: any) {
    const { data } = await api.post('/forms/submit', { answers }, { params: { token } });
    return data as { saved: boolean; status: string; received_at: string };
}
