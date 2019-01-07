// 連結到嚴選飲品
var jsonUrl = "https://api.myjson.com/bins/6fykw";
var jsonData;
			
$.getJSON(jsonUrl, function (resuit) {
	jsonData = resuit
	console.log( jsonData );
				
	for (idx in resuit) {
		var content = 
			"<div>" +
			"<span class = 'theme'>" + resuit[idx].name + "</span><br>" +
			"<span class = 'message'>價格 : </span>" + resuit[idx].cost + "<br>" +
			"<span class = 'message'>容量 : </span>" + resuit[idx].capacity + "<br>" +
			"<span class = 'message'>熱量 : </span>" + resuit[idx].calorie + "<br>" +
			"<span class = 'message'>" +
			resuit[idx].message + "</span>" +
			"</div>";
			$("#main").append(content);
	}
});

$(function () {
	$("button").click( function () {
		var target = $(this).attr("value");
		
		// 消失
		$("#main").animate({"opacity" : 0}, 300, function(){
			$("div").hide();
		});
		$("#main").empty();
					
		// 判斷按鍵並重新排序
		switch (target) {
		case 'cost':
			jsonData.sort(sortByCost);
			break;
		case 'capacity':
			jsonData.sort(sortByCapacity);
			break;
		case 'calorie':
			jsonData.sort(sortByCalorie);
			break;
		default:
		}
		
		// 重加child
		for (idx in jsonData) {
			var content = 
				"<div>" +
				"<span class = 'theme'>" + jsonData[idx].name + "</span><br>" +
				"<span class = 'message'>價格 : </span>" + jsonData[idx].cost + "<br>" +
				"<span class = 'message'>容量 : </span>" + jsonData[idx].capacity + "<br>" +
				"<span class = 'message'>熱量 : </span>" + jsonData[idx].calorie + "<br>" +
				"<span class = 'message'>" +
				jsonData[idx].message + "</span>" +
				"</div>";
				$("#main").append(content);
				//console.log(content);
		}

		$("#main").animate({"opacity" : 1}, 300, function(){
			$("div").show();
		});
	});
});

function sortByCost( a, b ) {
	return a.cost > b.cost ? 1: -1;
}
			
function sortByCapacity( a, b ) {
	return a.capacity > b.capacity ? 1: -1;
}

function sortByCalorie( a, b ) {
	return a.calorie > b.calorie ? 1: -1;
}