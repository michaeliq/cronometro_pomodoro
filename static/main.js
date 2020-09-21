var bts = document.getElementsByTagName('button');
var t = document.getElementsByClassName('tiempo');
var form_u = document.getElementsByClassName('formulario_usuario')[0];
var user;

var is_run = false;
var contador_s;
var contador_m;
var contador_break = 0;
var break_s = 30;
var interval;



bts[0].addEventListener('click',()=>{
	if(contador_s !== undefined && contador_m !== undefined && bts[0].innerHTML == "INICIAR" && (contador_m != 0 || contador_s > 0)){
		interval = createInterval();
		bts[0].innerHTML = "DETENER";
		is_run = true
		bts[1].disabled = true;
	}else{
		deleteInterval(interval);
		if(bts[0].innerHTML == "DETENER"){
			bts[0].innerHTML = "INICIAR";
			is_run = false;
			bts[1].disabled = false;
		};
	};
	console.log(is_run);
});

bts[1].addEventListener('click',()=>{
	form_u.style.display = 'block';
});
bts[2].addEventListener('click', reset);

function createInterval(){
	let intervalID = window.setInterval(carga,1000);
	return intervalID;
};

function deleteInterval(interval){
	clearInterval(interval);
};

function pomodoro(){
	deleteInterval(interval);
	console.log("EMPIEZA LA PAUSA, DESCANSA UN POCO")
	setTimeout(()=>{
		interval = createInterval();
		is_run = false;
	},break_s*1000);
};

function carga(){
	if(((contador_m > 39) && contador_s == 0) || ((contador_m % 20) == 0) && (contador_s == 0)){
		pomodoro();
	}
	
	if((contador_m == 0) && (contador_s < 0)){
		clearInterval(interval);
		alert("acabo el tiempo");
		contador_s="0";
		is_run = false;
		bts[1].disabled = false;
		bts[0].innerHTML = "INICIAR";
	}else{
		t[0].innerHTML = contador_m;
		if((contador_s < 0)){
			contador_s=59;
			contador_m--;
		}
		if((contador_m < 10)){
			t[0].innerHTML = '0' + contador_m;
		} else {
			t[0].innerHTML = contador_m;
		}
	}
	if(contador_s < 10){
		t[1].innerHTML = '0' + contador_s
	}else{
		t[1].innerHTML = contador_s;
	}

	contador_s--;
	};

function reset(){
	if(is_run === true || (is_run === false && contador_s !== undefined && contador_m !== undefined)){
		clearInterval(interval);
		is_run = false;
		contador_s = undefined;
		contador_m = undefined;
		t[0].innerHTML = '00';
		t[1].innerHTML = '00';
		contador_break = 0;
		user = undefined;
		bts[0].innerHTML = "INICIAR";
		document.querySelector('#user').innerHTML = "";
		if(bts[1].disabled == true){
			bts[1].disabled = false;
		}
	}
};

form_u.addEventListener('submit', (e)=>{
	e.preventDefault();
	let minutes = document.querySelector('.minutes').value || "0";
	let seconds = document.querySelector('.seconds').value || "0";
	let user_name = document.querySelector('#user_name').value;
	
	contador_s = seconds;
	contador_m = minutes;
	user = document.querySelector('#user').innerHTML = user_name;
	form_u.style.display = 'none';
});
