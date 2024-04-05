import { useState, useEffect } from 'react';
import { ping } from './requests';

export type conn = {
    backendAvailable: boolean,
    model: string,
    webrtc: boolean,
    filename: string,
    language: string,
    token: string
}

export const initialConnectionState: conn = {
    backendAvailable: false,
    webrtc: false,
    model: 'tiny',
    filename: '',
    language: 'en',
    token:'',
};

export const useConnection = () => {
    const [connection, setConnection] = useState<conn>(initialConnectionState);

    useEffect(() => {
        const fetchData = async () => {
            const res = await ping();
            if (res) {
                setConnection(prevState => ({ ...prevState, backendAvailable: true }));
            } else {
                setTimeout(fetchData, 1000);
            }
        };
        fetchData();
    }, []);

    const updateState = (obj: Partial<conn>) => {
        console.log('called updateState');
        setConnection(prevState => ({ ...prevState, ...obj }));
    };

    return { connection, updateState };
};
