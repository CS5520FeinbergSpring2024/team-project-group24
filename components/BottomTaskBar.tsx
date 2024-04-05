import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {PulseIndicator, BallIndicator} from 'react-native-indicators';
import {PermissionsAndroid} from 'react-native';
import {sendOffer} from '../webrtcConnection/requests';
import {useConnection} from '../webrtcConnection/store';
import {createOutboundConnection} from '../webrtcConnection/webrtc';
import {mediaDevices} from 'react-native-webrtc';

const screenHeight = Dimensions.get('window').height;

// const screenWidth = Dimensions.get('window').width;

const BottomTaskBar = ({
  recordActive,
  setRecordActive,
}: {
  recordActive: boolean;
  setRecordActive: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // The backend was established by a coworker, but utilized svelte. This conversion back to
  // react native and integration was done by myself
  // Establish webrtc states
  const [ans, setAns] = useState<any[]>([]);
  const [webrtc, setWebrtc] = useState<RTCPeerConnection | null>(null);
  const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordingStartTime, setRecordingStartTime] = useState<Date | null>(
    null,
  );
  const [elapsedTime, setElapsedTime] = useState('00:00');
  const {connection, updateState} = useConnection();
  const {backendAvailable, token} = connection;

  const handleStart = async () => {
    try {
      // if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      //   console.error('getUserMedia is not supported in this environment');
      //   return;
      // }
      console.log('handleStart activated');
      if (backendAvailable) {
        console.log('backend is available');

        try {
          if (navigator.mediaDevices) {
            const audioStream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            setStream(audioStream);

            // Continue with your code...
          } else {
            console.log('navigator.mediaDevices is not available');
          }
        } catch (error) {
          console.error('Error occurred while starting:', error);
        }

        const [rtcPeerConnection, rtcDataChannel] =
          await createOutboundConnection(token);
        setWebrtc(rtcPeerConnection);
        setDataChannel(rtcDataChannel);
        rtcDataChannel.onopen = () => {
          rtcDataChannel.onmessage = event => {
            console.log('We received a message: ', event.data);
            const messageObject = JSON.parse(event.data);
            const threshold = 0.5;
            setAns(currentMessages => {
              if (currentMessages.length > 0) {
                const lastCurrentMessage =
                  currentMessages[currentMessages.length - 1];
                if (
                  Math.abs(messageObject.start - lastCurrentMessage.start) <
                  threshold
                ) {
                  return [...currentMessages.slice(0, -1), messageObject];
                } else if (messageObject.start < lastCurrentMessage.start) {
                  return currentMessages;
                }
              }
              return [...currentMessages, messageObject];
            });
          };
        };
        updateState({webrtc: true});
        updateElapsedTime();
        setRecordingStartTime(new Date());
        console.log('elapsed time: ', elapsedTime);
      }
    } catch (error) {
      console.error('Error occurred while starting:', error);
    }
  };

  function handleStop() {
    if (webrtc) {
      webrtc.close();
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setAns([]);
    setRecordingStartTime(null);
    setElapsedTime('00:00');
  }

  function updateElapsedTime() {
    console.log('recordingStartTime: ', recordingStartTime);
    if (recordingStartTime) {
      console.log('recordingStartTime = true');
      const now = new Date();
      const diff = now.getTime() - recordingStartTime.getTime();
      const seconds = Math.floor(diff / 1000) % 60;
      const minutes = Math.floor(diff / 60000);
      setElapsedTime(
        `${minutes.toString().padStart(2, '0')}:${seconds
          .toString()
          .padStart(2, '0')}`,
      );
      setTimeout(updateElapsedTime, 1000);
    }
  }
  // --------------------------------------------------------------------------

  // Handle permissions
  const handleRecordPress = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'App needs access to your microphone to record audio.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Microphone permission granted');
        setRecordActive(true);
        console.log('Microphone active', recordActive);
        // Perform recording here
        handleStart();
      } else {
        console.log('Microphone permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleFinishPress = async () => {
    setRecordActive(false);
    handleStop();
  };

  return (
    <View style={[styles.mainContainer, styles.screenBottom]}>
      <Text> {elapsedTime}</Text>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleRecordPress}>
        <View style={styles.buttonContent}>
          <Image style={styles.image} source={require('../assets/mic.png')} />
          <Text style={styles.buttonText}>Record</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/vocabulary.png')}
          />
          <Text style={styles.buttonText}>Cards</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/keypad.png')}
          />
          <Text style={styles.buttonText}>Type</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonContainer}
        onPress={handleFinishPress}>
        {recordActive ? (
          <View style={styles.recordingIndicator}>
            <PulseIndicator color="#000000" />
          </View>
        ) : (
          <View style={styles.finishButton}>
            <Image
              style={styles.finishImage}
              source={require('../assets/check.png')}
            />
          </View>
        )}
        <Text style={styles.finishButtonText}>Finish</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/save-outline.png')}
          />
          <Text style={styles.buttonText}>Saved</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image
            style={styles.image}
            source={require('../assets/rotate-ccw.png')}
          />
          <Text style={styles.buttonText}>Restore</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonContainer}>
        <View style={styles.buttonContent}>
          <Image style={styles.image} source={require('../assets/trash.png')} />
          <Text style={styles.buttonText}>Clear</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: '#F7F7F7',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: screenHeight * 0.11,
    paddingHorizontal: 5,
    paddingVertical: 12,
  },
  screenBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonContainer: {
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    width: 45,
  },
  image: {
    marginTop: 10,
    resizeMode: 'contain',
  },
  buttonText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 15,
  },
  finishButton: {
    alignItems: 'center',
  },
  recordingIndicator: {
    paddingBottom: 10,
  },
  finishImage: {
    marginTop: 5,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  finishButtonText: {
    fontSize: 12,
    color: '#000000',
    marginTop: 5,
    marginBottom: 6,
  },
});

export default BottomTaskBar;
