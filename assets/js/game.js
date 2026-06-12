const gaertner = document.getElementById("gaertner");
const pflanze = document.getElementById("pflanze");
const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

let jumping = false;
let score = 0;
let pflanzePosition = 600;
let gameRunning = true;

// Springen
document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {
        jump();
    }

    if (!gameRunning && event.key.toLowerCase() === "r") {
        location.reload();
    }

});

function jump() {

    if (jumping) return;

    jumping = true;

    let position = 0;

    const up = setInterval(() => {

        if (position >= 150) {

            clearInterval(up);

            const down = setInterval(() => {

                if (position <= 0) {

                    clearInterval(down);
                    jumping = false;

                } else {

                    position -= 5;
                    gaertner.style.bottom = position + "px";

                }

            }, 20);

        } else {

            position += 5;
            gaertner.style.bottom = position + "px";

        }

    }, 20);
}

// Pflanze bewegen
const pflanzeMove = setInterval(() => {

    if (!gameRunning) return;

    pflanzePosition -= 6;

    if (pflanzePosition < -50) {

        pflanzePosition = 800;
        score++;

        scoreText.textContent = "Punkte: " + score;
    }

    pflanze.style.right = (800 - pflanzePosition) + "px";

}, 20);

// Kollision prüfen
const collision = setInterval(() => {

    const gaertnerBottom =
        parseInt(window.getComputedStyle(gaertner).bottom);

    const pflanzeLeft =
        pflanze.getBoundingClientRect().left;

    const gaertnerLeft =
        gaertner.getBoundingClientRect().left;

    if (
        pflanzeLeft < gaertnerLeft + 50 &&
        pflanzeLeft > gaertnerLeft &&
        gaertnerBottom < 50
    ) {

        gameRunning = false;

        gameOver.style.display = "block";

        clearInterval(pflanzeMove);
        clearInterval(collision);
    }

}, 20);