$(document).ready(function () {
    var options = [
        {
            question: "What is the name of Darth Vader's Super Star Destroyer?",
            choice: ["Devastator", "Executor", "Invisible Hand", "Resurgence"],
            answer: 1,
            photo: "assets/images/SSD.png"
        },
        {
            question: "What race is Spock a member of?",
            choice: ["Human", "Klingon", "Vulcan", "Grabon"],
            answer: 2,
            photo: "assets/images/spock.jpg"
        },
        {
            question: "What kind of ship does Lone Star fly in Spaceballs?",
            choice: ["Delorean", "Winnebago", "Blockade Runner", "Flying Saucer"],
            answer: 1,
            photo: "assets/images/Spaceballs.jpg"
        },
        {
            question: "Who is the Captain of the Enterprise-D?",
            choice: ["Jean-Luc Picard", "William Riker", "James T. Kirk", "Bones McCoy"],
            answer: 0,
            photo: "assets/images/picard.jpg"
        },
        {
            question: "What is the length of an Imperial-I class Star Destroyer?",
            choice: ["1000m", "1500m", "1600m", "2000m"],
            answer: 2,
            photo: "assets/images/ISD.jpg"
        },
        {
            question: "Who is Dark Helmet's right hand man?",
            choice: ["Colonel Sandurz", "Major Payne", "Darph Nader", "Barf"],
            answer: 0,
            photo: "assets/images/SpaceballsSandurz.jpg"
        },
        {
            question: "Who is the lead actor in Galaxy Quest?",
            choice: ["William Shatner", "Peter Cushing", "Gary Busey", "Tim Allen"],
            answer: 3,
            photo: "assets/images/timallen.jpg"
        },
        {
            question: "What planet does the film Avatar take place on?",
            choice: ["Romulus", "Pandora", "Anatolia", "Krypton"],
            answer: 1,
            photo: "assets/images/Pandora.jpg"
        },
        {
            question: "What is the core doctrine of the Sith Order?",
            choice: ["World Domination", "The Truman Doctrine", "The Rule of Two", "Good is Dumb"],
            answer: 2,
            photo: "assets/images/SidiousVaderPromo.jpg"
        },
        {
            question: "Which Star Trek film features both Captain Kirk and Captain Picard?",
            choice: ["First Contact", "Insurrection", "Into Darkness", "Generations"],
            answer: 3,
            photo: "assets/images/enterpriseD.jpg"
        },
        {
            question: "What level of hyperspeed did Spaceball One achieve while pursuing Lone Star?",
            choice: ["Warp Speed", "Impressive Speed", "Ludicrous Speed", "Not Too Shabby Speed"],
            answer: 2,
            photo: "assets/images/ludicrousspeed.jpg"
        },
        {
            question: "Which of the following is a character in the spoof film Hardware Wars?",
            choice: ["Fluke Starbucker", "Ham Salad", "Chewchilla the Wookie Monster", "All of the Above"],
            answer: 3,
            photo: "assets/images/hardwarewars.jpg"
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    var wins = 0;
    var losses = 0;



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        runTimer();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        
        displayQuestion();

    })

    //timer function
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h5>Time remaining: " + timer + "</h5>");
        timer--;

        //stop timer  0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        $("#questionblock").html("<h5>" + pick.question + "</h5>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p id='correct'>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p id='wrong'>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }

    function winOrLoss() {
        if (correctCount > wrongCount) {
            wins++
            $("#questionblock").html("<h3>Game Over!  You Win! </h3>");
            $("#answerblock").append("<h5> Correct: " + correctCount + "</h5>");
            $("#answerblock").append("<h5> Incorrect: " + wrongCount + "</h5>");
            $("#answerblock").append("<h5> Unanswered: " + unanswerCount + "</h5>");
            $("#reset").show();
            $("#wins").html("Wins: " + wins);

        } else if (wrongCount > correctCount) {
            losses++
            $("#questionblock").html("<h3>Game Over!  You Lose! </h3>");
            $("#answerblock").append("<h5> Correct: " + correctCount + "</h5>");
            $("#answerblock").append("<h5> Incorrect: " + wrongCount + "</h5>");
            $("#answerblock").append("<h5> Unanswered: " + unanswerCount + "</h5>");
            $("#reset").show();
            $("#losses").html("Losses: " + losses);
        }
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 20;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === 5) {
                $("#questionblock").empty();

                winOrLoss();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

});