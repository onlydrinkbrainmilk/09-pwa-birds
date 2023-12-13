const app = new PIXI.Application({ background: '#A9E5E5', resizeTo: window });
document.body.appendChild(app.view);

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
app.view.addEventListener('click', (event) => {
  // console.log('app click event', event)
  console.log(event.clientX, event.clientY);
  shuffleArray(textures);
  const character = new PIXI.Sprite(textures[0]);
character.anchor.set(0.5);
character.scale.set(0.2);
character.x = event.clientX
character.y = event.clientY
app.stage.addChild(character);
  
  
    // const mousePosition = app.renderer.plugins.interaction.mouse.global;

    // const newBirdSprite = new PIXI.Sprite(textures[Math.floor(Math.random() * textures.length)]);
    // newBirdSprite.anchor.set(0.5);
    // newBirdSprite.scale.set(0.5);
    // newBirdSprite.position.set(mousePosition.x, mousePosition.y);
    // app.stage.addChild(newBirdSprite);
});

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
});

app.ticker.add(() => {
    character.rotation += 0.02;
});