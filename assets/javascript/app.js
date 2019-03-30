$(document).ready(function () {
    var options = [
        {
            question: "Pupusas, handmade thick stuffed corn tortillas, are a traditional dish from what country?", 
            choice: ["Ethiopia", "El Salvadore", "Peru", "Guatamala"],
            answer: 1,
            //photo: "assets/images/pupusas.jpg"
         },
         {
             question: "What popular soda beverage was originally developed as a mixer for whiskey?", 
            choice: ["Mountain Dew", "Sprite", "7-UP", "Coke"],
            answer: 0,
            //photo: "assets/images/mtdew.gif"
         }, 
         {
             question: "Kopi luwak is a very expensive type of what?", 
            choice: ["Spice", "Caviar", "Coffee", "Rice variety" ],
            answer: 2,
            //photo: "assets/images/coffee.gif"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
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
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer function
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
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
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
    //	if (pick.shown) {
    //		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
    //		displayQuestion();
    //	} else {
    //		console.log(pick.question);
            //iterate through answer array and display
            $("#questionblock").html("<h5>" + pick.question + "</h5>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p id='correct'>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p id='wrong'>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }

    function winOrLoss () {
        if (correctCount > wrongCount)  {
            wins++
            $("#questionblock").html("<h3>Game Over!  You Win! </h3>");
            $("#answerblock").append("<h5> Correct: " + correctCount + "</h5>" );
            $("#answerblock").append("<h5> Incorrect: " + wrongCount + "</h5>" );
            $("#answerblock").append("<h5> Unanswered: " + unanswerCount + "</h5>" );
            $("#reset").show();
            $("#wins").html("Wins: " + wins);
            
        } else if (wrongCount > correctCount) {
            losses++
            $("#questionblock").html("<h3>Game Over!  You Lose! </h3>");
            $("#answerblock").append("<h5> Correct: " + correctCount + "</h5>" );
            $("#answerblock").append("<h5> Incorrect: " + wrongCount + "</h5>" );
            $("#answerblock").append("<h5> Unanswered: " + unanswerCount + "</h5>" );
            $("#reset").show();
            $("#losses").html("Losses: " + losses);
        }
    }
    
    
    function hidepicture () {
        //$("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#timeleft").hide();
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
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    });