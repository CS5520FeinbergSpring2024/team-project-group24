
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
                },
            ],
        };
        const peer = new RTCPeerConnection(PC_CONFIG);
        console.log('store RTC function occurred');

        try {
            const stream = await mediaDevices.getUserMedia({ audio: true });
            console.log('Stream Defined\nObtained MediaStream:', stream);
            peer.addTrack(stream.getAudioTracks()[0], stream);
        } catch (error) {
            console.error('Error obtaining media stream:', error);
        }

        // if (stream !== undefined) {
        //     console.log('Stream is not undefined');
        //     peer.addTrack(stream.getAudioTracks()[0], stream);
        // }

        const channel = peer.createDataChannel('datachannel', { ordered: true });
        channel.onopen = (ev: Event) => {
            console.log('data channel opened', ev);
        };

        peer.createOffer({ offerToReceiveAudio: true }).then((offer) => {
            peer.setLocalDescription(offer);
        });

        peer.onconnectionstatechange = () => {
            console.log('connection state changed to ' + peer.connectionState);
        };

        peer.onicecandidate = async (event) => {
            if (peer.iceGatheringState === 'complete') {
                let sdp = peer.localDescription;
                if (sdp !== null) {
                    let answer = await sendOffer(token, sdp.sdp, sdp.type);
                    await peer.setRemoteDescription(answer);
                    resolve([peer, channel]);
                }
            }
        };
    });
}
