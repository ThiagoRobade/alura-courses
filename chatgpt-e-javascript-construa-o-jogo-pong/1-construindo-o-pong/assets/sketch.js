let playerPaddle;
let computerPaddle;
let ball;
let paddleWidth = 10;
let paddleHeight = 80;
let ballSize = 15;
let ballSpeedX;
let ballSpeedY;

function setup() {
    createCanvas(600, 400);
    playerPaddle = createVector(10, height / 2 - paddleHeight / 2);
    computerPaddle = createVector(width - 20, height / 2 - paddleHeight / 2);
    resetBall();
}

function draw() {
    background(0);
    
    // Draw paddles
    rect(playerPaddle.x, playerPaddle.y, paddleWidth, paddleHeight);
    rect(computerPaddle.x, computerPaddle.y, paddleWidth, paddleHeight);

    // Draw ball
    ellipse(ball.x, ball.y, ballSize);

    // Player paddle movement
    if (keyIsDown(UP_ARROW)) {
        playerPaddle.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        playerPaddle.y += 5;
    }

    // Constrain player paddle to canvas
    playerPaddle.y = constrain(playerPaddle.y, 0, height - paddleHeight);

    // Ball movement
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ball.y < 0 || ball.y > height) {
        ballSpeedY *= -1;
    }

    // Ball collision with player paddle
    if (ball.x - ballSize / 2 < playerPaddle.x + paddleWidth &&
        ball.y > playerPaddle.y &&
        ball.y < playerPaddle.y + paddleHeight) {
        ballSpeedX *= -1;
        moveComputerPaddle();
    }

    // Ball collision with computer paddle
    if (ball.x + ballSize / 2 > computerPaddle.x &&
        ball.y > computerPaddle.y &&
        ball.y < computerPaddle.y + paddleHeight) {
        ballSpeedX *= -1;
    }

    // Ball out of bounds (left or right side)
    if (ball.x < 0 || ball.x > width) {
        resetBall();
    }

    // Move computer paddle toward random position
    if (computerPaddle.y < computerTargetY) {
        computerPaddle.y += 3;
    } else if (computerPaddle.y > computerTargetY) {
        computerPaddle.y -= 3;
    }

    // Constrain computer paddle to canvas
    computerPaddle.y = constrain(computerPaddle.y, 0, height - paddleHeight);
}

function resetBall() {
    ball = createVector(width / 2, height / 2);
    ballSpeedX = random(3, 4) * (random(1) > 0.5 ? 1 : -1);
    ballSpeedY = random(2, 3) * (random(1) > 0.5 ? 1 : -1);
}

let computerTargetY;
function moveComputerPaddle() {
    computerTargetY = random(height - paddleHeight);
}
