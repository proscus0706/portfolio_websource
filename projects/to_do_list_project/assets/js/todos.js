// Check Off Specific Todos By Clicking
$("ul").on("click", "li", function(){
	
	$(this).toggleClass("completed");

	//$(li) -> 이렇게 하면 모든 li에 지정된다.
	//$(this) -> 이렇게 하면 선택한 li만 지정된다. 
});

//Click on X to delete Todo
$("ul").on("click", "span",function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
		//여기서 $(this)는 $("span").parent()를 의미. 
	});

	event.stopPropagation();
	//굳이 remove를 사용하지 않고 fadeOut을 사용하면된다. 하지만 실제로 지워지진 않는다.
});

$("input[type='text']").keypress(function(event){
	//유저가 enter를 눌렀을 때.
	if(event.which === 13){
		//grabbing new todo text from input
		var todoText = $(this).val();
		$(this).val("");
		console.log(todoText);
		//create a new li and add to ul 
		$("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>");
		
	}
});

$("#btnPlus").on("click", function(){
	$("input[type='text']").fadeToggle();
});