const canvas = document.getElementById('canvas-test');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', () => {
	game.start(); 
  startBtn.classList.add("hidden");
});
document.addEventListener('keydown', (event)=>{
    game.player.directions(event)
  })
  document.addEventListener('keyup', (event)=>{
    game.player.directions(event)
  })

