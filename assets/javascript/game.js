$(document).ready(function() {
    var audio = new Audio("https://archive.org/download/StarWarsThemeSongByJohnWilliams/Star%20Wars%20Theme%20Song%20By%20John%20Williams.mp3");
    audio.play();

    function chooseJedi(jediChoice){
        var jedis = {
            "LukeSkyWalker" : { id:"LukeSkyWalker", name: "Luke Skywalker", hp: "150", ap: "7", iap: "7"},
            "Yoda" : { id:"Yoda", name: "Yoda", hp: "130", ap: "9", iap: "9"},
            "ObiWanKenobi" : { id:"ObiWanKenobi", name: "Obi-Wan Kenobi", hp: "110", ap: "10", iap: "10"},
            "QuiGonJinn" : { id:"QuiGonJinn", name: "Qui-Gon Jinn", hp: "90", ap: "12", iap: "12"}
        }
        var jedi = jedis[jediChoice];
        
        $("#content").text("");

        
        $("#content").append($("<div>").append($("<h1>").text("You have chosen:")));
        var button = $("<button>");
        button.attr("id",jediChoice);
        $("#content").append($("<div>").append(button));
        $("#content").append($("<div>").append($("<h1>").append(jedi.name)));
        $("#content").append($("<div>").append("May the force be with you"));

        $("#content").append($("<div>").append($("<h1>").text("Select your first enemy:")));

        var sithLordArray = ["EmperorPalpatine","DarthVader","CountDooku","DarthMaul"]
        for(i=0;i<sithLordArray.length;i++){
            var button = $("<button>");
            button.attr("id",sithLordArray[i]);
            button.on("click",function(){
                chooseEnemy(this.id, jedi);
            });
            $("#content").append(button);
        } 
        
    }

    function chooseEnemy(sithLordchoice,jedi){
        var sithLords = {
            "EmperorPalpatine" : { id: "EmperorPalpatine", name: "Emperor Palpatine", hp: "150", ap: "70", defeated: false},
            "DarthVader" : { id: "DarthVader", name: "Darth Vader", hp: "130", ap: "9", defeated: false},
            "CountDooku" : { id: "CountDooku", name: "Count Dooku", hp: "110", ap: "10", defeated: false},
            "DarthMaul" : { id: "DarthMaul", name: "Darth Maul", hp: "90", ap: "12", defeated: false}
        }

        var sithLord = sithLords[sithLordchoice];

        $("#content").text("");

        var button = $("<button>");
        button.attr("id",jedi.id);
        $("#content").append(button);

        $("#content").append($("<h1>").text("vs."));

        var button = $("<button>");
        button.attr("id",sithLord.id);
        $("#content").append(button);


        var button = $("<button>");
        button.attr("id","attack");
        button.text("attack")
        button.on("click",function(){
            attack(sithLord, jedi);
        });
        $("#content").append($("<div>").append(button));

    }

    function attack(sithLord,jedi){
        
        sithLord.hp = parseInt(sithLord.hp) - parseInt(jedi.ap)
        jedi.hp = parseInt(jedi.hp) - parseInt(sithLord.ap)
        jedi.ap = parseInt(jedi.ap) + parseInt(jedi.iap)

        $("#content").append($("<div>").append("jedi health: "+ jedi.hp));
        $("#content").append($("<div>").append("jedi attack power: "+ jedi.ap));
        $("#content").append($("<div>").append("sith lord health: "+ sithLord.hp));

        if(jedi.hp < 1) {
            alert("You Lose!")
            $("#content").text("refresh to play again");
        }

        if(sithLord.hp < 1) {
            alert("You Beat "+ sithLord.name + "!")
            
        }
    }
    
    $("#button1").on("click",function(){
        var jedisArray = ["LukeSkyWalker","Yoda","ObiWanKenobi","QuiGonJinn"]

        $("body").css({'background-image':'url(assets/images/star-wars-background2.png)'});
        $("#content").text("");
        $("#content").append($("<div>").append($("<h1>").text("Choose a Jedi")));

        for(i=0;i<jedisArray.length;i++){
            var button = $("<button>");
            button.attr("id",jedisArray[i]);
            button.on("click",function(){
                chooseJedi(this.id);
            });
            $("#content").append(button);
            ;
        }
        
    });

    


})


// var starWarsDiv = $("<div>");
// starWarsDiv.attr('id','star-wars');

// var crawlDiv = $("<div>");
// crawlDiv.attr('id','crawl');
// var title = $("<h1>")
// title.text = "Instructions"
// var instructions = "When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game. The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen. The player chooses an opponent by clicking on an enemy's picture. Once the player selects an opponent, that enemy is moved to a defender area. The player will now be able to click the attack button. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture. The player will keep hitting the attack button in an effort to defeat their opponent. When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below. When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game. The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen. The player chooses an opponent by clicking on an enemy's picture. Once the player selects an opponent, that enemy is moved to a defender area. The player will now be able to click the attack button. Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture. The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture. The player will keep hitting the attack button in an effort to defeat their opponent. When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent. The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.";

// crawlDiv.append(instructions);

// $("#content").append(starWarsDiv);
// $("#content").css("margin","auto");
// $("#content").append(starWarsDiv);

// starWarsDiv.append(crawlDiv);