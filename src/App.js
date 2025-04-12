import React, { useEffect, useState } from 'react';
import {
  StreamVideo,
  StreamVideoClient,
  StreamCall,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  Video,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';
import '@stream-io/video-react-sdk/dist/css/styles.css';

const apiKey = '38jem57dj4av';
const client = new StreamVideoClient({ apiKey });

const generateRandomUserId = () => 'user-' + Math.random().toString(36).substring(2, 8);

const App = () => {
  const [userId] = useState(generateRandomUserId);
  const [callId, setCallId] = useState('');
  const [token, setToken] = useState(null);
  const [call, setCall] = useState(null);

  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants();

  // Fetch token
  useEffect(() => {
    if (!userId || !callId) return;

    const fetchToken = async () => {
      try {
        const response = await fetch(`http://localhost:3002/generate-token?userId=${userId}`);
        const data = await response.json();
        setToken(data.token);
      } catch (err) {
        console.error('Token fetch failed:', err);
      }
    };

    fetchToken();
  }, [userId, callId]);

  // Set up call
  useEffect(() => {
    if (!token || !callId) return;

    const setupCall = async () => {
      try {
        await client.connectUser({ id: userId }, token);
        const newCall = client.call('default', callId);  // 👈 custom callId here
        await newCall.getOrCreate();
        setCall(newCall);
      } catch (err) {
        console.error('Call setup failed:', err);
      }
    };

    setupCall();
  }, [token, userId, callId]);

  // Show form to enter Call ID
  if (!callId) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Enter Call Room ID</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          if (callId.trim()) setCallId(callId.trim());
        }}>
          <input
            type="text"
            placeholder="e.g. team-meeting"
            value={callId}
            onChange={(e) => setCallId(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: '10px' }}>Join Call</button>
        </form>
      </div>
    );
  }

  // Show loading state
  if (!call) return <div>Joining <strong>{callId}</strong> as <strong>{userId}</strong>...</div>;

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <StreamTheme>
        <div style={{ padding: '10px', textAlign: 'center' }}>
    <strong>You are: {userId}</strong><br />
    <strong>Call ID: {callId}</strong><br />
    Participants: {participants.length}
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {participants.map((p) => (
        <li key={p.sessionId}>{p.user?.id || 'Unknown User'}</li>
      ))}
    </ul>
  </div>

  {/* 👇 Your Local Video Stream */}
{call?.state?.localParticipant && (
  <Video participant={call.state.localParticipant} />
)}

  {/* 👇 Other Participants */}
  <SpeakerLayout />

  <CallControls />
        </StreamTheme>
      </StreamCall>
    </StreamVideo>
  );
};

export default App;
