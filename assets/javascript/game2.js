$(document).ready(function() {

    function goHome(){
        createPageLayout();
        $("#content").html('<p><img id="starWarsLogo" src="assets/images/StarWarsLogo.png"></p>');
        $("#content").append("<p><h1>Jedi's vs. Sith Lords</h1></p><br>");

        var playButton = $("<button>");
        playButton.text("Play");
        playButton.addClass("btn btn-default btn-lg homeButtons");
        playButton.attr("id","playButton");
        playButton.on("click",function(){
            chooseJedi()
        });
        $("#content").append(playButton);

        var instructionsButton = $("<button>");
        instructionsButton.text("Instructions");
        instructionsButton.addClass("btn btn-default btn-lg homeButtons");
        instructionsButton.attr("id","instructionsButton");
        instructionsButton.on("click",function(){
            goInstructions()
        });
        $("#content").append(instructionsButton);
    }
    function goInstructions(){
        createPageLayout();
    }
    function chooseJedi(){
        createPageLayout();
        $("body").css({'background-image':'url(assets/images/jedi_background.jpg)'});

        var jedis = {
            "LukeSkyWalker" : { id:"LukeSkyWalker", name: "Luke Skywalker", hp: "150", ap: "7", iap: "7"},
            "Yoda" : { id:"Yoda", name: "Yoda", hp: "130", ap: "9", iap: "9"},
            "ObiWanKenobi" : { id:"ObiWanKenobi", name: "Obi-Wan Kenobi", hp: "110", ap: "10", iap: "10"},
            "QuiGonJinn" : { id:"QuiGonJinn", name: "Qui-Gon Jinn", hp: "90", ap: "12", iap: "12"}
        }

        var jedisArray = ["LukeSkyWalker","Yoda","ObiWanKenobi","QuiGonJinn"]

        var sithLordArray = ["EmperorPalpatine","DarthVader","CountDooku","DarthMaul"]

        $("#content").html("<div><h1>Select a Jedi</h1></div>");
        

        for(i=0;i<jedisArray.length;i++){
            var button = $("<button>");
            button.attr("id",jedisArray[i]);
            button.addClass("btn btn-default btn-lg jediButton");
            button.on("click",function(){
                var jedi = this.id
                $("#content").append("<div><h1>May the force be with you, "+jedis[jedi].name +".</h1></div>");
                setTimeout(function(){chooseSithLord(jedis[jedi], sithLordArray)},3000);
            });
            $("#content").append(button);
            ;
        }
    }
    function chooseSithLord(jedi, sithLordArray){
        createPageLayout();
        $("body").css({'background-image':'url(assets/images/sith_background.png)'});

        var sithLords = {
            "EmperorPalpatine" : { id: "EmperorPalpatine", name: "Emperor Palpatine", hp: "150", ap: "70", defeated: false},
            "DarthVader" : { id: "DarthVader", name: "Darth Vader", hp: "130", ap: "9", defeated: false},
            "CountDooku" : { id: "CountDooku", name: "Count Dooku", hp: "110", ap: "10", defeated: false},
            "DarthMaul" : { id: "DarthMaul", name: "Darth Maul", hp: "90", ap: "12", defeated: false}
        }

        var numArray = ["final","third","second","first"];
        $("#content").html("<div><h1>Select your " + numArray[sithLordArray.length-1] +  " opponent</h1></div>");

        for(i=0;i<sithLordArray.length;i++){
            var button = $("<button>");
            button.attr("id",sithLordArray[i]);
            button.addClass("btn btn-default btn-lg sithButton");
            button.on("click",function(){
                var sith = this.id;
                sithLordArray.splice($.inArray(sith, sithLordArray),1);
                $("#content").append("<div><h1>You have chosen, "+sithLords[sith].name +".</h1></div>");
                setTimeout(function(){goBattleRoyale(jedi, sithLords[sith], sithLordArray)},3000);
            });
            $("#content").append(button);
        } 
    }
    function goBattleRoyale(chosenJedi, sithLord, sithLordArray){
        createPageLayout();
        $("body").css({'background-image':'url(assets/images/battleRoyale.png)'});

        var button = $("<button>");
        button.attr("id",chosenJedi.id);
        button.text("Health Points:"+ chosenJedi.hp)
        button.addClass("btn btn-default btn-lg jediButton");
        button.css("color","#7FFF00");

        $("#content").append(button);

        $("#content").append("<span id='vs'>vs.</span>");

        var button = $("<button>");
        button.attr("id",sithLord.id);
        button.text("Health Points:"+ sithLord.hp)
        button.addClass("btn btn-default btn-lg sithButton");
        button.css("color","#7FFF00");
        $("#content").append(button);

        var button = $("<button>");
        button.attr("id","attack");
        button.addClass("btn btn-default btn-lg");
        button.text("Attack")
        button.on("click",function(){
            attack(chosenJedi, sithLord, sithLordArray);
        });
        $("#content").append($("<div>").append(button));
    }
    function attack(chosenJedi, chosenSithLord, sithLordArray){
        chosenSithLord.hp = parseInt(chosenSithLord.hp) - parseInt(chosenJedi.ap)
        chosenJedi.hp = parseInt(chosenJedi.hp) - parseInt(chosenSithLord.ap)
        chosenJedi.ap = parseInt(chosenJedi.ap) + parseInt(chosenJedi.iap)

        $("#" + chosenJedi.id).text("Health Points:"+ chosenJedi.hp);
        $("#" + chosenSithLord.id).text("Health Points:"+ chosenSithLord.hp);
        
        if(chosenJedi.hp < 1) {
            goGameOver("Lose");       
        }

        if(chosenSithLord.hp < 1) {
            if(sithLordArray.length === 0){
                goGameOver("Win"); 
            }
            else{
                chooseSithLord(chosenJedi, sithLordArray);
            }
        }
    }
    function goGameOver(outcome){
        createPageLayout();
        $("#content").html("<div><h1>Game Over</h1></div>")
        $("#content").append("<div><h1>You " +outcome + "!</h1></div>")
        $("#content").append('<div><iframe width="560" height="315" src="https://www.youtube.com/embed/OzK6K0-9RwM" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe></div>')
        
        var playButton = $("<button>");
        playButton.text("Play Again");
        playButton.addClass("btn btn-default btn-lg");
        playButton.attr("id","playButton");
        playButton.on("click",function(){
            chooseJedi()
        });
        $("#content").append(playButton);
    }
    function createPageLayout(){
        $(".container").text("");
        
        var column = $("<div>");
        column.addClass("col-md-12");
        column.attr("id","content");

        var row = $("<div>");
        row.addClass("row");
        $(row).append(column);

        $(".container").append(row);
    }

    goHome();

})

    



















//     var audio = new Audio("https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3");
//     audio.play();

//     function chooseJedi(jediChoice){
//         var jedis = {
//             "LukeSkyWalker" : { id:"LukeSkyWalker", name: "Luke Skywalker", hp: "150", ap: "7", iap: "7"},
//             "Yoda" : { id:"Yoda", name: "Yoda", hp: "130", ap: "9", iap: "9"},
//             "ObiWanKenobi" : { id:"ObiWanKenobi", name: "Obi-Wan Kenobi", hp: "110", ap: "10", iap: "10"},
//             "QuiGonJinn" : { id:"QuiGonJinn", name: "Qui-Gon Jinn", hp: "90", ap: "12", iap: "12"}
//         }
//         var jedi = jedis[jediChoice];
        
//         $("#content").text("");

        
//         $("#content").append($("<div>").append($("<h1>").text("You have chosen:")));
//         var button = $("<button>");
//         button.attr("id",jediChoice);
//         $("#content").append($("<div>").append(button));
//         $("#content").append($("<div>").append($("<h1>").append(jedi.name)));
//         $("#content").append($("<div>").append("May the force be with you"));

//         $("#content").append($("<div>").append($("<h1>").text("Select your first enemy:")));

//         var sithLordArray = ["EmperorPalpatine","DarthVader","CountDooku","DarthMaul"]
//         for(i=0;i<sithLordArray.length;i++){
//             var button = $("<button>");
//             button.attr("id",sithLordArray[i]);
//             button.on("click",function(){
//                 chooseEnemy(this.id, jedi);
//             });
//             $("#content").append(button);
//         } 
        
//     }

//     function chooseEnemy(sithLordchoice,jedi){
//         

//         var sithLord = sithLords[sithLordchoice];

//         $("#content").text("");

//         var button = $("<button>");
//         button.attr("id",jedi.id);
//         $("#content").append(button);

//         $("#content").append($("<h1>").text("vs."));

//         var button = $("<button>");
//         button.attr("id",sithLord.id);
//         $("#content").append(button);


//         var button = $("<button>");
//         button.attr("id","attack");
//         button.text("attack")
//         button.on("click",function(){
//             attack(sithLord, jedi);
//         });
//         $("#content").append($("<div>").append(button));

//     }

//     function attack(sithLord,jedi){
        
//         sithLord.hp = parseInt(sithLord.hp) - parseInt(jedi.ap)
//         jedi.hp = parseInt(jedi.hp) - parseInt(sithLord.ap)
//         jedi.ap = parseInt(jedi.ap) + parseInt(jedi.iap)

//         $("#content").append($("<div>").append("jedi health: "+ jedi.hp));
//         $("#content").append($("<div>").append("jedi attack power: "+ jedi.ap));
//         $("#content").append($("<div>").append("sith lord health: "+ sithLord.hp));

//         if(jedi.hp < 1) {
//             alert("You Lose!")
//             $("#content").text("refresh to play again");
//         }

//         if(sithLord.hp < 1) {
//             alert("You Beat "+ sithLord.name + "!")
            
//         }
//     }
    
//     $("#button1").on("click",function(){
//         var jedisArray = ["LukeSkyWalker","Yoda","ObiWanKenobi","QuiGonJinn"]

//         $("body").css({'background-image':'url(assets/images/star-wars-background2.png)'});
//         $("#content").text("");
//         $("#content").append($("<div>").append($("<h1>").text("Choose a Jedi")));

//         for(i=0;i<jedisArray.length;i++){
//             var button = $("<button>");
//             button.attr("id",jedisArray[i]);
//             button.on("click",function(){
//                 chooseJedi(this.id);
//             });
//             $("#content").append(button);
//             ;
//         }
        
//     });

    


// })


// // var starWarsDiv = $("<div>");
// // starWarsDiv.attr('id','star-wars');

// // var crawlDiv = $("<div>");
// // crawlDiv.attr('id','crawl');
// // var title = $("<h1>")
// // title.text = "Instructions"
// // var instructions = "When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game. The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen. The player chooses an opponent by clicking on an enemy's picture. Once the player selects an opponent, that enemy is moved to a defender area. The player will now be able to click the attack button. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture. The player will keep hitting the attack button in an effort to defeat their opponent. When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below. When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game. The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen. The player chooses an opponent by clicking on an enemy's picture. Once the player selects an opponent, that enemy is moved to a defender area. The player will now be able to click the attack button. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture. The player will keep hitting the attack button in an effort to defeat their opponent. When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.";

// // crawlDiv.append(instructions);

// // $("#content").append(starWarsDiv);
// // $("#content").css("margin","auto");
// // $("#content").append(starWarsDiv);

// // starWarsDiv.append(crawlDiv);