import { CSS3DObject } from './libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js';
//"../libs/three.js-r132/examples/jsm/renderers/CSS3DRenderer.js"

const THREE = window.MINDAR.IMAGE.THREE;

document.addEventListener("DOMContentLoaded", () => {
    async function startAR() {
        const mindArThreejs = new window.MINDAR.IMAGE.MindARThree({
            container: document.body,
            imageTargetSrc: "../assets/targets/bisnesscard.mind"
        });
        const { cssRenderer, renderer, cssScene, scene, camera } = mindArThreejs;

        const div = new CSS3DObject(document.querySelector("#ar-example"));

        const anchor = mindArThreejs.addCSSAnchor(0);

        anchor.group.add(div);

        // Dynamically load the YouTube Iframe API
        loadYouTubeAPI().then(() => {
            // Initialize the YouTube player after the API is loaded
            const youtubePlayer = new YT.Player('youtube-video', {
                videoId: 'aLxDoq6Mpmc',  // Replace with the actual YouTube video ID
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }).catch((error) => {
            console.error("YouTube API failed to load", error);
        });

        await mindArThreejs.start();

        renderer.setAnimationLoop(render);

        function render() {
            cssRenderer.render(cssScene, camera);
        }
    }

    startAR();
});

function loadYouTubeAPI() {
    return new Promise((resolve, reject) => {
        if (typeof YT !== 'undefined' && YT.Player) {
            resolve(); // Already loaded
        } else {
            window.onYouTubeIframeAPIReady = () => {
                resolve(); // API is ready
            };

            const script = document.createElement('script');
            script.src = "https://www.youtube.com/iframe_api";
            script.onerror = (error) => {
                console.error("Failed to load YouTube API:", error);
                reject(error);
            };
            document.head.appendChild(script);
        }
    });
}



// Define the onPlayerStateChange function to handle different player states
function onPlayerStateChange(event) {
    switch (event.data) {
        case YT.PlayerState.PLAYING:
            console.log("Video is playing");
            break;
        case YT.PlayerState.PAUSED:
            console.log("Video is paused");
            break;
        case YT.PlayerState.ENDED:
            console.log("Video ended");
            break;
        default:
            console.log("Other state", event.data);
    }
}

// Define the onPlayerReady function
function onPlayerReady(event) {
    event.target.playVideo(); // Auto-play when the player is ready
}
