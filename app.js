var previewElement = document.getElementById('preview');
var startButton = document.getElementById('startRecord');
var stopButton = document.getElementById('stopRecord');
var saveButton = document.getElementById('saveRecord');
var previewButton = document.getElementById('previewRecord'); // Add this line
var recorder;

startButton.addEventListener('click', function() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
    .then(function(stream) {
        previewElement.srcObject = stream;
        recorder = RecordRTC(stream, {
            type: 'video',
            mimeType: 'video/webm',
            video: {
                width: 640,
                height: 480,
            },
            audio: true,
        });
        recorder.startRecording();
        startButton.disabled = true;
        stopButton.disabled = false;
        saveButton.disabled = true;
        previewButton.disabled = true; // Disable preview button while recording
    })
    .catch(function(error) {
        console.error('getUserMedia error: ', error);
    });
});

stopButton.addEventListener('click', function() {
    recorder.stopRecording(function() {
        previewElement.srcObject = null;
        startButton.disabled = false;
        stopButton.disabled = true;
        saveButton.disabled = false;
        previewButton.disabled = false; // Enable preview button after recording
    });
});

// Add a click event listener to the preview button
previewButton.addEventListener('click', function() {
    var blob = recorder.getBlob();
    var url = URL.createObjectURL(blob);
    previewElement.src = url;
    previewElement.play();
});