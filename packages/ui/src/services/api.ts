import { Api } from '@operations/api.client';

// todo: configure
const BASE_URL = 'http://localhost:3030';

export const api = new Api({
    baseUrl: BASE_URL,
});