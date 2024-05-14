document.addEventListener('DOMContentLoaded', function () {
    const gameContainer = document.querySelector('.game-container');
    const player = document.querySelector('.player');
  
    let isGameOver = false;
    let shootingInterval;
  
    function movePlayer(event) {
      if (!isGameOver) {
        const x = event.clientX;
        const containerLeft = gameContainer.offsetLeft;
        const containerWidth = gameContainer.offsetWidth;
        const playerWidth = player.offsetWidth;
  
        let newX = x - containerLeft - playerWidth / 2;
        newX = Math.max(0, Math.min(newX, containerWidth - playerWidth));
  
        player.style.left = newX + 'px';
      }
    }
  
    document.addEventListener('mousemove', movePlayer);
  
    function shoot() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        const playerRect = player.getBoundingClientRect();
        bullet.style.left = playerRect.left + player.offsetWidth / 2 + 'px';
        bullet.style.top = playerRect.top + 'px';
        gameContainer.appendChild(bullet);
      
        const shootingInterval = setInterval(() => {
          const bulletRect = bullet.getBoundingClientRect();
          bullet.style.top = bulletRect.top - 10 + 'px';
      
          const obstacles = document.querySelectorAll('.obstacle');
          obstacles.forEach((obstacle) => {
            const obstacleRect = obstacle.getBoundingClientRect();
            if (
              bulletRect.bottom >= obstacleRect.top &&
              bulletRect.top <= obstacleRect.bottom &&
              bulletRect.right >= obstacleRect.left &&
              bulletRect.left <= obstacleRect.right
            ) {
              clearInterval(shootingInterval);
              bullet.remove();
              obstacle.remove();
            }
          });
      
          if (bulletRect.top <= 0) {
            clearInterval(shootingInterval);
            bullet.remove();
          }
        }, 20);
      }
      
    document.addEventListener('keydown', (event) => {
      if (event.key === ' ') {
        shoot();
      }
    });
  
    function createObstacle() {
        if (!isGameOver) {
          const obstacle = document.createElement('div');
          obstacle.classList.add('obstacle');
          const containerWidth = gameContainer.offsetWidth;
          const obstacleWidth = 50; // Ancho de los obstáculos fijo
          const maxLeft = containerWidth - obstacleWidth;
          const left = Math.floor(Math.random() * maxLeft);
          obstacle.style.left = left + 'px';
      
          gameContainer.appendChild(obstacle);
      
          const fallInterval = setInterval(() => {
            if (!isGameOver) {
              const top = obstacle.offsetTop;
              obstacle.style.top = top + 10 + 'px';
      
              if (top > gameContainer.offsetHeight) {
                clearInterval(fallInterval);
                obstacle.remove();
              }
      
              const playerRect = player.getBoundingClientRect();
              const obstacleRect = obstacle.getBoundingClientRect();
      
              if (
                playerRect.bottom >= obstacleRect.top &&
                playerRect.top <= obstacleRect.bottom &&
                playerRect.right >= obstacleRect.left &&
                playerRect.left <= obstacleRect.right
              ) {
                gameOver();
              }
            } else {
              clearInterval(fallInterval);
            }
          }, 50);
        }
      }
      
  
    function gameOver() {
      isGameOver = true;
      alert('love love');
    }
  
    setInterval(createObstacle, 2000); // Create obstacles every 2 seconds
  });
  