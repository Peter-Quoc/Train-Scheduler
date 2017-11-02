$(document).ready(function () {

		// Initialize Firebase
	var config = {
	  	apiKey: "AIzaSyDCk0aZbu5i3oFApFl2f_mbjTvzTx9aqos",
	  	authDomain: "fir-hw7-train-schedule.firebaseapp.com",
	  	databaseURL: "https://fir-hw7-train-schedule.firebaseio.com",
	  	projectId: "fir-hw7-train-schedule",
	  	storageBucket: "",
	  	messagingSenderId: "357868159591"
	};
	firebase.initializeApp(config);

	var database = firebase.database();
	var numOfCols = 5;

	database.ref().on("child_added", function(snapshot, prevChildKey){
		event.preventDefault();
		var newTrain = snapshot.val();
		
		var TimeConverted = moment(newTrain.UIFirstTrainTime, "hh:mm").subtract(1, "years");
		var currentTime = moment(currentTime).format("hh:mm a");
		var diffInTime = moment().diff(moment(TimeConverted), "minutes");
		var TimeRemaining = diffInTime % newTrain.UIFrequency;
		var TimeTilArrival = newTrain.UIFrequency - TimeRemaining
		var nextTrain = moment().add(TimeTilArrival, "minutes")

		TrainDataArray = [];
		TrainDataArray.push(newTrain.UITrainName);
		TrainDataArray.push(newTrain.UIDestination);
		TrainDataArray.push(newTrain.UIFrequency + " minutes");
		TrainDataArray.push(moment(nextTrain).format("hh:mm a"));
		TrainDataArray.push(TimeTilArrival + " minutes away");

	
		// TrainDataArray.push(newTrain.minutes)

		var tableRow = $("<tr>");

		for(var i = 0; i < numOfCols; i++) {
			var tableData = $("<td>");
			tableData.html(TrainDataArray[i])
			tableRow.append(tableData);
		};
		$(".TableData").append(tableRow);
	});

	$(".submit").on("click", function(event){
		event.preventDefault();

		var TrainName = $("#TrainName").val().trim();
		var Destination = $("#Destination").val().trim();
		var FirstTrainTime = $("#FirstTrainTime").val().trim();
		var Frequency = $("#Frequency").val().trim();

			//UI means User Input....
		database.ref().push({
			UITrainName: TrainName,
			UIDestination: Destination,
			UIFirstTrainTime: FirstTrainTime,	
			UIFrequency: Frequency	
		});

		$("#TrainName").val("");
		$("#Destination").val("");
		$("#FirstTrainTime").val("");
		$("#Frequency").val("");

	});

});