var numOfSquares = 6;
var colors = random_colors_generator(numOfSquares);
$("#rgb_color").text(colors[random_rgb_index_select(colors)]);
var rgb_color = $("#rgb_color").text();

apply_color();

//reset button
$("#btnReset").on("click", function(){
	reset();
})

//easybutton
$(".buttons").on("click", function(){
	$(".buttons").removeClass("selected");
	$(this).addClass("selected");
	//easy버튼이 selected 클래스를 가지고 있는 경우, 사각형 3개를 출력
	if($("#btnEasy").hasClass("selected")){
		numOfSquares = 3;
		reset();
	}
	//hard버튼이 selected 클래스를 가지고 있는 경우, 사각형 6개를 출력.
	if($("#btnHard").hasClass("selected")){
		numOfSquares = 6;
		reset();
	} 
})

function random_rgb_index_select(colorsArr){

	var index = Math.floor(Math.random()*colorsArr.length);

	return index;
}

function random_colors_generator(numOfColors){
	var arr = [];

	for(var i=0;i<numOfColors;i++){
		arr.push(random_rgb_generator());
	}

	return arr;
}

function random_rgb_generator(){
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	var str = "rgb(" + r + ", " + g + ", " + b + ")";
	return str;
}

function reset(){
	colors = random_colors_generator(numOfSquares);
	$("#rgb_color").text(colors[random_rgb_index_select(colors)]);
	rgb_color = $("#rgb_color").text();
	$(".square").on();
	$("h1").css("background", "steelblue");
	$("#btnReset").text("New Colors");
	apply_color();
}

function apply_color(){
	//jquery를 통해서 어레이의 값대로 css를 적용해주고 싶음.
	$(".square").each(function(index){

		if(colors[index]){
			$(this).css("background", colors[index]);	
			$(this).css("display", "inline");
		} else {
			$(this).css("display", "none");
		}

		$(this).on("click", function(){
			if(rgb_color == colors[index]){
				//사각형을 눌렀을 때, 해당하는 색이라면 나머지 모든 것의 색을 '답인 사각형'으로 변환
				$(".square, h1").css("background", rgb_color);
				$(".square").off();
				$("#btnReset").text("Play Again?");
				$("#message").text("Correct!");
			} 
			else {
				//사각형을 눌렀을 때, 해당하는 색이 아니면 배경화면과 같은 색으로 변함
				$(this).css("background", "#232323");
				$("#message").text("Try Again");
			}
		})
	})

//jquery는 기본적으로 $(".element")를 하면 여러개를 집어버린다.
//일괄적으로 모든 property를 적용하기보다 각각 한 개 한 개씩 적용해야 한다면
//$(".elements").each(function(index){})를 사용해야 한다. index는 어레이처럼 각각의 element의 index를 가져온다.
//아래는 실질적인 예
// $(".square").each(function(index){
// 	$(this).css("background", colors[index]);	
// })
}