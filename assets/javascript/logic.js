// Initialize Firebase
var config = {
     apiKey: "AIzaSyCuXydZXCuefblfuZRVrAZvQlo1y6vunYE",
     authDomain: "train-f6fc1.firebaseapp.com",
     databaseURL: "https://train-f6fc1.firebaseio.com",
     projectId: "train-f6fc1",
     storageBucket: "train-f6fc1.appspot.com",
     messagingSenderId: "781804056998"
   };
firebase.initializeApp(config);
var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var convertedFirstTrainTimec= "";
var minutesSinceFirstTrainTime = 0;
var remainder = 0;
var minutesAway = 0;
var arrivalTime = "";

 $("#addTrain").on("click", function(event) {
   // Don't refresh the page!
   event.preventDefault();
   trainName = $("#trainName").val().trim();
   destination = $("#destination").val().trim();
   firstTrainTime = $("#firstTrainTime").val().trim();
   frequency = $("#frequency").val().trim();

   database.ref().push({
     trainName: trainName,
     destination: destination,
     firstTrainTime: firstTrainTime,
     frequency: frequency,
     dateAdded: firebase.database.ServerValue.TIMESTAMP
   });
   $(".form-control").val("");
   alert("Train sucessfully added.");
 });

database.ref().on("child_added", function(childSnapshot) {

  convertedFirstTrainTime = moment(childSnapshot.val().firstTrainTime, "LT").subtract(1, "years");
  minutesSinceFirstTrainTime = moment().diff(convertedFirstTrainTime, "minutes");
  remainder = parseInt(minutesSinceFirstTrainTime) % childSnapshot.val().frequency;
  minutesAway = childSnapshot.val().frequency - remainder;
  arrivalTime = moment().add(minutesAway, "minutes").format("LT");

 
  $("#tableBody").append("<tr><td id='name'>" + childSnapshot.val().trainName + "</td><td id='trainDestination'>" + childSnapshot.val().destination
      + "</td><td id='trainFrequency'>" + childSnapshot.val().frequency + "</td><td id= 'nextArrival'>" + arrivalTime +
      "</td><td id= 'minutesAway'>" + minutesAway + "</td></tr>");
  }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
});