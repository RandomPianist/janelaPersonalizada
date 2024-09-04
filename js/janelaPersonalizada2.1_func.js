/*
JANELA PERSONALIZADA 2.1 © 2022-2024
Desenvolvido por Reynolds Costa

O uso é permitido; a comercialização, proibida.
*/

/*
Esse arquivo contém
      -------------
1) as |==FUNÇÕES==| que o script reescreve,
      -------------
2) o instanciamento de classes que são necessárias para o seu funcionamento e
3) a inclusão de listeners que interagem com a janela.
Alterar esses códigos é desnecessário para a maioria das funções comuns.
*/

window.onload = function() {
	try {
		WLM.load();
	} catch(err) {}
	JP = new Janelas();
}

window.onclick = function(e) {
	if (JP._controle.click()) try {
		WLM.click(e);
	} catch(err) {}
}

window.onresize = function() {
	try {
		WLM.resize();
	} catch(err) {}
	JP._controle.resize();
}

window.onkeydown = function(e) {
	if (JP._controle.keydown(e)) try {
		if (!WLM.keydown(e)) try {
			CT.keydown(e);
		} catch(err) {}
	} catch(err) {
		try {
			CT.keydown(e);
		} catch(err) {}
	}
}

window.onkeyup = function(e) {
	if (JP._controle.keyup(e)) try {
		if (!WLM.keyup(e)) try {
			CT.keyup(e);
		} catch(err) {}
	} catch(err) {
		try {
			CT.keyup(e);
		} catch(err) {}
	}
}