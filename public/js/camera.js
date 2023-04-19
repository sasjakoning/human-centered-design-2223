
async function handleCamera() {
    
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const snap = document.getElementById('snap');
    
    const constraints = {
        video: true
    };
    
    // Define an async function that will be called when the page loads
    async function init() {
        try {
            // Ask the user for permission to use the webcam
            console.log(navigator.mediaDevices)
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            // If the user accepts, call the handleSuccess function
            handleSuccess(stream);
        } catch (e) {
            console.error('Error: ', e);
        }
    }
    
    // Define a function that will be called when the user accepts the webcam
    function handleSuccess(stream) {
        window.stream = stream;
        console.log(stream)
        video.srcObject = stream;
    }
    
    // Add an event listener to the button "Take a photo"
    snap.addEventListener("click", function () {
        // Draw the video frame to the canvas
        console.log(video)
        canvas.getContext("2d").drawImage(video, 70, 0, 160, 160);
    });
    
    // Call the init function when the window loads
    init();
}

async function closeCamera() {
    const video = document.getElementById('video');
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(function(track) {
        track.stop();
    });
    video.srcObject = null;
}

export default { handleCamera, closeCamera }