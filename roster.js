var teamMembers = ['Dimitri','Oli','Ben','Martin','Chantelle','Audrey','Jerry','Hardeep'],
roster = [],
j = 0,
teamCount = teamMembers.length;

//Create weekly roster and assign a member of the team to the roster
for(i=1; i <= 52; i++){
	roster.push({
		week:i,
		teamMember:teamMembers[j]
	});
	j++;
	
	//Reset push
	if(j == teamCount) j = 0;
}

//Checks the schedule 
function checkPostSchedule(rosterType) {
	var date = new Date().getDate(), 
		month = new Date().getMonth(), 
		year = new Date().getFullYear(), 
		myFormattedDate,
		weekNumber,
		canvas = document.getElementById("rosterCanvas"),
		j = 0;

	month++;  
	myFormattedDate = year+"/"+month+"/"+date;
	weekNumber = getWeekNumber(myFormattedDate) - 1;
	nextWeekNumber = getWeekNumber(myFormattedDate);
	
	if(rosterType == "thisWeek"){
		canvas.innerHTML = "<p>It's week number "+roster[weekNumber].week+" that means its <strong>" + roster[weekNumber].teamMember + "'s</strong> turn to post on the blog this week</p>";
	}
	if(rosterType == "nextWeek"){
		if(nextWeekNumber == 52){
			canvas.innerHTML = "<p>End of year</p>";
		}
		else{
			canvas.innerHTML = "<p>Next week is week number "+roster[nextWeekNumber].week+" that means its <strong>" + roster[nextWeekNumber].teamMember + "'s</strong> turn to post on the blog</p>";
		}
	}
	if(rosterType == "fullYear"){
		rosterTable = "<table><tr><td><strong>Week Number</strong><td><td>&nbsp;</td><td><strong>Team Member</strong></td></tr>";
		for(i=1; i <= 52; i++){
			//console.log("week "+ i +" member: " + teamMembers[j]);
			if(i == (weekNumber+1)){thisWeek = "<h2>"+i+"</h2>"; thisWkTM = "<h2>"+teamMembers[j]+"</h2>";}else{thisWeek = i;  thisWkTM = teamMembers[j];}
			rosterTable = rosterTable + "<tr><td>"+thisWeek+"<td><td>&nbsp;</td><td>"+thisWkTM+"</td></tr>"
			j++;
			
			if(j == teamCount){
				j = 0;
			}
		}
		rosterTable = rosterTable + "</table>";
		canvas.innerHTML = rosterTable;
	}
}

//Gets current week number
function getWeekNumber(d) {
    d = new Date(d);
    var yearStart = new Date(d.getFullYear(),0,1);
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + yearStart.getDay()+1)/7)
    return weekNo;
}

checkPostSchedule("thisWeek");