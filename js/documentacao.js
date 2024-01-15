/*
JANELA PERSONALIZADA 2.0 © 2023
Desenvolvido por Reynolds Costa, no Notepad++

O uso é permitido; a comercialização, proibida.
*/

/*
		                     ------------------
Esse é o script da página de |==DOCUMENTAÇÃO==|
		                     ------------------

Não é necessário alterá-lo ou importá-lo em seu projeto.
*/

let explicando = -1;
let capitulos = new Array();

window.addEventListener("load", function() {
	setTimeout(function() {
		let lista = document.querySelectorAll("#explicacao_codigo p");
		for (let i = 0; i < lista.length; i++) {
			let indice = -1;
			let classes = lista[i].classList;
			for (let j = 0; j < classes.length; j++) {
				if (classes[j].indexOf("sp") > -1) indice = j;
			}
			if (indice > -1) {
				if (capitulos.indexOf(classes[indice]) == -1) capitulos.push(classes[indice]);
				let lista2 = document.querySelectorAll("p." + classes[indice] + " span");
				for (let j = 0; j < lista2.length; j++) lista2[j].classList.add(classes[indice]);
			}
		}
		lista = document.querySelectorAll("#explicacao_codigo span");
		for (let i = 0; i < lista.length; i++) {
			let indice = -1;
			let classes = lista[i].classList;
			for (let j = 0; j < classes.length; j++) {
				if (classes[j].indexOf("sp") > -1) indice = j;
			}
			if (indice > -1) {
				let lista2 = document.querySelectorAll("span." + classes[indice]);
				for (let j = 0; j < lista2.length; j++) {
					lista2[j].addEventListener("mouseover", function() {
						for (let k = 0; k < lista2.length; k++) lista2[k].style.background = "#DDD";
					});
					lista2[j].addEventListener("mouseout", function() {
						for (let k = 0; k < lista2.length; k++) {
							if (lista2[k].classList.value.indexOf("atv") == -1) lista2[k].style.removeProperty("background");
						}
					});
					lista2[j].addEventListener("click", function() {
						if (this.classList.value.indexOf("atv") == -1) {
							for (let k = 0; k < lista.length; k++) lista[k].classList.remove("atv");
							for (let k = 0; k < lista2.length; k++) lista2[k].classList.add("atv");
							for (let k = 0; k < lista.length; k++) {
								if (lista[k].classList.value.indexOf("atv") == -1) lista[k].style.removeProperty("background");
							}
							document.getElementById("explicacao_codigo").parentElement.classList.remove("w100");
							document.getElementById("explicacao").style.display = "block";
							let lista3 = document.querySelectorAll("#explicacao_texto div");
							for (let k = 0; k < lista3.length; k++) lista3[k].style.removeProperty("display");
							document.getElementById(classes[indice]).style.display = "block";
							setTimeout(function() {
								explicando = capitulos.indexOf(classes[indice]);
								cabecalho();
							}, 50);
						}
					});
				}
			}
		}
	}, 0);
});

window.addEventListener("click", function(e) {
	let mouseDentro = false;
	if (document.getElementById("explicacao").contains(e.target)) mouseDentro = true;
	if (!mouseDentro) {
		let lista = document.querySelectorAll("#explicacao_codigo span");
		for (let i = 0; i < lista.length; i++) {
			if (lista[i].contains(e.target)) mouseDentro = true;
		}
	}
	if (!mouseDentro && !JP.recursos.obterUltimo("aberto") && explicando > -1) {
		let lista = document.querySelectorAll("#explicacao_texto div");
		for (let i = 0; i < lista.length; i++) lista[i].style.removeProperty("display");
		lista = document.querySelectorAll("#explicacao_codigo span");
		for (let k = 0; k < lista.length; k++) {
			lista[k].classList.remove("atv");
			lista[k].style.removeProperty("background");
		}
		document.getElementById("explicacao").style.display = "none";
		document.getElementById("explicacao_codigo").parentElement.classList.add("w100");
		explicando = -1;
	}
});

function obterIndice(tipo) {
	switch(tipo) {
		case -2:
			var indice = 0;
			break;
		case 2:
			var indice = capitulos.length - 1;
			break;
		default:
			var indice = explicando + tipo;
			if (indice > capitulos.length - 1) indice = obterIndice(2);
			else if (indice < 0) indice = obterIndice(-2);
	}
	return indice;
}

function navegar(tipo) {
	explicando = obterIndice(tipo);
	const id = capitulos[explicando];
	let lista = document.querySelectorAll("#explicacao_codigo span");
	let lista2 = document.querySelectorAll("span." + id);
	for (let k = 0; k < lista.length; k++) lista[k].classList.remove("atv");
	for (let k = 0; k < lista2.length; k++) lista2[k].classList.add("atv");
	let posicao = -1;
	for (let k = 0; k < lista.length; k++) {
		if (lista[k].classList.value.indexOf("atv") > -1) { 
			lista[k].style.background = "#DDD";
			if (posicao == -1) posicao = lista[k].offsetTop - lista[k].offsetHeight;
		} else lista[k].style.removeProperty("background");
	}
	lista = document.querySelectorAll("#explicacao_texto div");
	for (let k = 0; k < lista.length; k++) lista[k].style.removeProperty("display");
	document.getElementById(id).style.display = "block";
	let el = document.getElementById("explicacao_codigo").firstElementChild;
	if (posicao > -1 && (tipo > 0 || el.scrollTop > 30 || explicando == 0)) el.scrollTo(0, posicao);
	cabecalho();
}

function cabecalho() {
	let lista = document.querySelectorAll("td.explicacao_btn button");
	for (let i = 0; i < lista.length; i++) lista[i].disabled = false;
	if (explicando == 0) var classe = "ant";
	else if (explicando == capitulos.length - 1) var classe = "prx";
	if (classe !== undefined) {
		lista = document.querySelectorAll("td." + classe + " button");
		for (let i = 0; i < lista.length; i++) lista[i].disabled = true;
	}
	let titulo = "";
	lista = document.querySelectorAll("p." + capitulos[explicando])[0].children;
	for (let i = 0; i < lista.length; i++) {
		let texto = lista[i].innerHTML;
		if (texto.indexOf("{") == -1 && texto.indexOf("[") == -1 && ["let", ","].indexOf(texto) == -1) titulo += texto;
	}
	if (titulo == "") titulo = '"Ok"';
	else if (titulo.indexOf("function") > -1) titulo = "funcao";
	else titulo = titulo.split(":")[0].trim();
	document.getElementById("explicacao_titulo").innerHTML = titulo;
}