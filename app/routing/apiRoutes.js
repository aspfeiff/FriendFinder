
var friendList = require("../data/friends.js");

module.exports = function(app){

  app.get("/api/friends", function(req,res){
    res.json(friendList);
  });

  app.post("/api/friends", function(req,res){

    var friendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    for(var i=0; i<friendList.length; i++){

      var scoreComp = 0;
      
      for(var j=0; j<friendScores.length; j++){

        scoreComp += (Math.abs(parseInt(friendList[i].scores[j]) - parseInt(friendScores[j])));
      }

      scoresArray.push(scoresComp);
    }

    for(var i=0; i<scoresArray.length; i++){

      if(scoresArray[i] <= scoresArray[bestMatch]){

        bestMatch = i;
      }
    }

    var friendMatch = friendList[bestMatch];
    res.json(friendMatch);

    friendList.push(req.body);
  });
};