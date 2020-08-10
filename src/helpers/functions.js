import UIfx from "uifx";
import axios from "axios";

import mp3ErrorFile from "../assets/audio/error.mp3";
import mp3WarningFile from "../assets/audio/warning.mp3";
import {
    API_KEY,
    APP_NAME,
    API_SERVER_URL,
} from "./constants";

// Request interceptor
axios.interceptors.request.use(config => {
    config.headers.ContentType = 'Application/json';
    config.headers.Authorization = 'Bearer ' + API_KEY;
    return config;
}, error => Promise.reject(error));

/**
 *
 */
export function playWarningSound() {
    const warningSound = new UIfx(mp3WarningFile, {volume: 1.0, throttleMs: 100});
    try {warningSound.play()}
    catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

/**
 *
 */
export function playErrorSound() {
    const errorSound = new UIfx(mp3ErrorFile, {volume: 1.0, throttleMs: 100});
    try {errorSound.play()}
    catch (e) {if(process.env.NODE_ENV !== 'production') console.log({e})}
}

/**
 *
 * @param title
 * @returns {string}
 */
export function getPageTitle(title) {
    return `${title} - ${APP_NAME}`
}

/**
 *
 * @param field
 * @returns {{color: string}}
 */
export function getFieldColor(field) {
    return {color: (field.isValid ? '#22252a' : '#e22529')}
}

/**
 *
 * @param text
 * @param maxCharacters
 * @returns {string|*}
 */
export function formatString(text, maxCharacters) {
    // Extract
    try {
        if(text.length > maxCharacters) return text.substring(0, maxCharacters) + '...';
    } catch (e) {
        if(process.env.NODE_ENV !== 'production') console.log({e});
    }
    return text;
}

/**
 *
 * @param image
 * @param scope
 * @returns {string}
 */
export function getImageFromServer(image, scope) {
    return (image === null)
        ? require('../assets/images/default.jpg')
        : `${API_SERVER_URL}/storage/${image}`;
}

/**
 *
 * @param url
 * @returns {Promise<any>}
 */
export function apiGetRequest(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
            .then(res => {
                const apiResponse = res.data;
                apiResponse.status
                    ? resolve(apiResponse.data)
                    : reject(JSON.stringify(apiResponse.message));
            })
            .catch(e => {
                reject('Erreur du serveur distant');
                if(process.env.NODE_ENV !== 'production') console.log({e});
            })
    });
}

/**
 *
 * @param url
 * @param data
 * @returns {Promise<any>}
 */
export function apiPostRequest(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                const apiResponse = res.data;
                apiResponse.status
                    ? resolve(apiResponse.data)
                    : reject(JSON.stringify(apiResponse.message));
            })
            .catch(e => {
                reject('Erreur du serveur distant');
                if(process.env.NODE_ENV !== 'production') console.log({e});
            })
    });
}

/**
 *
 * @param scope
 * @param requests
 * @returns {*}
 */
export function processingRequest(scope, requests) {
    const request = requests.find(item => item.scope === scope);
    return request ? (!request.failed && request.loading) : false;
}

/**
 *
 * @param scope
 * @param requests
 * @returns {*}
 */
export function succeededRequest(scope, requests) {
    const request = requests.find(item => item.scope === scope);
    return request ? (!request.failed && !request.loading) : false;
}

/**
 *
 * @param scope
 * @param errors
 * @returns {*}
 */
export function shouldShowError(scope, errors) {
    const error = errors.find(item => item.scope === scope);
    return error ? error.show : false;
}