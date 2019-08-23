$(document).ready(function () {
    var correctCount = 0;
    var wrongCount = 0;
    var unansweredCount = 0;
    var wins = 0;
    var losses = 0;
    var timer = 20;
    var intervalId;
    var userGuess = "";
    var running = false;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
   

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
            question: "Which of the following is a character in the spoof film Hardware Wars?",
            choice: ["Fluke Starbucker", "Ham Salad", "Chewchilla the Wookie Monster", "All of the Above"],
            answer: 3,
            photo: "assets/images/hardwarewars.jpg"
        }];

    



    $("#reset").hide();
    
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
        $("#answer").empty();
        $("#question").empty();
        runTimer();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        
        displayQuestion();

    })

    
    //timer countdown
    function decrement() {
        timer--;
        $("#timeleft").html("<h5>Time remaining: " + timer + "</h5>");
        

        //stop timer  0
        if (timer === 0) {
            unansweredCount++;
            stop();
            $("#answer").html("<p id='time-up'>Time's up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer function
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    
    function displayQuestion() {
        
        index = Math.floor(Math.random() * options.length);
        pick = options[index];

        $("#timeleft").html("<h5>Time remaining: " + timer + "</h5>");

        $("#question").html("<h5>" + pick.question + "</h5>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            
            userChoice.attr("data-guessvalue", i);
            $("#answer").append(userChoice);
            
        }



        $(".answerchoice").on("click", function () {
            
            userGuess = parseInt($(this).attr("data-guessvalue"));

            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answer").html("<p id='correct'>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answer").html("<p id='wrong'>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }

    function winLoss() {
        if (correctCount > wrongCount) {
            wins++
            $("#question").html("<h3>Game Over!  You Win! </h3>");
            $("#answer").append("<h5> Correct: " + correctCount + "</h5>");
            $("#answer").append("<h5> Incorrect: " + wrongCount + "</h5>");
            $("#answer").append("<h5> Unanswered: " + unansweredCount + "</h5>");
            $("#reset").show();
            $("#wins").html("Wins: " + wins);

        } else if (wrongCount > correctCount) {
            losses++
            $("#question").html("<h3>Game Over!  You Lose! </h3>");
            $("#answer").append("<h5> Correct: " + correctCount + "</h5>");
            $("#answer").append("<h5> Incorrect: " + wrongCount + "</h5>");
            $("#answer").append("<h5> Unanswered: " + unansweredCount + "</h5>");
            $("#reset").show();
            $("#losses").html("Losses: " + losses);
        }
    }


    function hidepicture() {
        $("#answer").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answer").empty();
            timer = 20;

            
            if ((wrongCount + correctCount + unansweredCount) === 5) {
                $("#question").empty();

                winLoss();
                correctCount = 0;
                wrongCount = 0;
                unansweredCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

});