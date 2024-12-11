import React, { useState } from 'react';

const AudioRecorder = ({ onSave }) => {
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [audioURL, setAudioURL] = useState(null);
    const [isRecording, setIsRecording] = useState(false);

    const startRecording = async (e) => {
        e.preventDefault(); // Prevent form submission
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);

            recorder.ondataavailable = (e) => {
                const audioBlob = new Blob([e.data], { type: 'audio/webm' });
                const url = URL.createObjectURL(audioBlob);
                setAudioURL(url);
                onSave(audioBlob);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = (e) => {
        e.preventDefault(); // Prevent form submission
        if (mediaRecorder) {
            mediaRecorder.stop();
            setIsRecording(false);
        }
    };

    return (
        <div>
            {isRecording ? (
                <button className="btn btn-danger" onClick={stopRecording}>
                    Stop Recording
                </button>
            ) : (
                <button className="btn btn-primary" onClick={startRecording}>
                    Start Recording
                </button>
            )}
            {audioURL && (
                <div>
                    <h5 className="mt-3">Recorded Audio:</h5>
                    <audio controls src={audioURL}></audio>
                </div>
            )}
        </div>
    );
};

export default AudioRecorder;
