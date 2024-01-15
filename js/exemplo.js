/*
JANELA PERSONALIZADA 2.0 © 2023
Desenvolvido por Reynolds Costa, no Notepad++

O uso é permitido; a comercialização, proibida.
*/

// ARQUIVO DE EXEMPLO

function exemplo43111() {
	JP.criar.principal({
		conteudo : {
			cabecalho : {
				titulo : "Vídeo",
				botoes : {
					fechar : function() {}
				}
			},
			corpo :
				"<iframe " +
					"src         = 'https://www.youtube.com/embed/ioOHXl-xhc4?si=s2BFOXlJz7PogdRY&amp;controls=0'" +
					"title       = 'YouTube video player'" +
					"frameborder = '0'" +
					"style = '" +
						"width:100%;" +
						"height:98%" +
					"'" +
					"allow = '" +
						"accelerometer; " +
						"autoplay; " +
						"clipboard-write; " +
						"encrypted-media; " +
						"gyroscope; " +
						"picture-in-picture; " +
						"web-share" +
					"' allowfullscreen" +
				"></iframe>"
		},
		estilo : {
			maximizar : true
		}
	});
}

function exemplo43112_1() {
	JP.criar.alerta("Olá, mundo!");
}

function exemplo43112_2() {
	JP.criar.alerta("Olá, mundo!", "", function() {
		console.log("Fui fechado");
	});
}

function exemplo43113() {
	JP.criar.confirma("Deseja continuar?", "", true, function(resp) {
		switch(resp) {
			case 1:
				JP.criar.alerta("Sim");
				break;
			case 0:
				JP.criar.alerta("Não");
				break;
			case -1:
				JP.criar.alerta("Cancelou");
				break;
		}
	});
}

function exemplo43114() {
	JP.criar.prompt("Qual a idade?", "12", "", false, function(val) {
		return val == parseInt(val); // Aceita apenas números inteiros
	}, function(resp) {
		JP.criar.alerta("O ano de nascimento é " + (2023 - parseInt(resp)));
	});
}

let janExemplo;
function exemplo43141() {
	let botao = JP.recursos.botaoPadrao();
	/*
	O botão dessa janela terá o atributo letra igual a -1,
	o atributo descr igual a "" e o atributo ativo igual a true,
	como definido no arquivo janelaPersonalizada2.0_pref.js.
	*/
	botao.funcao = function() {
		const id = janExemplo.get.id(); // Obtém o id dessa janela para operações
		JP.alterar.editar(id, {
			estilo : {
				posicao : {
					vertical : "acima"
				}
			}
		});
		JP.alterar.botaoOnOff(id, 0); // Desativa o botão
	};
	janExemplo = JP.criar.principal({
		conteudo : {
			cabecalho : {
				titulo : "Exemplo",
				botoes : {
					maximizar : false,
					fechar : function() {}
				}
			},
			corpo : "<p>Essa janela tem um botão baseado em um botão padrão</p>",
			botoes : [
				{
					"Subir" : botao
				}
			]
		}
	});
}