let input = document.getElementById("typing-area");
let Timetext = document.getElementById("timer");
let WPMtext = document.getElementById("wpm");
let Accuracytext = document.getElementById("accuracy");
let Message = document.getElementById("message");
let startButton = document.getElementById("start-button");

let sentence = "The quick brown fox jumps over the lazy dog while an old, rusty clock chimes softly in the distance. Developing a smooth typing rhythm requires you to keep your wrists slightly elevated and your fingers resting gently on the home row keys. Do not rush to finish quickly; instead, focus entirely on hitting every letter, comma, and period with complete accuracy. As your muscle memory grows stronger, your speed will naturally increase without any extra effort.";
let time = 60;
let timer = null;
let started = false;

function calculateStats() {
    const typedText = input.value;
    let correctChars = 0;

    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === sentence[i]) {
            correctChars++;
        }
    }

    const accuracy = typedText.length ? Math.round((correctChars / typedText.length) * 100) : 0;
    const elapsedSeconds = 60 - time;
    
    // Prevent division by zero or negative values
    const wpm = elapsedSeconds > 0 ? Math.round((typedText.length / 5) / (elapsedSeconds / 60)) : 0;

    WPMtext.innerText = wpm;
    Accuracytext.innerText = accuracy;
    
    return { wpm, accuracy };
}

function endGame() {
    started = false;
    clearInterval(timer);
    input.disabled = true;
    startButton.disabled = false;
    Message.innerText = "Time's up!";
}

function startGame() {
    if (!started) {
        started = true;
        input.disabled = false;
        input.value = "";
        input.focus();
        time = 60;
        Timetext.innerText = time;
        WPMtext.innerText = 0;
        Accuracytext.innerText = 0;
        Message.innerText = "Start typing!";
        startButton.disabled = true;

        timer = setInterval(function () {
            time--;
            Timetext.innerText = time;
            if (time <= 0) {
                endGame();
            }
        }, 1000);
    }
}

input.addEventListener("input", function () {
    if (!started) return;

    const stats = calculateStats();
    const typedText = input.value;

    if (typedText === sentence) {
        clearInterval(timer);
        input.disabled = true;
        startButton.disabled = false;
        started = false;
      
        Message.innerText = "Game over! WPM: " + stats.wpm + " | Accuracy: " + stats.accuracy + "%";
    }
});

function resetGame() {
    started = false;
    clearInterval(timer);
    input.disabled = true;
    input.value = "";
    Timetext.innerText = 60;
    WPMtext.innerText = 0;
    Accuracytext.innerText = 0;
    Message.innerText = "Game reset. Click 'Start Game' to play again!";
    startButton.disabled = false;
}
