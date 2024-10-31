let playerPaddle;
let computerPaddle;
let ball;
let paddleWidth = 10;
let paddleHeight = 80;
let ballSize = 15;
let ballSpeedX;
let ballSpeedY;
let borderThickness = 5;

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

    // Draw top and bottom borders
    rect(0, 0, width, borderThickness); // Top border
    rect(0, height - borderThickness, width, borderThickness); // Bottom border

    // Player paddle movement
    if (keyIsDown(UP_ARROW)) {
        playerPaddle.y -= 5;
    }
    if (keyIsDown(DOWN_ARROW)) {
        playerPaddle.y += 5;
    }

    // Constrain player paddle to canvas
    playerPaddle.y = constrain(playerPaddle.y, borderThickness, height - paddleHeight - borderThickness);

    // Ball movement
    ball.x += ballSpeedX;
    ball.y += ballSpeedY;

    // Ball collision with top and bottom borders
    if (ball.y - ballSize / 2 < borderThickness || ball.y + ballSize / 2 > height - borderThickness) {
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

    // Intelligent movement for computer paddle
    let speed = 4; // Base speed for the computer paddle
    if (abs(computerPaddle.y + paddleHeight / 2 - ball.y) > 10) { // Move only if ball is far enough
        if (computerPaddle.y + paddleHeight / 2 < ball.y) {
            computerPaddle.y += speed;
        } else if (computerPaddle.y + paddleHeight / 2 > ball.y) {
            computerPaddle.y -= speed;
        }
    }

    // Constrain computer paddle to canvas
    computerPaddle.y = constrain(computerPaddle.y, borderThickness, height - paddleHeight - borderThickness);
}

function resetBall() {
    ball = createVector(width / 2, height / 2);
    ballSpeedX = random(3, 4) * (random(1) > 0.5 ? 1 : -1);
    ballSpeedY = random(2, 3) * (random(1) > 0.5 ? 1 : -1);
}

function moveComputerPaddle() {
    // Set computer target to ball's position
}
