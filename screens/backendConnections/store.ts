import { writable } from 'svelte/store';
import { ping } from './requests';

export type conn = {
    backendAvailable: boolean,
    model: string,
    webrtc: boolean,
    filename: string,
    language: string,
    token: string
}

export const connection = writable<conn>({
    backendAvailable: false,
    webrtc: false,
    model: 'tiny',
    filename: '',
    language: 'en',
    token:'',
});

export const updateState = (obj: Partial<conn>) => {
    console.log('called updateState');
    connection.update((value) => ({ ...value, ...obj }));
}

let call = (time) => setTimeout(() => {
    ping().then((res) => {
        if (res) {
            connection.update((value) => ({ ...value, backendAvailable: true }));
        } else {
            call(1000)
        }
    })
}, time);
export const ans = writable([]);

call(0);
