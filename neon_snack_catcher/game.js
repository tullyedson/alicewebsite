const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const assets = {
    fox: new Image(),
    blueberry: new Image(),
    watermelon: new Image(),
    glitch: new Image()
};

assets.fox.src = 'assets/fox.png';
assets.blueberry.src = 'assets/blueberry.png';
assets.watermelon.src = 'assets/watermelon.png';
assets.glitch.src = 'assets/glitch.png';

let score = 0;
let gameOver = false;
const player = { x: 368, y: 500, width: 64, height: 64 };
const entities = [];

function spawnEntity() {
    const types = ['blueberry', 'watermelon', 'glitch'];
    const type = types[Math.floor(Math.random() * types.length)];
    entities.push({
        type,
        x: Math.random() * (canvas.width - 32),
        y: -32,
        width: 32,
        height: 32,
        speed: 2 + Math.random() * 3
    });
}

function update() {
    if (gameOver) return;
    
    for (let i = entities.length - 1; i >= 0; i--) {
        const e = entities[i];
        e.y += e.speed;
        if (e.y > canvas.height) {
            entities.splice(i, 1);
            continue;
        }
        
        // AABB Collision Detection
        if (player.x < e.x + e.width && player.x + player.width > e.x &&
            player.y < e.y + e.height && player.y + player.height > e.y) {
            if (e.type === 'glitch') {
                gameOver = true;
            } else {
                score += e.type === 'watermelon' ? 10 : 5;
                entities.splice(i, 1);
            }
        }
    }
    
    if (Math.random() < 0.02) spawnEntity();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw Player
    ctx.drawImage(assets.fox, player.x, player.y, player.width, player.height);
    
    // Draw Entities
    entities.forEach(e => ctx.drawImage(assets[e.type], e.x, e.y, e.width, e.height));
    
    // UI
    ctx.fillStyle = '#00f2ff';
    ctx.font = '24px monospace';
    ctx.fillText(`Score: ${score}`, 20, 40);
    
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#ff0055';
        ctx.textAlign = 'center';
        ctx.fillText('GLITCHED OUT!', canvas.width/2, canvas.height/2);
        ctx.fillStyle = 'white';
        ctx.font = '16px monospace';
        ctx.fillText('Refresh to try again', canvas.width/2, canvas.height/2 + 40);
    } else {
        update();
    }
    
    requestAnimationFrame(draw);
}

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = e.clientX - rect.left - root.scrollLeft;
    player.x = mouseX - player.width / 2;
    
    // Keep in bounds
    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
});

// Start game when main asset is loaded
assets.fox.onload = () => requestAnimationFrame(draw);