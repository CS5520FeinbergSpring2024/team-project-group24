
import { sendOffer } from './requests';
import {
    RTCPeerConnection, mediaDevices,
} from 'react-native-webrtc';

export async function createOutboundConnection(token: string): Promise<[RTCPeerConnection, RTCDataChannel]> {
    return new Promise(async (resolve, reject) => {
        console.log('creating outbound connection');
        const PC_CONFIG = {
            iceServers: [
                {
                    urls: 'stun:stun.l.google.com:19302',
                    username: 'cd3a6694-4839-47a0-9bf3-1722c4fc2071',
                },
            ],
        };
        const peer = new RTCPeerConnection(PC_CONFIG);
        console.log('store RTC function occurred');

        try {
            let stream = await mediaDevices.getUserMedia({ audio: true });
            console.log('Stream Defined\nObtained MediaStream:', stream);
            peer.addTrack(stream.getAudioTracks()[0], stream);

            // resolve([peer, channel]);
        } catch (error) {
            console.error('Error obtaining media stream:', error);
        }

        let channel: RTCDataChannel;
        try {
            channel = peer.createDataChannel('datachannel', { ordered: true });
            console.log('Data channel created', channel);
            // Set up event handlers for data channel
            channel.onopen = (ev: any) => {
                console.log('Data channel opened', ev);
            };
            channel.onmessage = (ev: any) => {
                console.log('Received message:', ev.data);
            };
            channel.onclose = (ev: any) => {
                console.log('Data channel closed', ev);
            };
            channel.onerror = (ev: any) => {
                console.error('Data channel error:', ev.error);
            };
        } catch (error) {
            console.error('Error creating data channel:', error);
        }

        peer.createOffer({ offerToReceiveAudio: true }).then((offer) => {
            peer.setLocalDescription(offer);
        });

        console.log('connection: ', peer.connectionState);

        function logConnectionState() {
            console.log('Connection state: ' + peer.connectionState);
        }
        const intervalId = setInterval(logConnectionState, 10000);

        (peer as any).onicecandidate = async () => {
            if (peer.iceGatheringState === 'complete') {
                let sdp = peer.localDescription;
                if (sdp !== null) {
                    console.log('spd not null');
                    const type = sdp.type ?? '';
                    let answer = await sendOffer(token, sdp.sdp, type);
                    await peer.setRemoteDescription(answer);
                    resolve([peer, channel]);
                    console.log('answer: ', answer);
                    clearInterval(intervalId);
                }
            }
        };
    });
}

