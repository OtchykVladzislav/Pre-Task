//часть кода для смены темы
let SwitchMode = document.getElementById("SwitchMode");
//будем менять файлы css
SwitchMode.onclick = function () {
	let form = document.getElementById("form");
	if (form.getAttribute("href") == "Main.css") {
		form.href = "DarkMode.css";
	}
	else{
		form.href = "Main.css";
	}
}


var emailflag = false;
var loginflag = false;
var passwordflag = false;
function CheckEmail()
{
    var email = document.getElementById("mail");
    const mailPattern = /^[0-9a-z_-]+\@[0-9a-z_-]+\.[a-z]{2,4}$/i;
    if (!mailPattern.test(email.value.trim())) {
        email.style.background = "#CD5C5C";
		email.setCustomValidity("Неверный формат почтового адресса");
    }
    else { 
        email.style.background = "#00FF00";
        emailflag = true;
    }
}
function CheckLogin()
{
    var login = document.getElementById("login");
    if ( login.value.search(/\d/) != -1){
        login.style.background = "#CD5C5C";
		login.setCustomValidity("Не менее 5 символов,без чисел");
	}
    else{
        login.style.background = "#00FF00";
        loginflag = true;
	}
	
}

function CheckPassword()
{
    var password = document.getElementById("pass");
    if (!password.value.match(/[0-9]/g) || !password.value.match(/[a-z]/g) || !password.value.match(/[A-Z]/g)){
        password.style.background = "#CD5C5C";
		password.setCustomValidity("Не менее 8, без кирилицы");
    }
    else {
        password.style.background = "#00FF00";
        passwordflag = true;
    }
}

//отправка формы в формате Json
function sendJSON(){
    //выполнить отправку
	let login = document.getElementById("login");
	let password = document.getElementById("pass");
	let email = document.getElementById("mail");
	if(emailflag && loginflag && passwordflag)
    {
   		var request = new XMLHttpRequest();
		function reqReadyStateChange(){
			if (request.readyState == 4){
				var status = request.status;
				if (status == 200){
					document.getElementById("output").innerHTML=request.responseText;
				}
			}
		}
		// строка с параметрами для отправки
		var body = JSON.stringify({"login": login.value, "email": email.value, "password" : password.value});
		request.open("GET", "http://localhost:8080/postdata.php?"+body,true);
		request.setRequestHeader("Content-Type", "application/json");
		request.onreadystatechange = reqReadyStateChange;
		request.send();
		alert(body);
	}
}