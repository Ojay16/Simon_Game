$(document).ready(function () {
    alert("Welcome to Simon Game!\n\nInstructions:\n1. Click the 'Start' button to begin.\n2. Simon will show a sequence by lighting up color buttons.\n3. Repeat the sequence by clicking the buttons in the correct order.\n4. Each successful round adds a new color to the sequence.\n5. If you make a mistake, the game will end.\n\nGood luck and have fun!");

    let buttonColours = ["red", "blue", "green", "yellow"];

    let gamePattern = [];
    let userClickedPattern = [];

    // Detects when Button is clicked, when that happens for the first time, call nextSequence().
    let start = false;
    let level = 0;

    $(".start-btn").on("click", function () {
        if (!start) {
            $("#level-title").text("Level " + level);
            nextSequence();
            start = true;
            $(".start-btn").hide();
        }
    });

    // Checks which button is pressed and store it.
    $(".btn").click(function () {
        let userChosenColour = this.id;
        userClickedPattern.push(userChosenColour);

        checkAnswer(userClickedPattern.length - 1);

        animatePress(userChosenColour);

        playSound(userChosenColour);


    });

    // Check if users input follows the right sequence.
    function checkAnswer(currentLevel) {
        if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
            console.log("success");

            if (userClickedPattern.length === gamePattern.length) {
                setTimeout(function () {
                    nextSequence();
                }, 1000);

            }

        } else {
            console.log("wrong");
            wrongInput();

        }
    }


    // Generates random numbers from 1 to 3.
    function nextSequence() {
        userClickedPattern = [];

        // increases the level by 1 every time nextSequence() is called.
        level++;

        // update the h1 with this change in the value of level.

        $("#level-title").text("Level " + level);


        let randomNumber = Math.floor(Math.random() * 4);

        // Accesses random colors from array with randomly generated numbers
        let randomChosenColour = buttonColours[randomNumber];

        gamePattern.push(randomChosenColour);

        // Flashes the randomly selected colour.
        $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

        playSound(randomChosenColour);
    }

    // Plays the corresponding audio file of generated colour
    function playSound(name) {
        let audio = new Audio("./sounds/" + name + ".mp3");
        audio.play();
    }

    // Adds animation to selected the button with the specified ID.
    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");

        // Removes the "pressed" class after a short delay.
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
        }, 100);
    }

    function wrongInput() {
        // plays sound to let user know they are wrong.
        playSound("wrong");
        // flashes red background color.
        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        // Changes h1 text.
        $("#level-title").text("Game Over! Press Restart To Try Again");
        $(".start-btn").show();
        $(".start-btn").text("Restart");
        startOver();
    }

    function startOver() {
        start = false;
        gamePattern = [];
        level = 0;

    }
});
