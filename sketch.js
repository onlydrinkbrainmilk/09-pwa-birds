const app = new PIXI.Application({ background: '#A9E5E5', resizeTo: window });
document.body.appendChild(app.view);
let playChirp;

const backgroundTexture = PIXI.Texture.from('./images/map.png'); 
const backgroundSprite = new PIXI.Sprite(backgroundTexture);
backgroundSprite.width = app.screen.width;
backgroundSprite.height = app.screen.height;
app.stage.addChild(backgroundSprite);

const textures = [];
for (let i = 1; i <= 12; i++) {
    const texture = PIXI.Texture.from(`./images/bird${i}.png`);
    textures.push(texture);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// const mouseTraceSprite = new PIXI.Sprite(textures[0]);
// mouseTraceSprite.anchor.set(0.5);
// mouseTraceSprite.scale.set(0.5);
// app.stage.addChild(mouseTraceSprite);

// Listen for the mouse click within the PIXI canvas
const player = new Tone.Player({
    url: "./images/chirp1.mp3",
    onload: () => {
        // The audio file is loaded and decoded
        app.view.addEventListener('click', (event) => {
            shuffleArray(textures);
            const character = new PIXI.Sprite(textures[0]);
            character.anchor.set(0.5);
            character.scale.set(0.2);
            character.x = event.clientX;
            character.y = event.clientY;
            app.stage.addChild(character);

            // Start playing the audio when clicked
            player.start();
        });
    },
    autostart: true // Autostart playback once the audio is loaded
}).toMaster();
  




  
    // const mousePosition = app.renderer.plugins.interaction.mouse.global;

    // const newBirdSprite = new PIXI.Sprite(textures[Math.floor(Math.random() * textures.length)]);
    // newBirdSprite.anchor.set(0.5);
    // newBirdSprite.scale.set(0.5);
    // newBirdSprite.position.set(mousePosition.x, mousePosition.y);
    // app.stage.addChild(newBirdSprite);


// const character = new PIXI.Sprite(textures[0]);
// character.anchor.set(0.5);
// character.scale.set(0.5);
// character.x = app.screen.width / 2;
// character.y = app.screen.height / 2;
// app.stage.addChild(character);

character.interactive = true;
character.buttonMode = true;

let currentTextureIndex = 0;
character.on('pointertap', () => {
    currentTextureIndex = (currentTextureIndex + 1) % textures.length;
    character.texture = textures[currentTextureIndex];
    playChirp()
});


app.ticker.add(() => {
    character.rotation += 0.02;
});


// const audioBuffers = [];
// const audioContext = new AudioContext();
// // Array of sound file paths
// const soundFiles = [
//   './images/chirp1.mp3',
//   './images/chirp2.mp3',
//   './images/chirp3.mp3'
//   // Add more sound file paths as needed
// ];

// // Function to preload sound files
// // function loadSound(url) {
// //     return fetch(url)
// //       .then((response) => response.arrayBuffer())
// //       .then((buffer) => audioContext.decodeAudioData(buffer));
// //   }
  
//   // Preload all sound files and store them in an array of audio buffers
  
//   Promise.all(soundFiles.map(loadSound))
//     .then((buffers) => {
//       audioBuffers.push(...buffers);
  
//       // Listen for the mouse click within the PIXI canvas
//       app.view.addEventListener('click', () => {
//         // Get a random sound buffer from the loaded array
//         const randomSoundBuffer = audioBuffers[Math.floor(Math.random() * audioBuffers.length)];
  
//         if (randomSoundBuffer) {
//           const source = audioContext.createBufferSource();
//           source.buffer = randomSoundBuffer;
//           source.connect(audioContext.destination);
//           source.start(0);
//         }
//         // Rest of your click event handling code...
//       });
//     })
//     .catch((error) => {
//       console.error('Error loading sound files:', error);
//     });
// // app.view.addEventListener('click', () => {
// //   if (audioBuffer) {
// //     const source = audioContext.createBufferSource();
// //     source.buffer = audioBuffer;
// //     source.connect(audioContext.destination);
// //     source.start(0);
// //   }

// // });
