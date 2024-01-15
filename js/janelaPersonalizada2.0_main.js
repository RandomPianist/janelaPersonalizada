/*
JANELA PERSONALIZADA 2.0 © 2023
Desenvolvido por Reynolds Costa, no Notepad++

O uso é permitido; a comercialização, proibida.
*/

/*
		 ---------------
Esse é o |==PRINCIPAL==| arquivo dessa biblioteca.
		 ---------------

AVISO:
Não altere se não souber o que está fazendo.
*/

let JP;
const JP_evitaCallback = Math.random();

const Janelas = function() {
	const Criar = function() {
		const that2 = this;

		let validarPadrao = function(val, max) {
			if (val === undefined) val = 0;
			if (typeof val === "number") {
				if (parseInt(val) == val) {
					if (val < 0 || val > max) {
						console.error('O botão indicado por ' + val + ' não existe');
						val = 0;
					}
				} else {
					console.error('O parâmetro "padrao", se declarado, deve ser um inteiro');
					val = 0;
				}
			} else {
				console.error('O parâmetro "padrao", se declarado, deve ser um número');
				val = 0;
			}
			return val;
		}

		this.principal = function(obj) {
			return new Janela(obj);
		}

		this.alerta = function(_conteudo, _titulo, callback) {
			let erro = false;
			if (callback === undefined) callback = function(param) {};
			else if (!validarParam("callback", callback, "function", true, false, true)) erro = true;
			if (_titulo === undefined) _titulo = "Aviso";
			else if (!validarParam("_titulo", _titulo, "string", true, false, false)) erro = true;
			else if (!_titulo) _titulo = "Aviso";
			let btn = that.recursos.botaoPadrao();
			if (!erro) {
				btn.funcao = function() {
					that.manutencao.fechar();
				};
				return that2.principal({
					id : "alerta",
					conteudo : {
						cabecalho : {
							titulo : _titulo,
							botoes : {
								maximizar : false,
								fechar : function() {
									callback();
								}
							}
						},
						corpo : "<p>" + _conteudo + "</p>",
						botaoPadrao : 0,
						botoes : [
							{
								"Ok" : btn
							}
						]
					},
					estilo : {
						maximizar : false
					},
					config : {
						fechar : {
							mouse   : false,
							teclado : true
						}
					}
				});
			} else return false;
		}

		this.confirma = function(_conteudo, _titulo, cancelar, callback, padrao) {
			if (
				validarParam("callback",  callback,  "function", false, false, true) &&
				validarParam("cancelar",  cancelar,  "boolean",  false, false, true) &&
				validarParam("_titulo",   _titulo,   "string",   false, false, false) &&
				validarParam("_conteudo", _conteudo, "string",   false, false, true)
			) {
				if (!_titulo) _titulo = "Confirmar";
				let btnSim = that.recursos.botaoPadrao();
				let btnCancela = clonar(btnSim);
				btnSim.letra = 0;
				let btnNao = clonar(btnSim);
				btnSim.funcao = function() {
					callback(salvarPorValor({
						confirma : 1
					}).confirma);
					that.manutencao.fechar(JP_evitaCallback);
				};
				btnNao.funcao = function() {
					callback(salvarPorValor({
						confirma : 0
					}).confirma);
					that.manutencao.fechar(JP_evitaCallback);
				};
				btnCancela.funcao = function() {
					callback(salvarPorValor({
						confirma : -1
					}).confirma);
					that.manutencao.fechar(JP_evitaCallback);
				};
				let _botoes = [
					{
						"Sim" : btnSim
					}, {
						"Não" : btnNao
					}
				];
				if (cancelar) _botoes.push({
					"Cancelar" : btnCancela
				});
				return that2.principal({
					id : "confirma",
					conteudo : {
						cabecalho : {
							titulo : _titulo,
							botoes : {
								maximizar : false,
								fechar : cancelar ? function() {
									callback(salvarPorValor({
										confirma : -1
									}).confirma);
								} : -1
							}
						},
						corpo : "<p>" + _conteudo + "</p>",
						botoes : _botoes,
						botaoPadrao : validarPadrao(padrao, cancelar ? 2 : 1)
					},
					estilo : {
						maximizar : false
					},
					config : {
						fechar : {
							mouse   : false,
							teclado : cancelar
						}
					}
				});
			} else return false;
		}

		this.prompt = function(_conteudo, placeholder, _titulo, cancelar, validar, callback, padrao) {
			if (
				validarParam("callback",    callback,    "function", false, false, true) &&
				validarParam("validar",     validar,     "function", false, false, true) &&
				validarParam("cancelar",    cancelar,    "boolean",  false, false, true) &&
				validarParam("_titulo",     _titulo,     "string",   false, false, false) &&
				validarParam("placeholder", placeholder, "string",   false, false, false) &&
				validarParam("_conteudo",   _conteudo,   "string",   false, false, true)
			) {
				if (!_titulo) _titulo = "Inserindo dados";
				let btn = that.recursos.botaoPadrao();
				let cancela = clonar(btn);
				cancela.funcao = function() {
					that.manutencao.fechar();
				};
				btn.funcao = function() {
					controle_prompt = that.recursos.obterUltimo("ativo");
					let valor = document.querySelector("#" + controle_prompt + " #prompt").value;
					let valido = validar(valor);
					if (typeof valido == "boolean") {
						that.manutencao.fechar();
						if (!valido) {
							if (controle_alerta === null) {
								controle_alerta = that2.alerta("Valor inválido", "", function() {
									setTimeout(function() {
										that.manutencao.reabrir(controle_prompt);
										controle_prompt = null;
									}, 0);
								});
							} else controle_alerta.reabrir();
						} else {
							callback(salvarPorValor({
								prompt : valor
							}).prompt);
							controle_prompt = null;
							controle_alerta = null;
						}
					} else console.error("A função de validação deve retornar um booleano");
				};
				let _botoes = [
					{
						"Ok" : btn
					}
				];
				if (cancelar) _botoes.push({
					"Cancelar" : cancela
				});
				return that2.principal({
					id : "prompt",
					conteudo : {
						cabecalho : {
							titulo : _titulo,
							botoes : {
								maximizar : false,
								fechar : cancelar ? function() { } : -1
							}
						},
						corpo  : "<p>" + _conteudo + "</p>" +
							"<input type = 'text' id = 'prompt' style = 'width:100%;margin-bottom:10px' value = '" + placeholder + "' />",
						botoes : _botoes,
						botaoPadrao : validarPadrao(padrao, cancelar ? 1 : 0)
					},
					estilo : {
						maximizar : false
					},
					config : {
						fechar : {
							mouse   : false,
							teclado : cancelar
						}
					}
				});
			} else return false;
		}
	}

	const Alterar = function() {
		this.editar = function(id, obj) {
			if (validarParam("obj", obj, "object", false, false, false) && validarJanela(id, "editar", false, true)) {
				let main = validarJSON(obj, controle_lista[id].objeto);
				let el = document.getElementById(id);
				let ref = controle_lista[id];
				if (histGrava) {
					if (histEdit[id] === undefined) histEdit[id] = new Array();
					histEdit[id].push(clonar(ref.objeto));
				}
				ref.objeto  = clonar(main);
				ref.btnTopo = 0;
				if (main.estilo.branco) el.classList.add("is-bright");
				else el.classList.remove("is-bright");
				if (typeof obj.conteudo == "object") {
					const ref2 = obj.conteudo;
					if (typeof ref2.cabecalho.titulo == "string") document.querySelector("#" + id + " .title-bar-text").innerHTML = main.conteudo.cabecalho.titulo;
					if (typeof ref2.corpo            == "string") document.getElementById(id + "-corpo").innerHTML = main.conteudo.corpo;
					if (typeof ref2.botoes           == "object") document.querySelector("#" + id + " footer").innerHTML = botoesHTML(main.conteudo.botoes, id);
				}
				let ref2 = main.conteudo.cabecalho.botoes;
				document.getElementById(id + "-maxmin").style.display = !ref2.maximizar ? "none" : "";
				document.getElementById(id + "-close").style.display = (typeof ref2.fechar != "function") ? "none" : "";
				if (ref2.maximizar) ref.btnTopo++;
				if (typeof ref2.fechar == "function") ref.btnTopo++;
				let posiciona = false;
				if (typeof obj.estilo == "object") {
					posiciona = ["object", "string"].indexOf(typeof obj.estilo.posicao) > -1 || (typeof obj.estilo.dimensoes == "object");
				}
				cria_e_altera(main, id, posiciona);
				ativarClasse(that.recursos.obterUltimo("ativo"));
			}
		}

		this.limparEdicoes = function(id, qtd) {
			if (validarJanela(id, "limpar as edições de", false, true)) {
				try {
					let num = qtd !== undefined ? histEdit[id].length - qtd : 0;
					if (histEdit[id][num] !== undefined) {
						histGrava = false;
						that.alterar.editar(id, histEdit[id][num]);
						let aux = new Array();
						for (let i = 0; i < num; i++) aux.push(histEdit[id][i]);
						histEdit[id] = aux;
						setTimeout(function() {
							histGrava = true;
						}, 0);
					} else {
						console.error(qtd === undefined ?
							'Não houveram edições feitas nesssa janela'
						:
							'O número não corresponde a uma quantidade de edições válida'
						);
					}
				} catch(err) {
					console.error('Não houveram edições feitas nessa janela');
				}
			}
		}

		this.botaoOnOff = function(id, btn, ativar) {
			if (validarJanela(id, "manipular o botão de uma", false, true)) {
				try {
					const conteudo = controle_lista[id].objeto.conteudo;
					let botoes = conteudo.botoes;
					let indice = [0, ""];
					switch(typeof btn) {
						case "string":
							indice[1] = btn;
							botoes.forEach((botao) => {
								for (x in botao) {
									if (x == btn) indice[0] = i;
								}
							});
							break;
						case "number":
							indice = [btn, obterBotao(botoes[btn]).nome];
							break;
					}
					if (conteudo.botaoPadrao != indice[0]) {
						let erro  = true;
						let botao = botoes[indice[0]][indice[1]];
						if (ativar === undefined) {
							erro = false;
							ativar = !botao.ativo;
						} else if (validarParam("ativar", ativar, "boolean", false, false, false)) erro = false;
						if (!erro) {
							if (botao.ativo != ativar) {
								let lista = document.querySelectorAll("#" + id + " footer button");
								botao.ativo = ativar;
								lista[indice[0]].disabled = !ativar;
							} else console.warn("O botão já estava " + (!ativar ? "in" : "") + "ativo");
							if (!ativar) limparBotao();
						}
					} else console.error("Não é possível manipular o botão padrão de uma janela.");
				} catch(err) {
					console.error("O botão indicado não existe");
				}
			}
		}
	}

	const Manutencao = function() {
		this.maxmin = function(id, maximizado) {
			if (validarJanela(id, "maximizar ou restaurar", true, true)) {
				if (typeof id == "number") id = idFromPos(id);
				let erro = false;
				if (maximizado !== undefined) erro = !validarParam("maximizado", maximizado, "boolean", true, false, true);
				if (that.recursos.obterUltimo("ativo") == id && !erro) {
					const ref    = controle_lista[id];
					const ref2   = ref.objeto.config;
					const estilo = document.getElementById("JP-estilo");
					let el    = document.getElementById(id);
					let style = el.style;
					if (ref.objeto.conteudo.cabecalho.botoes.maximizar) {
						var btn         = document.getElementById(id + "-maxmin");
						var maximizado2 = btn.getAttribute("aria-label") != "Maximize";
					} else {
						var btn         = null;
						var maximizado2 = full.indexOf(id) > -1;
					}
					if (maximizado === undefined) maximizado = maximizado2;
					["top", "left", "width", "height"].forEach((propriedade) => {
						style.removeProperty(propriedade);
					});
					if (maximizado) {
						if (btn !== null) btn.setAttribute("aria-label", "Maximize");
						full.splice(full.indexOf(id), 1);
						if (ref2.mover) el.classList.add("draggable");
						estilo.innerHTML += "#" + id + "{" +
							"width  : " + ref.dimensoes[0] + "px;" +
							"height : " + ref.dimensoes[1] + "px" +
						"}";
						permissaoMouse = false;
						setTimeout(function() {
							permissaoMouse = true;
						}, 100);
					} else {
						const pai = elPai();
						const dim = dimensoes();
						estilo.innerHTML += "#" + id + "{" +
							"top    : 50%;" +
							"left   : 50%;" +
							"width  : " + Math.min(pai.width, dim.largura) + "px;" +
							"height : " + Math.min(pai.height, dim.altura) + "px" +
						"}";
						if (btn !== null) btn.setAttribute("aria-label", "Restore");
						if (ref2.mover) el.classList.remove("draggable");
						full.push(id);
					}
					setTimeout(function() {
						redimensionar(id, false);
					}, 100);
				}
			}
		}

		this.fechar = function(id) {
			const callback = id !== JP_evitaCallback;
			id = callback ? idOuUltimo(id) : idOuUltimo();
			if (id == that.recursos.obterUltimo("ativo") && permissaoMouse) {
				fecharMain(id);
				ativarBotaoPadraoUltimo(true);
				permissaoMouse = false;
				setTimeout(function() {
					permissaoMouse = true;
					if (callback) {
						const fn = controle_lista[id].objeto.conteudo.cabecalho.botoes.fechar;
						if (typeof fn == "function") fn();
					}
				}, 100);
			}
			if (!that.recursos.obterUltimo("aberto")) {
				Array.from(document.querySelectorAll("button")).forEach((el) => {
					el.disabled = false;
				});
				if (haMenu()) document.getElementById("menuCobrir").style.display = "none";
			} else ativarClasse(that.recursos.obterUltimo("aberto"));
		}

		this.reabrir = function(id) {
			try {
				if (typeof id == "object") id = id.id;
				id = idOuUltimo(id);
				if (validarJanela(id, "reabrir", false, false)) {
					document.getElementById(id).style.display = "block";
					controle_lista[id].aberto = true;
					ativar(id);
				}
			} catch(err) {}
		}

		this.ativar = function(id) {
			if (validarJanela(id, "ativar", false, true)) {
				ativar(id);
				if (id != that.recursos.obterUltimo("ativo")) {
					setTimeout(function() {
						limparBotao();
					}, 50);
					setTimeout(function() {
						ativarBotaoPadraoUltimo(false);
					}, 100);
				}
			}
		}
	}

	const Recursos = function() {
		this.botaoPadrao = function() {
			return obterBotao(clonar(JP_preferencias.conteudo.botoes[0])).objeto;
		}

		this.obterUltimo = function(tipo) {
			let id = "";
			if (["ativo", "aberto"].indexOf(tipo) > -1) {
				for (x in controle_lista) {
					if (controle_lista[x][tipo]) id = x;
				}
			} else console.error('O tipo deve ser "ativo" ou "aberto"');
			return id;
		}

		this.zIndex = function(id) {
			let retorno = -1;
			if (id === undefined) {
				for (x in controle_lista) {
					if (controle_lista[x].zIndex > retorno) retorno = controle_lista[x].zIndex;
				}
			} else if (validarJanela(id, "conhecer informações de", false, false)) retorno = controle_lista[id].zIndex;
			return retorno == -1 ? false : retorno;
		}

		this.maxmin = function(id) {
			validarJanela(id, "conhecer informações de", false, false);
			return full.indexOf(idOuUltimo(id)) > -1;
		}
	}

	const Controle = function() {
		this.click = function(e) {
			let retorno = true;
			const ultimoAtivo = that.recursos.obterUltimo("ativo");
			if (JP_mult) {
				let abertos = new Array();
				for (x in controle_lista) {
					if (controle_lista[x].aberto) abertos.push(x);
				}
				abertos.forEach((jan) => {
					if (document.getElementById(jan).contains(event.target)) {
						ativar(jan);
						retorno = false;
					}
				});
			}
			if (retorno) {
				const el = document.getElementById(ultimoAtivo);
				retorno = el !== null ? chamaFechar(!el.contains(event.target), "mouse") : true;
			}
			return retorno;
		}

		this.keyup = function(e) {
			return chamaFechar(e.keyCode == 27, "teclado");
		}

		this.keydown = function(e) {
			let cond = !that.recursos.obterUltimo("aberto");
			if (!cond) {
				const ultimoAtivo = that.recursos.obterUltimo("ativo");
				let lUltimoAtivo = controle_lista[ultimoAtivo];
				if ([18, 37, 39].indexOf(e.keyCode) > -1) {
					if (e.keyCode == 18 || lUltimoAtivo.sel > -1) e.preventDefault();
					const conteudo = lUltimoAtivo.objeto.conteudo;
					if ([37, 39].indexOf(e.keyCode) > -1 && lUltimoAtivo.sel > -1) {
						const botoes = conteudo.botoes;
						let ativos = new Array();
						for (let i = 0; i < botoes.length; i++) {
							if (obterBotao(botoes[i]).objeto.ativo) ativos.push(i);
						}
						let aux = ativos.indexOf(lUltimoAtivo.sel) + e.keyCode - 38;
						if (aux < 0) aux = ativos.length - 1;
						else if (aux > ativos.length - 1) aux = 0;
						let indice = ativos[aux];
						if (indice < ativos[0]) indice = ativos[ativos.length - 1];
						else if (indice > ativos[ativos.length - 1]) indice = ativos[0];
						limparBotao();
						selecionaBotao(indice, false);
						if (alt) sublinhaBotao();
					} else if (e.keyCode == 18) {
						limparBotao();
						if (!alt) {
							const _padrao = conteudo.botaoPadrao;
							const botoes = sublinhaBotao();
							if (botoes.indexOf(_padrao) > -1) selecionaBotao(_padrao, true);
							else if (botoes.length) selecionaBotao(botoes[botoes.length - 1], true);
						} else botaoTecla = new Array();
						alt = !alt;
					}
				} else if (e.keyCode == 13 && lUltimoAtivo.sel > -1 && lUltimoAtivo.objeto.conteudo.botoes.length) {
					document.getElementById(ultimoAtivo + "_btn" + lUltimoAtivo.sel).onclick();
				} else if (botaoTecla[e.keyCode] !== undefined) botaoTecla[e.keyCode]();
			}
			return cond;
		}

		this.resize = function() {
			const pai = elPai();
			const dim = dimensoes();
			for (x in controle_lista) {
				let ref = controle_lista[x].dataEstilo;
				let el  = document.getElementById(x);
				if (full.indexOf(x) > -1) {
					el.style.opacity = "0";
					that.manutencao.maxmin(x);
					setTimeout(function() {
						that.manutencao.maxmin(x);
					}, 300);
					setTimeout(function() {
						el.style.removeProperty("opacity");
					}, 500);
				} else document.querySelector("#" + x + " .title-bar-text").style.removeProperty("margin-right");
				if (ref.length) posicionar(x, document.getElementById("JP-mov-" + x), ref[1] * 10, ref[0] * 10, el.offsetHeight, el.offsetWidth);
			}
		}

		this.executarFuncao = function(indice, indice2) {
			const id = idFromPos(indice);
			if (that.recursos.obterUltimo("ativo") == id) {
				const botao = obterBotao(controle_lista[id].objeto.conteudo.botoes[indice2]).objeto;
				if (botao.ativo) botao.funcao();
			}
		}
	}

	let offsetX, offsetY;

	let that           = this;
	let full           = new Array();
	let botaoTecla     = new Array();
	let histEdit       = new Array();
	let histGrava      = true;
	let alt            = false;
	let permissaoMouse = true;
	let avisoPai       = false;
	let el_ultimoAtivo = null;

	let controle_alerta    = null;
	let controle_prompt    = null;
	let controle_lista     = new Array();
	let controle_indices   = new Array();
	let controle_objetos   = new Array();
	let controle_respostas = new Array();

	this.criar      = new Criar();
	this.alterar    = new Alterar();
	this.recursos   = new Recursos();
	this.manutencao = new Manutencao();
	this._controle  = new Controle();

	setTimeout(function() {
		elCorpo().innerHTML += "<style type = 'text/css' id = 'JP-estilo'>" +
			".janela {" +
				"position: fixed;" +
				"transform: translate(-50%, -50%);" +
				"width: max-content" +
			"}" +
		"</style>";
		if (!haMenu()) document.addEventListener("scroll", fechaQuandoPaiInvisivel);
		else document.getElementById("menuRes").addEventListener("scroll", fechaQuandoPaiInvisivel);
	}, 0);

	let haMenu = function() {
		let ha = true;
		try {
			if (WLM === undefined) ha = false;
		} catch(err) {
			ha = false;
		}
		return ha;
	}

	let elCorpo = function() {
		return haMenu() ? document.getElementById("menuRes") : document.body;
	}

	let elPai = function() {
		const menu = haMenu();
		let menuRes = document.getElementById("menuRes");
		let pai = document.getElementById(JP_pai);
		if (!avisoPai && JP_pai != "" && pai === null) {
			console.warn('O elemento "' + JP_pai + '" não pôde ser configurado em JP_pai pois ele não existe\nAs janelas serão criadas de forma livre');
			avisoPai = true;
		}
		if (pai !== null && menu) {
			pai = pai.getBoundingClientRect();
			menuRes = menuRes.getBoundingClientRect();
			var resultado = {
				top    : Math.max(pai.top,    menuRes.top),
				left   : Math.max(pai.left,   menuRes.left),
				height : Math.min(pai.height, menuRes.height),
				width  : Math.min(pai.width,  menuRes.width)
			};
		} else if (pai !== null || menu) {
			const rect = pai !== null ? pai.getBoundingClientRect() : menuRes.getBoundingClientRect();
			var resultado = {
				top    : rect.top,
				left   : rect.left,
				height : rect.height,
				width  : rect.width
			};
		} else {
			var resultado = {
				top    : 0,
				left   : 0,
				height : window.innerHeight,
				width  : window.innerWidth
			};
		}
		return resultado;
	}

	let chamaFechar = function(cond, tipo) {
		const ultimoAtivo = that.recursos.obterUltimo("ativo");
		if (ultimoAtivo && cond) {
			if (controle_lista[ultimoAtivo].objeto.config.fechar[tipo]) that.manutencao.fechar();
			else animar();
		}
		return !that.recursos.obterUltimo("aberto");
	}

	let clonar = function(obj) {
		let obj2 = (obj.constructor === Array) ? [] : {};
		for (x in obj) {
			let val = obj[x];
			obj2[x] = (typeof val === "object") ? clonar(val) : val;
		}
		return obj2;
	}

	let idFromPos = function(pos) {
		let id;
		for (x in controle_indices) {
			if (controle_indices[x] == pos) {
				id = x;
				break;
			}
		}
		return id;
	}

	let idOuUltimo = function(id) {
		const orig = id;
		if (id !== undefined) {
			if (typeof id == "number") id = idFromPos(id);
		} else id = that.recursos.obterUltimo("ativo");
		const aberto = that.recursos.obterUltimo("aberto");
		if (!id) id = aberto;
		if (!id && aberto) {
			if (orig === undefined) console.error('É necessário informar um id');
			else console.error('A janela "' + orig + '" não existe');
			return false;
		} else return id;
	}

	let validarParam = function(nome, obj, tipo, permiteUndefined, chave, permiteTags) {
		if (tipo.constructor !== Array) tipo = [tipo];
		let ret = tipo.indexOf(typeof obj) > -1;
		if (permiteUndefined) ret = ret || obj === undefined;
		let tipos = "";
		for (let i = 0; i < tipo.length; i++) {
			tipos += tipo[i];
			if (i < tipo.length - 1) tipos += (i < tipo.length - 2) ? ", " : " ou ";
		}
		let msg = !chave ? 'O parâmetro "' : 'A chave "';
		msg += nome + '"';
		if (permiteUndefined) {
			msg += ", se definid";
			msg += chave ? "a" : "o";
			msg += ",";
		}
		msg += " deve ser ";
		if (ret) {
			if (typeof obj == "string" && !permiteTags) {
				if (obj.indexOf("<") > -1 && obj.indexOf(">") > -1) {
					ret = false;
					msg += "do tipo " + tipos + " e não possuir tags HTML";
					console.error(msg);
				}
			} else if (typeof obj == "number") {
				if (parseInt(obj) == obj) {
					if (nome.indexOf("altura") > -1 || nome.indexOf("largura") > -1) {
						if (obj && obj < 150) {
							ret = false;
							msg += "um inteiro igual a 0 ou maior ou igual 150";
							console.error(msg);
						}
					}
				} else {
					ret = false;
					msg += "um inteiro";
					console.error(msg);
				}
			}
		} else {
			msg += "do tipo " + tipos;
			console.error(msg);
		}
		return ret && obj !== undefined;
	}

	let validarJanela = function(id, objetivo, numero, aberto) {
		let retorno = false;
		if (id !== undefined) {
			if (numero && typeof id == "number") id = idFromPos(id);
			if (typeof id == "string") {
				if (controle_lista[id] !== undefined) {
					if (aberto) {
						if (controle_lista[id].aberto) retorno = true;
						else if (paiInvisivel()) console.error("As janelas não podem ser construídas se o elemento pai não estiver visível");
						else console.error("Não é possível " + objetivo + " uma janela que não está aberta");
					} else retorno = true;
				} else console.error('A janela "' + id + '" não existe');
			} else console.error('O parâmetro "id" deve ser do tipo string');
		} else console.error('O parâmetro "id" não foi definido');
		return retorno;
	}

	let dimensoes = function() {
		return {
			altura  : Math.min(elCorpo().offsetHeight, window.innerHeight),
			largura : Math.min(elCorpo().offsetWidth,  window.innerWidth)
		};
	}

	let paiInvisivel = function() {
		const pai = elPai();
		return ((pai.top > dimensoes().altura) || ((pai.top + pai.height) < 0));
	}

	let obterBotao = function(obj) {
		for (x in obj) {
			var botao = {
				nome   : x,
				objeto : obj[x]
			};
		}
		return botao;
	}

	let sublinhaBotao = function() {
		const ultimoAtivo = that.recursos.obterUltimo("ativo");
		let lUltimoAtivo = controle_lista[ultimoAtivo];
		const todos = lUltimoAtivo.objeto.conteudo.botoes;
		let indices = new Array();
		let letras = new Array();
		for (let i = 0; i < todos.length; i++) {
			let obj = obterBotao(todos[i]).objeto;
			if (obj.letra > -1 && obj.ativo) {
				indices.push(i);
				letras.push(obj.letra);
			}
		}
		for (let i = 0; i < indices.length; i++) {
			let el = document.getElementById(ultimoAtivo + "_btn" + indices[i]);
			let letra = el.innerHTML.substring(letras[i], letras[i] + 1);
			botaoTecla[65 + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(letra.toUpperCase())] = el.onclick;
			let texto = el.innerHTML.substring(0, letras[i]) +
				"<span style = 'text-decoration:underline'>" + letra + "</span>" +
				el.innerHTML.substring(letras[i] + 1);
			el.innerHTML = texto;
		}
		return indices;
	}

	let validarJSON = function(obj, ant) {
		let ref = obj;
		let sref = "obj";
		let main = ant === undefined ? clonar(JP_preferencias) : clonar(ant);
		if (validarParam(sref + ".conteudo", ref.conteudo, "object", true, true, true)) {
			ref = ref.conteudo;
			sref += ".conteudo";
			if (validarParam(sref + ".cabecalho", ref.cabecalho, "object", true, true, true)) {
				ref = ref.cabecalho;
				sref += ".cabecalho";
				if (validarParam(sref + ".titulo", ref.titulo, "string", true, true, false)) main.conteudo.cabecalho.titulo = ref.titulo;
				if (validarParam(sref + ".botoes", ref.botoes, "object", true, true, true)) {
					ref = ref.botoes;
					sref += ".botoes";
					if (validarParam(sref + ".maximizar", ref.maximizar, "boolean", true, true, true)) main.conteudo.cabecalho.botoes.maximizar = ref.maximizar;
					if (ref.fechar !== undefined) main.conteudo.cabecalho.botoes.fechar = ref.fechar;
				}
			}
			ref = obj.conteudo;
			sref = "obj.conteudo";
			if (validarParam(sref + ".corpo", ref.corpo, "string", true, true, true)) main.conteudo.corpo = ref.corpo;
			if (obj.conteudo.botoes !== undefined) {
				let erro = false;
				if (obj.conteudo.botoes.constructor === Array) {
					let botoes = new Array();
					obj.conteudo.botoes.forEach((botao) => {
						if (typeof botao == "object" && !erro) {
							let ref2 = obterBotao(botao).objeto;
							if (typeof ref2 == "object" && !erro) {
								if (
									typeof ref2.funcao != "function" ||
									typeof ref2.letra  != "number"   ||
									typeof ref2.ativo  != "boolean"  ||
									typeof ref2.descr  != "string"
								) erro = true;
								else if (parseInt(ref2.letra) != ref2.letra || (ref2.descr.indexOf("<") > -1 && ref2.descr.indexOf(">") > -1)) erro = true;
								else if (ref2.letra < -1 || ref2.letra > obterBotao(botao).nome.length) erro = true;
							} else erro = true;
						} else erro = true;
					});
				} else erro = true;
				if (!erro) {
					main.conteudo.botoes = obj.conteudo.botoes;
					if (validarParam(sref + ".botaoPadrao", ref.botaoPadrao, "number", true, true, true)) {
						if (ref.botaoPadrao >= -1 && ref.botaoPadrao < main.conteudo.botoes.length) main.conteudo.botaoPadrao = ref.botaoPadrao;
						else console.error(
							'A chave "' + sref + '.botaoPadrao", se definida, deve ser um inteiro entre -1 e a quantidade de botoes - 1'
						);
					}
				} else console.error("Ocorreu um erro na construção dos botões dessa janela");
			}
		}
		if (validarParam("obj.estilo", obj.estilo, "object", true, true, true)) {
			ref = obj.estilo;
			sref = "obj.estilo";
			if (validarParam(sref + ".maximizar", ref.maximizar, "boolean", true, true, true)) main.estilo.maximizar = ref.maximizar;
			if (validarParam(sref + ".branco",    ref.branco,    "boolean", true, true, true)) main.estilo.branco    = ref.branco;
			if (validarParam(sref + ".dimensoes", ref.dimensoes, "object",  true, true, true)) {
				ref = ref.dimensoes;
				sref += ".dimensoes";
				if (validarParam(sref + ".altura",  ref.altura,  "number", true, true, true)) main.estilo.dimensoes.altura  = ref.altura;
				if (validarParam(sref + ".largura", ref.largura, "number", true, true, true)) main.estilo.dimensoes.largura = ref.largura;
			}
			ref = obj.estilo;
			if (validarParam(sref + ".posicao", ref.posicao, ["string", "object"], true, true, false)) {
				if (ref.posicao !== undefined) {
					sref += ".posicao";
					if (typeof ref.posicao == "object") {
						ref = ref.posicao;
						if (ref.horizontal !== undefined) {
							if (["esquerda", "centro", "direita"].indexOf(ref.horizontal) > -1) var horizontal = ref.horizontal;
							else console.error(
								'A chave "' + sref + '.horizontal", se definida, deve ser ' + 
								'do tipo string e ser igual a "esquerda", "centro" ou "direita"'
							);
						}
						if (ref.vertical !== undefined) {
							if (["acima", "centro", "abaixo"].indexOf(ref.vertical) > -1) var vertical = ref.vertical;
							else console.error(
								'A chave "' + sref + '.vertical", se definida, deve ser do tipo string e ser igual a "acima", "centro" ou "abaixo"'
							);
						}
						main.estilo.posicao = {};
						main.estilo.posicao.horizontal = (horizontal !== undefined) ? horizontal : false;
						main.estilo.posicao.vertical   = (vertical   !== undefined) ? vertical   : false;
					} else if (ref.posicao == "auto") main.estilo.posicao = ref.posicao;
					else console.error('A chave "' + sref + '", se definida, deve ser do tipo object ou uma string igual a "auto"');
				}
			}
		}
		if (validarParam("obj.config", obj.config, "object", true, true, true)) {
			ref = obj.config;
			sref = "obj.config";
			if (validarParam(sref + ".mover",  ref.mover,  "boolean", true, true, true)) main.config.mover = ref.mover;
			if (validarParam(sref + ".fechar", ref.fechar, "object",  true, true, true)) {
				ref = ref.fechar;
				sref += ".fechar";
				if (validarParam(sref + ".mouse",   ref.mouse,   "boolean", true, true, true)) main.config.fechar.mouse   = ref.mouse;
				if (validarParam(sref + ".teclado", ref.teclado, "boolean", true, true, true)) main.config.fechar.teclado = ref.teclado;
			}
		}
		return main;
	}

	let botoesHTML = function(arr, jan) {
		let resultado = "";
		let indice    = controle_indices[jan];
		for (let i = 0; i < arr.length; i++) {
			let ref = obterBotao(arr[i]).objeto;
			let descr = ref.descr ? " title = '" + ref.descr + "'" : "";
			let inativo = !ref.ativo ? " disabled" : "";
			resultado += "<button " +
				"onclick = 'JP._controle.executarFuncao(" + [indice, i].join(",") + ")' " +
				"id = '" + jan + "_btn" + i + "'" +
				descr +
				inativo +
			">" +
				x +
			"</button>";
		}
		return resultado;
	}

	let salvarPorValor = function(json, id) {
		if (validarParam("json", json, "object", false, false, true)) {
			id = idOuUltimo(id);
			let respostas = new Array();
			for (x in json) {
				controle_objetos.forEach((obj) => {
					if (obj.id == id) obj.respostas[x] = json[x];
				});
				respostas[x] = json[x];
			}
			controle_respostas[id] = respostas;
			return respostas;
		} else return false;
	}

	const animar = function() {
		if (permissaoMouse) {
			el_ultimoAtivo = document.getElementById(that.recursos.obterUltimo("ativo")).classList;
			el_ultimoAtivo.add("glass");
			setTimeout(function() {
				el_ultimoAtivo.remove("glass");
			}, 50);
			setTimeout(function() {
				el_ultimoAtivo.add("glass");
			}, 100);
			setTimeout(function() {
				el_ultimoAtivo.remove("glass");
			}, 150);
		}
	}

	const fecharMain = function(id) {
		controle_lista[id].aberto = false;
		controle_lista[id].ativo = false;
		controle_lista[id].sel = -1;
		full.splice(full.indexOf(id), 1);
		document.getElementById(id).style.display = "none";
	}

	const fechaQuandoPaiInvisivel = function() {
		const pai_invisivel = paiInvisivel();
		let abertos = 0;
		for (x in controle_lista) {
			if (controle_lista[x].aberto) {
				if (pai_invisivel) {
					fecharMain(x);
					const fn = controle_lista[x].objeto.conteudo.cabecalho.botoes.fechar;
					if (typeof fn == "function") fn();
					if (haMenu()) document.getElementById("menuCobrir").style.display = "none";
				} else redimensionar(x, false);
				abertos++;
			}
		}
		if (pai_invisivel) {
			Array.from(document.querySelectorAll("button")).forEach((el) => {
				el.disabled = false;
			});
			if (abertos > 0) {
				let aviso = abertos == 1 ? "A janela" : "As janelas";
				aviso += " não ";
				aviso += abertos == 1 ? "pôde" : "puderam";
				aviso += " ser redimensionada";
				if (abertos > 1) aviso += "s";
				aviso += " no espaço destinado a ela";
				if (abertos > 1) aviso += "s";
				aviso += " e ";
				aviso += abertos == 1 ? "foi" : "foram";
				aviso += " fechada";
				if (abertos > 1) aviso += "s";
				if (document.getElementById(JP_pai) !== null) aviso += "\nEscolha um elemento pai diferente";
				console.warn(aviso);
			}
		}
	}

	const ativarClasse = function(id) {
		let ativaBtn = id != that.recursos.obterUltimo("ativo");
		Array.from(document.querySelectorAll("button")).forEach((el) => {
			el.disabled = true;
		});
		for (x in controle_lista) {
			Array.from(document.querySelectorAll("#" + x + " *")).forEach((el) => {
				el.disabled = false;
			});
			Array.from(document.querySelectorAll("#" + x + (JP_mult ? " footer" : "") + " *, #" + x + " button, #" + x + " input[type=checkbox]")).forEach((el) => {
				el.disabled = x != id;
				if (x != id && el.tagName == "BUTTON") el.classList.remove("focado");
			});

			controle_lista[x].ativo = x == id;
			document.getElementById(x).classList.remove("active");
			if (x == id) {
				lista = document.querySelectorAll("#" + x + " footer button");
				for (let i = 0; i < lista.length; i++) lista[i].disabled = !obterBotao(controle_lista[id].objeto.conteudo.botoes[i]).objeto.ativo;
			}
		}
		if (ativaBtn) ativarBotaoPadraoUltimo(true);
		document.getElementById(id).classList.add("active");
		let indice = 2;
		for (x in controle_lista) {
			let val;
			if (controle_lista[x].aberto) {
				val = indice;
				indice += 1;
			} else val = 0;
			controle_lista[x].zIndex = val;
			document.getElementById(x).style.zIndex = val;
			if (haMenu()) {
				document.getElementById("menu").style.zIndex = val + 1;
				let estilo = document.getElementById("menuCobrir").style;
				estilo.display = "block";
				estilo.zIndex = val + 2;
			}
		}
	}

	const ativar = function(id) {
		setTimeout(function() {
			id = idOuUltimo(id);
			if (id) {
				let aux = controle_lista[id];
				delete controle_lista[id];
				controle_lista[id] = aux;
				ativarClasse(id);
			}	
		}, 50);
	}

	const limparBotao = function() {
		for (x in controle_lista) {
			let ref = controle_lista[x];
			if (ref.aberto) {
				let todos = ref.objeto.conteudo.botoes;
				for (let i = 0; i < todos.length; i++) {
					let el = document.getElementById(x + "_btn" + i);
					el.classList.remove("focado");
					for (y in todos[i]) var nome = y;
					el.innerHTML = nome;
				}
				ref.sel = -1;
			}
		}
	}

	const selecionaBotao = function(indice, espera) {
		const msgErro = "Foi solicitado um botão que não ";
		let ultimoAtivo = that.recursos.obterUltimo("ativo");
		let lUltimoAtivo = controle_lista[ultimoAtivo];
		const botoes = lUltimoAtivo.objeto.conteudo.botoes;
		if (indice > -1 && indice < botoes.length) {
			let ativos = new Array();
			for (let i = 0; i < botoes.length; i++) {
				if (obterBotao(botoes[i]).objeto.ativo) ativos.push(i);
			}
			if (ativos.indexOf(indice) > -1) {
				setTimeout(function() {
					try {
						ultimoAtivo = that.recursos.obterUltimo("ativo");
						lUltimoAtivo = controle_lista[ultimoAtivo];
						lUltimoAtivo.sel = indice;
						document.getElementById(ultimoAtivo + "_btn" + lUltimoAtivo.sel).classList.add("focado");
					} catch(err) {}
				}, espera ? 100 : 0);
			} else console.error(msgErro + "está ativo.");
		} else console.error(msgErro + "existe.");
	}

	const ativarBotaoPadraoUltimo = function(espera) {
		setTimeout(function() {
			const ultimoAtivo = that.recursos.obterUltimo("ativo");
			if (ultimoAtivo) {
				const _padrao = controle_lista[ultimoAtivo].objeto.conteudo.botaoPadrao;
				if (_padrao > -1) {
					limparBotao();
					selecionaBotao(_padrao, espera);
				}
			}
		}, 0);
	}

	const posicionar = function(id, estilo, top, left, altura, largura) {
		const style = estilo.id == "JP-estilo";
		const sinalTop  = (top  < 5 || !style) ? "+" : "-";
		const sinalLeft = (left < 5 || !style) ? "+" : "-";
		if (style) {
			if (top  == 5) altura  = 0;
			if (left == 5) largura = 0;
		}
		const resultado = "#" + id + "{" +
			"top  : calc(" + (top  * 10) + "% " + sinalTop  + " " + (altura / 2)  + "px);" +
			"left : calc(" + (left * 10) + "% " + sinalLeft + " " + (largura / 2) + "px)" +
		"}";
		if (style) estilo.innerHTML += resultado;
		else estilo.innerHTML = resultado;
	}

	const redimensionar = function(id, parar) {
		const el   = document.getElementById(id);
		const ref  = getComputedStyle(el);
		const ref2 = controle_lista[id];
		const ref3 = ref2.dimensoes;
		const obj  = ref2.objeto.estilo.posicao;
		let estilo = el.style;
		let pai    = elPai();
		let rect   = {
			top    : parseInt(ref.top.replace("px", "")),
			left   : parseInt(ref.left.replace("px", "")),
			width  : parseInt(ref.width.replace("px", "")),
			height : parseInt(ref.height.replace("px", ""))
		};
		rect.top  -= rect.height / 2;
		rect.left -= rect.width  / 2;
		const cond = {
			top        : rect.top    < pai.top  || rect.top  < 0,
			left       : rect.left   < pai.left || rect.left < 0,
			min_width  : rect.width  < ref3[0],
			min_height : rect.height < ref3[1],
			max_width  : (rect.left + rect.width)  > (pai.left + pai.width),
			max_height : (rect.top  + rect.height) > (pai.top  + pai.height)
		};
		if (pai.top  < 0) pai.top  = 0;
		if (pai.left < 0) pai.left = 0;
		const ultima = !cond.max_width && !cond.max_height;
		estilo.removeProperty("top");
		estilo.removeProperty("left");
		estilo.visibility = parar ? "" : "hidden";
		if (cond.min_width) estilo.width = ref3[0] + "px";
		else if (cond.max_width) {
			if (!cond.left && ((rect.left - 10) > pai.left)) estilo.left = (rect.left - 10) + "px";
			else estilo.width = (rect.width - 10) + "px";
		}
		if (cond.min_height) estilo.height = ref3[1] + "px";
		else if (cond.max_height) {
			if (!cond.top && ((rect.top - 10) > pai.top)) estilo.top = (rect.top - 10) + "px";
			else estilo.height = (rect.height - 10) + "px";
		}
		if (cond.top)  estilo.top  = (pai.top  + (rect.height / 2)) + "px";
		if (cond.left) estilo.left = (pai.left + (rect.width  / 2)) + "px";
		if (!parar) {
			setTimeout(function() {
				redimensionar(id, ultima);
			}, ultima ? 100 : 0);
		}
	}

	const cria_e_altera = function(main, id, posiciona) {
		let estilo    = document.getElementById("JP-estilo");
		let el        = document.getElementById(id);
		let el_maxmin = document.getElementById(id + "-maxmin");
		let el_close  = document.getElementById(id + "-close").style;
		let ref2      = controle_lista[id];
		let ref3      = main.estilo.dimensoes;
		let abertos   = 0;
		let definidos = 0;
		let listaTop  = new Array();
		let listaLeft = new Array();
		const altura  = ref3.altura  >= 150 ? ref3.altura  : el.offsetHeight;
		const largura = ref3.largura >= 150 ? ref3.largura : el.offsetWidth;
		for (x in controle_lista) {
			let ref4 = controle_lista[x];
			if (ref4.aberto) {
				listaTop.push(ref4.posicao[0]);
				listaLeft.push(ref4.posicao[1]);
				abertos++;
			}
		}
		if (posiciona) {
			if (typeof main.estilo.posicao == "object") {
				let ref = main.estilo.posicao;
				switch(ref.vertical) {
					case "acima":
						var top = 0;
						break;
					case "centro":
						var top = 5;
						break;
					case "abaixo":
						var top = 10;
						break;
				}
				switch(ref.horizontal) {
					case "esquerda":
						var left = 0;
						break;
					case "centro":
						var left = 5;
						break;
					case "direita":
						var left = 10;
						break;
				}
				if (top  !== undefined) definidos++;
				if (left !== undefined) definidos++;
			}
			if (definidos < 2) {
				if (abertos > 1) {
					const tentarTop  = top  === undefined;
					const tentarLeft = left === undefined;
					let tentativa = 0;
					do {
						if (tentarTop)  top  = Math.floor(Math.random() * 9) + 1;
						if (tentarLeft) left = Math.floor(Math.random() * 9) + 1;
						tentativa++;
					} while (((listaTop.indexOf(top) > -1 && tentarTop) || (listaLeft.indexOf(left) > -1 && tentarLeft)) && tentativa < 10);
					if (tentativa >= 10) console.warn("Há muitas janelas abertas, isso pode provocar lentidão.");
				} else {
					if (top  === undefined) top  = 5;
					if (left === undefined) left = 5;
				}
				posicionar(id, estilo, top, left, altura, largura);
			} else posicionar(id, estilo, top, left, altura, largura);
		}
		if (ref3.altura >= 150) estilo.innerHTML += "#" + id + "{height : " + ref3.altura + "px}";
		estilo.innerHTML += ref3.largura <= 150 ? "#" + id + " .title-bar-text{" +
			"margin-right:" + ((35 + (100 * (main.conteudo.botoes.length - 1))) + (135 - (ref2.btnTopo * 50))) + "px" +
		"}" : "#" + id + "{width : " + ref3.largura + "px}";
		ref2.posicao = [top, left];
		ref3 = el_maxmin.parentElement.style;
		el_maxmin = el_maxmin.style;
		ref3.visibility = !ref2.btnTopo ? "hidden" : "";
		ref2.dimensoes = [largura, altura];
		switch(ref2.btnTopo) {
			case 1:
				if (ref2.objeto.conteudo.cabecalho.botoes.maximizar) {
					ref3.borderRightWidth = "0px";
					el_maxmin.borderBottomRightRadius = "5px";
				} else el_close.borderBottomLeftRadius = "5px";
				break;
			case 2:
				ref3.removeProperty("border-right-width");
				el_close.removeProperty("border-bottom-left-radius");
				el_maxmin.removeProperty("border-bottom-right-radius");
				break;
		}
		if (main.config.mover) el.classList.add("draggable");
		else el.classList.remove("draggable");
		Array.from(document.querySelectorAll(".janela .title-bar")).forEach((barra) => {
			let id = barra.parentElement.id;
			if (controle_lista[id].objeto.conteudo.cabecalho.botoes.maximizar) {
				barra.ondblclick = function() {
					if (controle_lista[id].objeto.conteudo.cabecalho.botoes.maximizar) that.manutencao.maxmin(id);
				};
			}
		});
		Array.from(document.getElementsByClassName("janela")).forEach((dragDiv) => {
			let id     = dragDiv.id;
			let ref    = controle_lista[id];
			let header = dragDiv.firstElementChild;
			if (dragDiv.className.indexOf("draggable") > -1) {
				header.onmousedown = function(e) {
					let emBotao = false;
					Array.from(document.getElementsByClassName("title-bar-controls")).forEach((botao) => {
						if (botao.contains(e.target)) emBotao = true;
					});
					if (full.indexOf(id) == -1 && !emBotao && that.recursos.obterUltimo("ativo") == id) {
						ref.movendo = true;
						offsetX = e.clientX - (dragDiv.offsetWidth / 2) - dragDiv.getBoundingClientRect().left;
						offsetY = (-0.5169492 * dragDiv.offsetHeight) + 18;
					}
				}
				header.onmouseout = function() {
					ref.movendo = false;
				}
			} else header.onmousedown = function() {}
			document.addEventListener("mousemove", (e) => {
				if (ref.movendo && ref.objeto.config.mover) {
					let pai = elPai();
					let x = e.clientX - offsetX;
					let y = e.clientY - offsetY;

					let limite = dragDiv.offsetWidth / 2;
					if (x >= limite) {
						let limite2 = window.innerWidth - limite;
						if (x > limite2) x = limite2;
					} else x = limite;
					while ((x + limite) > (pai.left + pai.width)) x--;
					while ((x - limite) < pai.left) x++;
					let x2 = (x - limite) / window.innerWidth;

					limite = dragDiv.offsetHeight / 2;
					if (y >= limite) {
						let limite2 = window.innerHeight - limite;
						if (y > limite2) y = limite2;
					} else y = limite;
					while ((y + limite) > (pai.top + pai.height)) y--;
					while ((y - limite) < pai.top) y++;
					let y2 = (y - limite) / window.innerHeight;

					ref.dataEstilo = [x2, y2];
					posicionar(id, document.getElementById("JP-mov-" + id), y2 * 10, x2 * 10, dragDiv.offsetHeight, dragDiv.offsetWidth);
				}
			});
			document.addEventListener("mouseup", () => {
				ref.movendo = false;
			});
		});
		fechaQuandoPaiInvisivel();
		setTimeout(function() {
			that.manutencao.ativar(id);
			ativarBotaoPadraoUltimo(true);
			redimensionar(id, false);
		}, 100);
	}

	const Janela = function(obj) {
		let janId;

		let that2 = this;

		let validarId = function(acao) {
			let retorno = false;
			if (janId === undefined) console.error("Não é possível " + acao + " uma janela na mesma função que a criou.");
			else retorno = true;
			return retorno;
		}

		const Get = function() {
			const acao = "conhecer informações de";

			this.id = function() {
				return validarId(acao) ? janId : "";
			}

			this.zIndex = function() {
				return validarId(acao) ? that.recursos.zIndex(janId) : -1;
			}

			this.maxmin = function() {
				return validarId(acao) ? that.recursos.maxmin(janId) : null;
			}
		}

		const Set = function() {
			this.editar = function(obj) {
				if (validarId("editar")) that.alterar.editar(janId, obj);
			}

			this.limparEdicoes = function(qtd) {
				if (validarId("limpar as edições de")) that.alterar.limparEdicoes(janId, qtd);
			}

			this.ativar = function() {
				if (validarId("ativar")) that.manutencao.ativar(janId);
			}

			this.fechar = function() {
				if (validarId("fechar")) that.manutencao.fechar(janId);
			}

			this.reabrir = function() {
				if (validarId("reabrir")) that.manutencao.reabrir(janId);
			}

			this.maxmin = function(maximizado) {
				if (validarId("maximizar ou restaurar")) that.manutencao.maxmin(janId, maximizado);
			}

			this.botaoOnOff = function(btn, ativar) {
				if (validarId("ativar ou desativar um botao de")) that.alterar.botaoOnOff(janId, btn, ativar);
			}
		}

		setTimeout(function() {
			janId = "";
			that2.respostas = new Array();
			if (validarParam("obj", obj, "object", true, true, true)) {
				let main = validarJSON(obj);
				if (obj.id === undefined) obj.id = "janela";
				if (typeof obj.id == "string") {
					let cont = 1;
					for (x in controle_lista) {
						if (x == obj.id + cont) cont++;
					}
					let _id = obj.id + cont;
					controle_lista[_id] = {
						aberto     : true,
						ativo      : true,
						movendo    : false,
						posicao    : [],
						dataEstilo : [],
						dimensoes  : [],
						btnTopo    : 0,
						zIndex     : 0,
						sel        : -1,
						objeto     : clonar(main)
					}
					if (controle_indices[_id] === undefined) {
						cont = 0;
						for (x in controle_indices) cont++;
						controle_indices[_id] = cont;
					}
					let ref         = controle_lista[_id];
					let ref2        = main.conteudo.botoes;
					const semBotoes = !ref2.length ? "sem-botoes" : "";
					janId = _id;
					let resultado = document.createElement("div");
					resultado.id = _id;
					resultado.classList.add("janela");
					if (main.estilo.branco) resultado.classList.add("is-bright");
					resultado.innerHTML = "<div class = 'title-bar'>" +
						"<div class = 'title-bar-text'>" + main.conteudo.cabecalho.titulo + "</div>" +
						"<div class = 'title-bar-controls'>" +
							"<button " +
								"id = '" + _id + "-maxmin' " +
								"aria-label = 'Maximize' " +
								"style = 'display:none' " +
								"onclick = 'JP.manutencao.maxmin(" + cont + ")'" +
							"></button>" +
							"<button " +
								"id = '" + _id + "-close'" +
								"aria-label = 'Close' " +
								"style = 'display:none' " +
								"onclick = 'JP.manutencao.fechar(" + cont + ")'" +
							"></button>" +
						"</div>" +
					"</div>" +
					"<div class = 'window-body " + semBotoes + "' id = '" + _id + "-corpo'>" +
						main.conteudo.corpo +
					"</div>" +
					"<footer class = '" + semBotoes + "'>" +
						botoesHTML(ref2, _id) +
					"</footer>";
					elCorpo().appendChild(resultado);
					resultado = document.createElement("style");
					resultado.id = "JP-mov-" + _id;
					elCorpo().appendChild(resultado);
					ref2 = main.conteudo.cabecalho.botoes;
					if (ref2.maximizar) {
						document.getElementById(_id + "-maxmin").style.display = "";
						ref.btnTopo++;
					}
					if (typeof ref2.fechar == "function") {
						document.getElementById(_id + "-close").style.display = "";
						ref.btnTopo++;
					}
					cria_e_altera(main, _id, true);
					if (main.estilo.maximizar) {
						let estilo = document.getElementById(_id).style;
						estilo.visibility = "hidden";
						setTimeout(function() {
							estilo.removeProperty("visibility");
							that.manutencao.maxmin(_id);
						}, 150);
					}
				} else console.error('O parâmetro "obj.id" deve ser do tipo string');
			}
			controle_objetos.push(that2);
		}, 0);

		this.set = new Set();
		this.get = new Get();
	}
}

// Aqui termina o código PRINCIPAL