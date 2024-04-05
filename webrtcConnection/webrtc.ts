import { useRef } from 'react';
import { sendOffer } from './requests';
import {
    RTCPeerConnection,
    MediaStreamTrack,
    mediaDevices,
} from 'react-native-webrtc';

export async function createOutboundConnection(token: string, stream?: MediaStream): Promise<[RTCPeerConnection, RTCDataChannel]> {
    return new Promise((resolve, reject) => {
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
        console.log('Stream val:', stream);

        if (stream !== undefined) {
            peer.addTrack(stream.getAudioTracks()[0], stream);
        }

        const channel = peer.createDataChannel('datachannel', { ordered: true });
        channel.onopen = () => {
            console.log('data channel opened');
        };

        peer.createOffer().then((offer) => {
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
