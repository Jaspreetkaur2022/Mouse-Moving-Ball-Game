document.addEventListener("DOMContentLoaded", function () {
    const player = document.querySelector('.player');
    const gameContainer = document.querySelector('.game-container');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');

    let score = 0;
    let time = 60;

    // Update the timer every second
    const timerInterval = setInterval(function () {
        time--;
        timerElement.textContent = time + ' seconds';

        if (time === 0) {
            clearInterval(timerInterval);
            alert('Game over! Your final score: ' + score);
            resetGame();
        }
    }, 1000);

    gameContainer.addEventListener('mousemove', function (event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const playerX = mouseX - player.clientWidth / 2;
        const playerY = mouseY - player.clientHeight / 2;

        player.style.transform = `translate(${playerX}px, ${playerY}px)`;

        checkCollision();
    });

    function checkCollision() {
        const playerRect = player.getBoundingClientRect();

        // Check collision with each block
        document.querySelectorAll('.block').forEach(block => {
            const blockRect = block.getBoundingClientRect();

            if (
                playerRect.left < blockRect.right &&
                playerRect.right > blockRect.left &&
                playerRect.top < blockRect.bottom &&
                playerRect.bottom > blockRect.top
            ) {
                // Collision detected, increase score and reposition the block
                score++;
                scoreElement.textContent = score;
                repositionBlock(block);
            }
        });
    }

    function repositionBlock(block) {
        const maxX = gameContainer.clientWidth - block.clientWidth;
        const maxY = gameContainer.clientHeight - block.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        block.style.left = randomX + 'px';
        block.style.top = randomY + 'px';
    }

    function resetGame() {
        score = 0;
        time = 60;
        scoreElement.textContent = score;
        timerElement.textContent = time + ' seconds';

        // Reset player position
        player.style.transform = 'translate(0, 0)';

        // Reposition each block
        document.querySelectorAll('.block').forEach(block => {
            repositionBlock(block);
        });

        // Restart the timer
        setInterval(timerInterval);
    }
});
