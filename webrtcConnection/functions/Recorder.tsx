import {useState, useEffect} from 'react';
import {sendOffer} from './requests';
import {conn} from './store';

let webrtc: RTCPeerConnection;
let dataChannel: RTCDataChannel;
let stream: MediaStream;
let recordingStartTime: Date | null = null;
let elapsedTime: string = '00:00';

const [ans, setAns] = useState<any[]>([]);

export async function createOutboundConnection(token: string) {
  // Implementation of createOutboundConnection depends on the library used for WebRTC in React Native
  // You'll need to use a library like react-native-webrtc and follow its documentation
}

export function handleStart() {
  // Your logic for handling the start event
}

export function handleStop() {
  webrtc.close();
  stream.getTracks().forEach(track => track.stop());
  setAns([]);
  recordingStartTime = null;
  elapsedTime = '00:00';
}

export function updateElapsedTime() {
  if (recordingStartTime) {
    const now = new Date();
    const diff = now.getTime() - recordingStartTime.getTime();
    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / 60000);
    elapsedTime = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
    setTimeout(updateElapsedTime, 1000);
  }
}
