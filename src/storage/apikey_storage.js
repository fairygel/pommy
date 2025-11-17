import { Providers } from '../enum/providers.js';

const STORAGE_KEY_PREFIX = 'apikey_';

export class ApiKeyStorage {
    getApiKey(provider) {
        return localStorage.getItem(STORAGE_KEY_PREFIX + Providers.format(provider));
    }

    setApiKey(provider, apiKey) {
	    localStorage.setItem(STORAGE_KEY_PREFIX + Providers.format(provider), apiKey);
    }
}