  //MY CODE SEEMS TO APPEN ONCE FOR EACH ITEM THATS IN MY DATABASE AND I'M NOT SURE WHY
  //I think i need to use data.get() but I cant figure out how :/
  
    var config = {
      apiKey: "AIzaSyAs6-QTWDDCrHm1X5VWZp4b-Uv96M2vxso",
      authDomain: "train-activity-e260d.firebaseapp.com",
      databaseURL: "https://train-activity-e260d.firebaseio.com",
      projectId: "train-activity-e260d",
      storageBucket: "train-activity-e260d.appspot.com",
      messagingSenderId: "232983642981"
    };
  firebase.initializeApp(config);

  var data = firebase.database();

    var firstTime = 0;;
    var trainName = "";
    var frequency = 0;
    var destination = "";
    var nextTrain = 0;
    var tMinutesTillTrain = 0;

    //on click for add train
    $("#submit-button").on("click", function(event) {
      console.log("hello")
      event.preventDefault();
//was here
    $("#table-body").empty();

      // Grabbed values from text boxes
      firstTime = $("#first-time").val().trim();
      trainName = $("#train-name").val().trim();
      frequency = $("#frequency").val().trim();
      destination = $("#destination").val().trim();

      var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
      console.log(firstTimeConverted);

      // Current Time
      var currentTime = moment();
      console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

      // Difference between the times
      var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
      console.log("DIFFERENCE IN TIME: " + diffTime);

      // Time apart (remainder)
      var tRemainder = diffTime % frequency;
      console.log(tRemainder);

      // Minute Until Train
      var tMinutesTillTrain = frequency - tRemainder;
      console.log(tMinutesTillTrain)
      console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

      // push to database
      data.ref().push({
        FirstTime: firstTime,
        trainName: trainName,
        frequency: frequency,
        destination: destination,
        minutesTill: tMinutesTillTrain,
      });

      //When chil is added make new row and apple to #table-body
      data.ref().on("child_added", function(childSnapshot) {

        $("#table-body").empty();

        var tableRow = $("<tr>");
        var nameTh = $("<th>").text(childSnapshot.val().trainName);
        var destinationTh = $("<th>").text(childSnapshot.val().destination);
        var frequencyTh = $("<th>").text(childSnapshot.val().frequency);
        var arrivalTh = $("<th>").text(moment().add(childSnapshot.val().minutesTill, "minutes"))
        var minutesTh = $("<th>").text(childSnapshot.val().minutesTill)
        
        tableRow.append(nameTh);
        tableRow.append(destinationTh);
        tableRow.append(frequencyTh);
        tableRow.append(arrivalTh);
        tableRow.append(minutesTh);
        
        $("#table-body").append(tableRow); 
        

        // Handle the errors
      }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
      });
  

    });


    
    
    
