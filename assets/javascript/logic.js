// Initialize Firebase
 var config = {
   apiKey: "AIzaSyD13YdcFv5MY3HsXyrb15Vilc3ozOA4e3Y",
   authDomain: "employee-database-73407.firebaseapp.com",
   databaseURL: "https://employee-database-73407.firebaseio.com",
   projectId: "employee-database-73407",
   storageBucket: "",
   messagingSenderId: "639409642676"
 };
 firebase.initializeApp(config);
 var database = firebase.database();
 var trainName = "";
 var destination = "";
 var firstTrainTime = "";
 var frequency = 0;

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