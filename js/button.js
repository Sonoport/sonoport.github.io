window.addEventListener('load', function(){
	console.log("window loaded");
	var buttonEl = document.getElementById('mybutton');
	buttonEl.addEventListener('click', function(){
		console.log("Clicked button");
	})
})
