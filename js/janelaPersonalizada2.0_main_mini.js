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

let JP;const JP_evitaCallback=Math.random(),Janelas=function(){let e,o,t=this,n=new Array,r=new Array,a=new Array,c=!0,l=!1,s=!0,d=!1,u=null,f=null,m=null,b=new Array,h=new Array,p=new Array,g=new Array;this.criar=new function(){const e=this;let o=function(e,o){return void 0===e&&(e=0),"number"==typeof e?parseInt(e)==e?(e<0||e>o)&&(console.error("O botão indicado por "+e+" não existe"),e=0):(console.error('O parâmetro "padrao", se declarado, deve ser um inteiro'),e=0):(console.error('O parâmetro "padrao", se declarado, deve ser um número'),e=0),e};this.principal=function(e){return new V(e)},this.alerta=function(o,n,i){let r=!1;void 0===i?i=function(e){}:B("callback",i,"function",!0,!1,!0)||(r=!0),void 0===n?n="Aviso":B("_titulo",n,"string",!0,!1,!1)?n||(n="Aviso"):r=!0;let a=t.recursos.botaoPadrao();return!r&&(a.funcao=function(){t.manutencao.fechar()},e.principal({id:"alerta",conteudo:{cabecalho:{titulo:n,botoes:{maximizar:!1,fechar:function(){i()}}},corpo:"<p>"+o+"</p>",botaoPadrao:0,botoes:[{Ok:a}]},estilo:{maximizar:!1},config:{fechar:{mouse:!1,teclado:!0}}}))},this.confirma=function(n,i,r,a,c){if(B("callback",a,"function",!1,!1,!0)&&B("cancelar",r,"boolean",!1,!1,!0)&&B("_titulo",i,"string",!1,!1,!1)&&B("_conteudo",n,"string",!1,!1,!0)){i||(i="Confirmar");let l=t.recursos.botaoPadrao(),s=I(l);l.letra=0;let d=I(l);l.funcao=function(){a(H({confirma:1}).confirma),t.manutencao.fechar(JP_evitaCallback)},d.funcao=function(){a(H({confirma:0}).confirma),t.manutencao.fechar(JP_evitaCallback)},s.funcao=function(){a(H({confirma:-1}).confirma),t.manutencao.fechar(JP_evitaCallback)};let u=[{Sim:l},{"Não":d}];return r&&u.push({Cancelar:s}),e.principal({id:"confirma",conteudo:{cabecalho:{titulo:i,botoes:{maximizar:!1,fechar:r?function(){a(H({confirma:-1}).confirma)}:-1}},corpo:"<p>"+n+"</p>",botoes:u,botaoPadrao:o(c,r?2:1)},estilo:{maximizar:!1},config:{fechar:{mouse:!1,teclado:r}}})}return!1},this.prompt=function(n,i,r,a,c,l,s){if(B("callback",l,"function",!1,!1,!0)&&B("validar",c,"function",!1,!1,!0)&&B("cancelar",a,"boolean",!1,!1,!0)&&B("_titulo",r,"string",!1,!1,!1)&&B("placeholder",i,"string",!1,!1,!1)&&B("_conteudo",n,"string",!1,!1,!0)){r||(r="Inserindo dados");let d=t.recursos.botaoPadrao(),u=I(d);u.funcao=function(){t.manutencao.fechar()},d.funcao=function(){m=t.recursos.obterUltimo("ativo");let o=document.querySelector("#"+m+" #prompt").value,n=c(o);"boolean"==typeof n?(t.manutencao.fechar(),n?(l(H({prompt:o}).prompt),m=null,f=null):null===f?f=e.alerta("Valor inválido","",(function(){setTimeout((function(){t.manutencao.reabrir(m),m=null}),0)})):f.reabrir()):console.error("A função de validação deve retornar um booleano")};let b=[{Ok:d}];return a&&b.push({Cancelar:u}),e.principal({id:"prompt",conteudo:{cabecalho:{titulo:r,botoes:{maximizar:!1,fechar:a?function(){}:-1}},corpo:"<p>"+n+"</p><input type = 'text' id = 'prompt' style = 'width:100%;margin-bottom:10px' value = '"+i+"' />",botoes:b,botaoPadrao:o(s,a?1:0)},estilo:{maximizar:!1},config:{fechar:{mouse:!1,teclado:a}}})}return!1}},this.alterar=new function(){this.editar=function(e,o){if(B("obj",o,"object",!1,!1,!1)&&T(e,"editar",!1,!0)){let n=M(o,b[e].objeto),i=document.getElementById(e),r=b[e];if(c&&(void 0===a[e]&&(a[e]=new Array),a[e].push(I(r.objeto))),r.objeto=I(n),r.btnTopo=0,n.estilo.branco?i.classList.add("is-bright"):i.classList.remove("is-bright"),"object"==typeof o.conteudo){const t=o.conteudo;"string"==typeof t.cabecalho.titulo&&(document.querySelector("#"+e+" .title-bar-text").innerHTML=n.conteudo.cabecalho.titulo),"string"==typeof t.corpo&&(document.getElementById(e+"-corpo").innerHTML=n.conteudo.corpo),"object"==typeof t.botoes&&(document.querySelector("#"+e+" footer").innerHTML=C(n.conteudo.botoes,e))}let l=n.conteudo.cabecalho.botoes;document.getElementById(e+"-maxmin").style.display=l.maximizar?"":"none",document.getElementById(e+"-close").style.display="function"!=typeof l.fechar?"none":"",l.maximizar&&r.btnTopo++,"function"==typeof l.fechar&&r.btnTopo++;let s=!1;"object"==typeof o.estilo&&(s=["object","string"].indexOf(typeof o.estilo.posicao)>-1||"object"==typeof o.estilo.dimensoes),D(n,e,s),q(t.recursos.obterUltimo("ativo"))}},this.limparEdicoes=function(e,o){if(T(e,"limpar as edições de",!1,!0))try{let n=void 0!==o?a[e].length-o:0;if(void 0!==a[e][n]){c=!1,t.alterar.editar(e,a[e][n]);let o=new Array;for(let t=0;t<n;t++)o.push(a[e][t]);a[e]=o,setTimeout((function(){c=!0}),0)}else console.error(void 0===o?"Não houveram edições feitas nesssa janela":"O número não corresponde a uma quantidade de edições válida")}catch(e){console.error("Não houveram edições feitas nessa janela")}},this.botaoOnOff=function(e,o,t){if(T(e,"manipular o botão de uma",!1,!0))try{const n=b[e].objeto.conteudo;let r=n.botoes,a=[0,""];switch(typeof o){case"string":a[1]=o,r.forEach((e=>{for(x in e)x==o&&(a[0]=i)}));break;case"number":a=[o,L(r[o]).nome]}if(n.botaoPadrao!=a[0]){let o=!0,n=r[a[0]][a[1]];if(void 0===t?(o=!1,t=!n.ativo):B("ativar",t,"boolean",!1,!1,!1)&&(o=!1),!o){if(n.ativo!=t){let o=document.querySelectorAll("#"+e+" footer button");n.ativo=t,o[a[0]].disabled=!t}else console.warn("O botão já estava "+(t?"":"in")+"ativo");t||R()}}else console.error("Não é possível manipular o botão padrão de uma janela.")}catch(e){console.error("O botão indicado não existe")}}},this.recursos=new function(){this.botaoPadrao=function(){return L(I(JP_preferencias.conteudo.botoes[0])).objeto},this.obterUltimo=function(e){let o="";if(["ativo","aberto"].indexOf(e)>-1)for(x in b)b[x][e]&&(o=x);else console.error('O tipo deve ser "ativo" ou "aberto"');return o},this.zIndex=function(e){let o=-1;if(void 0===e)for(x in b)b[x].zIndex>o&&(o=b[x].zIndex);else T(e,"conhecer informações de",!1,!1)&&(o=b[e].zIndex);return-1!=o&&o},this.maxmin=function(e){return T(e,"conhecer informações de",!1,!1),n.indexOf(P(e))>-1}},this.manutencao=new function(){this.maxmin=function(e,o){if(T(e,"maximizar ou restaurar",!0,!0)){"number"==typeof e&&(e=A(e));let a=!1;if(void 0!==o&&(a=!B("maximizado",o,"boolean",!0,!1,!0)),t.recursos.obterUltimo("ativo")==e&&!a){const t=b[e],a=t.objeto.config,c=document.getElementById("JP-estilo");let l=document.getElementById(e),d=l.style;if(t.objeto.conteudo.cabecalho.botoes.maximizar)var i="Maximize"!=(r=document.getElementById(e+"-maxmin")).getAttribute("aria-label");else{var r=null;i=n.indexOf(e)>-1}if(void 0===o&&(o=i),["top","left","width","height"].forEach((e=>{d.removeProperty(e)})),o)null!==r&&r.setAttribute("aria-label","Maximize"),n.splice(n.indexOf(e),1),a.mover&&l.classList.add("draggable"),c.innerHTML+="#"+e+"{width  : "+t.dimensoes[0]+"px;height : "+t.dimensoes[1]+"px}",s=!1,setTimeout((function(){s=!0}),100);else{const o=w(),t=O();c.innerHTML+="#"+e+"{top    : 50%;left   : 50%;width  : "+Math.min(o.width,t.largura)+"px;height : "+Math.min(o.height,t.altura)+"px}",null!==r&&r.setAttribute("aria-label","Restore"),a.mover&&l.classList.remove("draggable"),n.push(e)}setTimeout((function(){X(e,!1)}),100)}}},this.fechar=function(e){const o=e!==JP_evitaCallback;(e=o?P(e):P())==t.recursos.obterUltimo("ativo")&&s&&(U(e),N(!0),s=!1,setTimeout((function(){if(s=!0,o){const o=b[e].objeto.conteudo.cabecalho.botoes.fechar;"function"==typeof o&&o()}}),100)),t.recursos.obterUltimo("aberto")?q(t.recursos.obterUltimo("aberto")):(Array.from(document.querySelectorAll("button")).forEach((e=>{e.disabled=!1})),v()&&(document.getElementById("menuCobrir").style.display="none"))},this.reabrir=function(e){try{"object"==typeof e&&(e=e.id),e=P(e),T(e,"reabrir",!1,!1)&&(document.getElementById(e).style.display="block",b[e].aberto=!0,S(e))}catch(e){}},this.ativar=function(e){T(e,"ativar",!1,!0)&&(S(e),e!=t.recursos.obterUltimo("ativo")&&(setTimeout((function(){R()}),50),setTimeout((function(){N(!1)}),100)))}},this._controle=new function(){this.click=function(e){let o=!0;const n=t.recursos.obterUltimo("ativo");if(JP_mult){let e=new Array;for(x in b)b[x].aberto&&e.push(x);e.forEach((e=>{document.getElementById(e).contains(event.target)&&(S(e),o=!1)}))}if(o){const e=document.getElementById(n);o=null===e||E(!e.contains(event.target),"mouse")}return o},this.keyup=function(e){return E(27==e.keyCode,"teclado")},this.keydown=function(e){let o=!t.recursos.obterUltimo("aberto");if(!o){const o=t.recursos.obterUltimo("ativo");let n=b[o];if([18,37,39].indexOf(e.keyCode)>-1){(18==e.keyCode||n.sel>-1)&&e.preventDefault();const o=n.objeto.conteudo;if([37,39].indexOf(e.keyCode)>-1&&n.sel>-1){const t=o.botoes;let i=new Array;for(let e=0;e<t.length;e++)L(t[e]).objeto.ativo&&i.push(e);let r=i.indexOf(n.sel)+e.keyCode-38;r<0?r=i.length-1:r>i.length-1&&(r=0);let a=i[r];a<i[0]?a=i[i.length-1]:a>i[i.length-1]&&(a=i[0]),R(),W(a,!1),l&&k()}else if(18==e.keyCode){if(R(),l)r=new Array;else{const e=o.botaoPadrao,t=k();t.indexOf(e)>-1?W(e,!0):t.length&&W(t[t.length-1],!0)}l=!l}}else 13==e.keyCode&&n.sel>-1&&n.objeto.conteudo.botoes.length?document.getElementById(o+"_btn"+n.sel).onclick():void 0!==r[e.keyCode]&&r[e.keyCode]()}return o},this.resize=function(){w(),O();for(x in b){let e=b[x].dataEstilo,o=document.getElementById(x);n.indexOf(x)>-1?(o.style.opacity="0",t.manutencao.maxmin(x),setTimeout((function(){t.manutencao.maxmin(x)}),300),setTimeout((function(){o.style.removeProperty("opacity")}),500)):document.querySelector("#"+x+" .title-bar-text").style.removeProperty("margin-right"),e.length&&F(x,document.getElementById("JP-mov-"+x),10*e[1],10*e[0],o.offsetHeight,o.offsetWidth)}},this.executarFuncao=function(e,o){const n=A(e);if(t.recursos.obterUltimo("ativo")==n){const e=L(b[n].objeto.conteudo.botoes[o]).objeto;e.ativo&&e.funcao()}}},setTimeout((function(){j().innerHTML+="<style type = 'text/css' id = 'JP-estilo'>.janela {position: fixed;transform: translate(-50%, -50%);width: max-content}</style>",v()?document.getElementById("menuRes").addEventListener("scroll",_):document.addEventListener("scroll",_)}),0);let v=function(){let e=!0;try{void 0===WLM&&(e=!1)}catch(o){e=!1}return e},j=function(){return v()?document.getElementById("menuRes"):document.body},w=function(){const e=v();let o=document.getElementById("menuRes"),t=document.getElementById(JP_pai);if(d||""==JP_pai||null!==t||(console.warn('O elemento "'+JP_pai+'" não pôde ser configurado em JP_pai pois ele não existe\nAs janelas serão criadas de forma livre'),d=!0),null!==t&&e){t=t.getBoundingClientRect(),o=o.getBoundingClientRect();var n={top:Math.max(t.top,o.top),left:Math.max(t.left,o.left),height:Math.min(t.height,o.height),width:Math.min(t.width,o.width)}}else if(null!==t||e){const e=null!==t?t.getBoundingClientRect():o.getBoundingClientRect();n={top:e.top,left:e.left,height:e.height,width:e.width}}else n={top:0,left:0,height:window.innerHeight,width:window.innerWidth};return n},E=function(e,o){const n=t.recursos.obterUltimo("ativo");return n&&e&&(b[n].objeto.config.fechar[o]?t.manutencao.fechar():J()),!t.recursos.obterUltimo("aberto")},I=function(e){let o=e.constructor===Array?[]:{};for(x in e){let t=e[x];o[x]="object"==typeof t?I(t):t}return o},A=function(e){let o;for(x in h)if(h[x]==e){o=x;break}return o},P=function(e){const o=e;void 0!==e?"number"==typeof e&&(e=A(e)):e=t.recursos.obterUltimo("ativo");const n=t.recursos.obterUltimo("aberto");return e||(e=n),!e&&n?(void 0===o?console.error("É necessário informar um id"):console.error('A janela "'+o+'" não existe'),!1):e},B=function(e,o,t,n,i,r){t.constructor!==Array&&(t=[t]);let a=t.indexOf(typeof o)>-1;n&&(a=a||void 0===o);let c="";for(let e=0;e<t.length;e++)c+=t[e],e<t.length-1&&(c+=e<t.length-2?", ":" ou ");let l=i?'A chave "':'O parâmetro "';return l+=e+'"',n&&(l+=", se definid",l+=i?"a":"o",l+=","),l+=" deve ser ",a?"string"!=typeof o||r?"number"==typeof o&&(parseInt(o)==o?(e.indexOf("altura")>-1||e.indexOf("largura")>-1)&&o&&o<150&&(a=!1,l+="um inteiro igual a 0 ou maior ou igual 150",console.error(l)):(a=!1,l+="um inteiro",console.error(l))):o.indexOf("<")>-1&&o.indexOf(">")>-1&&(a=!1,l+="do tipo "+c+" e não possuir tags HTML",console.error(l)):(l+="do tipo "+c,console.error(l)),a&&void 0!==o},T=function(e,o,t,n){let i=!1;return void 0!==e?(t&&"number"==typeof e&&(e=A(e)),"string"==typeof e?void 0!==b[e]?n?b[e].aberto?i=!0:z()?console.error("As janelas não podem ser construídas se o elemento pai não estiver visível"):console.error("Não é possível "+o+" uma janela que não está aberta"):i=!0:console.error('A janela "'+e+'" não existe'):console.error('O parâmetro "id" deve ser do tipo string')):console.error('O parâmetro "id" não foi definido'),i},O=function(){return{altura:Math.min(j().offsetHeight,window.innerHeight),largura:Math.min(j().offsetWidth,window.innerWidth)}},z=function(){const e=w();return e.top>O().altura||e.top+e.height<0},L=function(e){for(x in e)var o={nome:x,objeto:e[x]};return o},k=function(){const e=t.recursos.obterUltimo("ativo");const o=b[e].objeto.conteudo.botoes;let n=new Array,i=new Array;for(let e=0;e<o.length;e++){let t=L(o[e]).objeto;t.letra>-1&&t.ativo&&(n.push(e),i.push(t.letra))}for(let o=0;o<n.length;o++){let t=document.getElementById(e+"_btn"+n[o]),a=t.innerHTML.substring(i[o],i[o]+1);r[65+"ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(a.toUpperCase())]=t.onclick;let c=t.innerHTML.substring(0,i[o])+"<span style = 'text-decoration:underline'>"+a+"</span>"+t.innerHTML.substring(i[o]+1);t.innerHTML=c}return n},M=function(e,o){let t=e,n="obj",i=I(void 0===o?JP_preferencias:o);if(B(n+".conteudo",t.conteudo,"object",!0,!0,!0)&&(t=t.conteudo,n+=".conteudo",B(n+".cabecalho",t.cabecalho,"object",!0,!0,!0)&&(t=t.cabecalho,n+=".cabecalho",B(n+".titulo",t.titulo,"string",!0,!0,!1)&&(i.conteudo.cabecalho.titulo=t.titulo),B(n+".botoes",t.botoes,"object",!0,!0,!0)&&(t=t.botoes,n+=".botoes",B(n+".maximizar",t.maximizar,"boolean",!0,!0,!0)&&(i.conteudo.cabecalho.botoes.maximizar=t.maximizar),void 0!==t.fechar&&(i.conteudo.cabecalho.botoes.fechar=t.fechar))),t=e.conteudo,n="obj.conteudo",B(n+".corpo",t.corpo,"string",!0,!0,!0)&&(i.conteudo.corpo=t.corpo),void 0!==e.conteudo.botoes)){let o=!1;if(e.conteudo.botoes.constructor===Array){new Array;e.conteudo.botoes.forEach((e=>{if("object"!=typeof e||o)o=!0;else{let t=L(e).objeto;("object"!=typeof t||o||"function"!=typeof t.funcao||"number"!=typeof t.letra||"boolean"!=typeof t.ativo||"string"!=typeof t.descr||parseInt(t.letra)!=t.letra||t.descr.indexOf("<")>-1&&t.descr.indexOf(">")>-1||t.letra<-1||t.letra>L(e).nome.length)&&(o=!0)}}))}else o=!0;o?console.error("Ocorreu um erro na construção dos botões dessa janela"):(i.conteudo.botoes=e.conteudo.botoes,B(n+".botaoPadrao",t.botaoPadrao,"number",!0,!0,!0)&&(t.botaoPadrao>=-1&&t.botaoPadrao<i.conteudo.botoes.length?i.conteudo.botaoPadrao=t.botaoPadrao:console.error('A chave "'+n+'.botaoPadrao", se definida, deve ser um inteiro entre -1 e a quantidade de botoes - 1')))}if(B("obj.estilo",e.estilo,"object",!0,!0,!0)&&(t=e.estilo,n="obj.estilo",B(n+".maximizar",t.maximizar,"boolean",!0,!0,!0)&&(i.estilo.maximizar=t.maximizar),B(n+".branco",t.branco,"boolean",!0,!0,!0)&&(i.estilo.branco=t.branco),B(n+".dimensoes",t.dimensoes,"object",!0,!0,!0)&&(t=t.dimensoes,n+=".dimensoes",B(n+".altura",t.altura,"number",!0,!0,!0)&&(i.estilo.dimensoes.altura=t.altura),B(n+".largura",t.largura,"number",!0,!0,!0)&&(i.estilo.dimensoes.largura=t.largura)),t=e.estilo,B(n+".posicao",t.posicao,["string","object"],!0,!0,!1)&&void 0!==t.posicao))if(n+=".posicao","object"==typeof t.posicao){if(t=t.posicao,void 0!==t.horizontal)if(["esquerda","centro","direita"].indexOf(t.horizontal)>-1)var r=t.horizontal;else console.error('A chave "'+n+'.horizontal", se definida, deve ser do tipo string e ser igual a "esquerda", "centro" ou "direita"');if(void 0!==t.vertical)if(["acima","centro","abaixo"].indexOf(t.vertical)>-1)var a=t.vertical;else console.error('A chave "'+n+'.vertical", se definida, deve ser do tipo string e ser igual a "acima", "centro" ou "abaixo"');i.estilo.posicao={},i.estilo.posicao.horizontal=void 0!==r&&r,i.estilo.posicao.vertical=void 0!==a&&a}else"auto"==t.posicao?i.estilo.posicao=t.posicao:console.error('A chave "'+n+'", se definida, deve ser do tipo object ou uma string igual a "auto"');return B("obj.config",e.config,"object",!0,!0,!0)&&(t=e.config,n="obj.config",B(n+".mover",t.mover,"boolean",!0,!0,!0)&&(i.config.mover=t.mover),B(n+".fechar",t.fechar,"object",!0,!0,!0)&&(t=t.fechar,n+=".fechar",B(n+".mouse",t.mouse,"boolean",!0,!0,!0)&&(i.config.fechar.mouse=t.mouse),B(n+".teclado",t.teclado,"boolean",!0,!0,!0)&&(i.config.fechar.teclado=t.teclado))),i},C=function(e,o){let t="",n=h[o];for(let i=0;i<e.length;i++){let r=L(e[i]).objeto,a=r.descr?" title = '"+r.descr+"'":"",c=r.ativo?"":" disabled";t+="<button onclick = 'JP._controle.executarFuncao("+[n,i].join(",")+")' id = '"+o+"_btn"+i+"'"+a+c+">"+x+"</button>"}return t},H=function(e,o){if(B("json",e,"object",!1,!1,!0)){o=P(o);let t=new Array;for(x in e)p.forEach((t=>{t.id==o&&(t.respostas[x]=e[x])})),t[x]=e[x];return g[o]=t,t}return!1};const J=function(){s&&(u=document.getElementById(t.recursos.obterUltimo("ativo")).classList,u.add("glass"),setTimeout((function(){u.remove("glass")}),50),setTimeout((function(){u.add("glass")}),100),setTimeout((function(){u.remove("glass")}),150))},U=function(e){b[e].aberto=!1,b[e].ativo=!1,b[e].sel=-1,n.splice(n.indexOf(e),1),document.getElementById(e).style.display="none"},_=function(){const e=z();let o=0;for(x in b)if(b[x].aberto){if(e){U(x);const e=b[x].objeto.conteudo.cabecalho.botoes.fechar;"function"==typeof e&&e(),v()&&(document.getElementById("menuCobrir").style.display="none")}else X(x,!1);o++}if(e&&(Array.from(document.querySelectorAll("button")).forEach((e=>{e.disabled=!1})),o>0)){let e=1==o?"A janela":"As janelas";e+=" não ",e+=1==o?"pôde":"puderam",e+=" ser redimensionada",o>1&&(e+="s"),e+=" no espaço destinado a ela",o>1&&(e+="s"),e+=" e ",e+=1==o?"foi":"foram",e+=" fechada",o>1&&(e+="s"),null!==document.getElementById(JP_pai)&&(e+="\nEscolha um elemento pai diferente"),console.warn(e)}},q=function(e){let o=e!=t.recursos.obterUltimo("ativo");for(x in Array.from(document.querySelectorAll("button")).forEach((e=>{e.disabled=!0})),b)if(Array.from(document.querySelectorAll("#"+x+" *")).forEach((e=>{e.disabled=!1})),Array.from(document.querySelectorAll("#"+x+(JP_mult?" footer":"")+" *, #"+x+" button, #"+x+" input[type=checkbox]")).forEach((o=>{o.disabled=x!=e,x!=e&&"BUTTON"==o.tagName&&o.classList.remove("focado")})),b[x].ativo=x==e,document.getElementById(x).classList.remove("active"),x==e){lista=document.querySelectorAll("#"+x+" footer button");for(let o=0;o<lista.length;o++)lista[o].disabled=!L(b[e].objeto.conteudo.botoes[o]).objeto.ativo}o&&N(!0),document.getElementById(e).classList.add("active");let n=2;for(x in b){let e;if(b[x].aberto?(e=n,n+=1):e=0,b[x].zIndex=e,document.getElementById(x).style.zIndex=e,v()){document.getElementById("menu").style.zIndex=e+1;let o=document.getElementById("menuCobrir").style;o.display="block",o.zIndex=e+2}}},S=function(e){setTimeout((function(){if(e=P(e)){let o=b[e];delete b[e],b[e]=o,q(e)}}),50)},R=function(){for(x in b){let o=b[x];if(o.aberto){let t=o.objeto.conteudo.botoes;for(let o=0;o<t.length;o++){let n=document.getElementById(x+"_btn"+o);for(y in n.classList.remove("focado"),t[o])var e=y;n.innerHTML=e}o.sel=-1}}},W=function(e,o){const n="Foi solicitado um botão que não ";let i=t.recursos.obterUltimo("ativo"),r=b[i];const a=r.objeto.conteudo.botoes;if(e>-1&&e<a.length){let c=new Array;for(let e=0;e<a.length;e++)L(a[e]).objeto.ativo&&c.push(e);c.indexOf(e)>-1?setTimeout((function(){try{i=t.recursos.obterUltimo("ativo"),r=b[i],r.sel=e,document.getElementById(i+"_btn"+r.sel).classList.add("focado")}catch(e){}}),o?100:0):console.error(n+"está ativo.")}else console.error(n+"existe.")},N=function(e){setTimeout((function(){const o=t.recursos.obterUltimo("ativo");if(o){const t=b[o].objeto.conteudo.botaoPadrao;t>-1&&(R(),W(t,e))}}),0)},F=function(e,o,t,n,i,r){const a="JP-estilo"==o.id;a&&(5==t&&(i=0),5==n&&(r=0));const c="#"+e+"{top  : calc("+10*t+"% "+(t<5||!a?"+":"-")+" "+i/2+"px);left : calc("+10*n+"% "+(n<5||!a?"+":"-")+" "+r/2+"px)}";if(a)for(x in o.innerHTML+=c,b){let e=document.getElementById("JP-mov-"+x);null!==e&&(e.innerHTML="")}else o.innerHTML=c},X=function(e,o){const t=document.getElementById(e),n=getComputedStyle(t),i=b[e],r=i.dimensoes;i.objeto.estilo.posicao;let a=t.style,c=w(),l={top:parseInt(n.top.replace("px","")),left:parseInt(n.left.replace("px","")),width:parseInt(n.width.replace("px","")),height:parseInt(n.height.replace("px",""))};l.top-=l.height/2,l.left-=l.width/2;const s=l.top<c.top||l.top<0,d=l.left<c.left||l.left<0,u=l.width<r[0],f=l.height<r[1],m=l.left+l.width>c.left+c.width,h=l.top+l.height>c.top+c.height;c.top<0&&(c.top=0),c.left<0&&(c.left=0);const p=!m&&!h;a.removeProperty("top"),a.removeProperty("left"),a.visibility=o?"":"hidden",u?a.width=r[0]+"px":m&&(!d&&l.left-10>c.left?a.left=l.left-10+"px":a.width=l.width-10+"px"),f?a.height=r[1]+"px":h&&(!s&&l.top-10>c.top?a.top=l.top-10+"px":a.height=l.height-10+"px"),s&&(a.top=c.top+l.height/2+"px"),d&&(a.left=c.left+l.width/2+"px"),o||setTimeout((function(){X(e,p)}),p?100:0)},D=function(i,r,a){let c=document.getElementById("JP-estilo"),l=document.getElementById(r),s=document.getElementById(r+"-maxmin"),d=document.getElementById(r+"-close").style,u=b[r],f=i.estilo.dimensoes,m=0,h=0,p=new Array,g=new Array;const y=f.altura>=150?f.altura:l.offsetHeight,v=f.largura>=150?f.largura:l.offsetWidth;for(x in b){let e=b[x];e.aberto&&(p.push(e.posicao[0]),g.push(e.posicao[1]),m++)}if(a){if("object"==typeof i.estilo.posicao){let e=i.estilo.posicao;switch(e.vertical){case"acima":var j=0;break;case"centro":j=5;break;case"abaixo":j=10}switch(e.horizontal){case"esquerda":var E=0;break;case"centro":E=5;break;case"direita":E=10}void 0!==j&&h++,void 0!==E&&h++}if(h<2){if(m>1){const e=void 0===j,o=void 0===E;let t=0;do{e&&(j=Math.floor(9*Math.random())+1),o&&(E=Math.floor(9*Math.random())+1),t++}while((p.indexOf(j)>-1&&e||g.indexOf(E)>-1&&o)&&t<10);t>=10&&console.warn("Há muitas janelas abertas, isso pode provocar lentidão.")}else void 0===j&&(j=5),void 0===E&&(E=5);F(r,c,j,E,y,v)}else F(r,c,j,E,y,v)}switch(f.altura>=150&&(c.innerHTML+="#"+r+"{height : "+f.altura+"px}"),c.innerHTML+=f.largura<=150?"#"+r+" .title-bar-text{margin-right:"+(35+100*(i.conteudo.botoes.length-1)+(135-50*u.btnTopo))+"px}":"#"+r+"{width : "+f.largura+"px}",u.posicao=[j,E],f=s.parentElement.style,s=s.style,f.visibility=u.btnTopo?"":"hidden",u.dimensoes=[v,y],u.btnTopo){case 1:u.objeto.conteudo.cabecalho.botoes.maximizar?(f.borderRightWidth="0px",s.borderBottomRightRadius="5px"):d.borderBottomLeftRadius="5px";break;case 2:f.removeProperty("border-right-width"),d.removeProperty("border-bottom-left-radius"),s.removeProperty("border-bottom-right-radius")}i.config.mover?l.classList.add("draggable"):l.classList.remove("draggable"),Array.from(document.querySelectorAll(".janela .title-bar")).forEach((e=>{let o=e.parentElement.id;b[o].objeto.conteudo.cabecalho.botoes.maximizar&&(e.ondblclick=function(){b[o].objeto.conteudo.cabecalho.botoes.maximizar&&t.manutencao.maxmin(o)})})),Array.from(document.getElementsByClassName("janela")).forEach((i=>{let r=i.id,a=b[r],c=i.firstElementChild;i.className.indexOf("draggable")>-1?(c.onmousedown=function(c){let l=!1;Array.from(document.getElementsByClassName("title-bar-controls")).forEach((e=>{e.contains(c.target)&&(l=!0)})),-1!=n.indexOf(r)||l||t.recursos.obterUltimo("ativo")!=r||(a.movendo=!0,e=c.clientX-i.offsetWidth/2-i.getBoundingClientRect().left,o=-.5169492*i.offsetHeight+18)},c.onmouseout=function(){a.movendo=!1}):c.onmousedown=function(){},document.addEventListener("mousemove",(t=>{if(a.movendo&&a.objeto.config.mover){let n=w(),c=t.clientX-e,l=t.clientY-o,s=i.offsetWidth/2;if(c>=s){let e=window.innerWidth-s;c>e&&(c=e)}else c=s;for(;c+s>n.left+n.width;)c--;for(;c-s<n.left;)c++;let d=(c-s)/window.innerWidth;if(s=i.offsetHeight/2,l>=s){let e=window.innerHeight-s;l>e&&(l=e)}else l=s;for(;l+s>n.top+n.height;)l--;for(;l-s<n.top;)l++;let u=(l-s)/window.innerHeight;a.dataEstilo=[d,u],F(r,document.getElementById("JP-mov-"+r),10*u,10*d,i.offsetHeight,i.offsetWidth)}})),document.addEventListener("mouseup",(()=>{a.movendo=!1}))})),_(),setTimeout((function(){t.manutencao.ativar(r),N(!0),X(r,!1)}),100)},V=function(e){let o,n=this,i=function(e){let t=!1;return void 0===o?console.error("Não é possível "+e+" uma janela na mesma função que a criou."):t=!0,t};setTimeout((function(){if(o="",n.respostas=new Array,B("obj",e,"object",!0,!0,!0)){let n=M(e);if(void 0===e.id&&(e.id="janela"),"string"==typeof e.id){let i=1;for(x in b)x==e.id+i&&i++;let r=e.id+i;if(b[r]={aberto:!0,ativo:!0,movendo:!1,posicao:[],dataEstilo:[],dimensoes:[],btnTopo:0,zIndex:0,sel:-1,objeto:I(n)},void 0===h[r]){for(x in i=0,h)i++;h[r]=i}let a=b[r],c=n.conteudo.botoes;const l=c.length?"":"sem-botoes";o=r;let s=document.createElement("div");if(s.id=r,s.classList.add("janela"),n.estilo.branco&&s.classList.add("is-bright"),s.innerHTML="<div class = 'title-bar'><div class = 'title-bar-text'>"+n.conteudo.cabecalho.titulo+"</div><div class = 'title-bar-controls'><button id = '"+r+"-maxmin' aria-label = 'Maximize' style = 'display:none' onclick = 'JP.manutencao.maxmin("+i+")'></button><button id = '"+r+"-close'aria-label = 'Close' style = 'display:none' onclick = 'JP.manutencao.fechar("+i+")'></button></div></div><div class = 'window-body "+l+"' id = '"+r+"-corpo'>"+n.conteudo.corpo+"</div><footer class = '"+l+"'>"+C(c,r)+"</footer>",j().appendChild(s),s=document.createElement("style"),s.id="JP-mov-"+r,j().appendChild(s),c=n.conteudo.cabecalho.botoes,c.maximizar&&(document.getElementById(r+"-maxmin").style.display="",a.btnTopo++),"function"==typeof c.fechar&&(document.getElementById(r+"-close").style.display="",a.btnTopo++),D(n,r,!0),n.estilo.maximizar){let e=document.getElementById(r).style;e.visibility="hidden",setTimeout((function(){e.removeProperty("visibility"),t.manutencao.maxmin(r)}),150)}}else console.error('O parâmetro "obj.id" deve ser do tipo string')}p.push(n)}),0),this.set=new function(){this.editar=function(e){i("editar")&&t.alterar.editar(o,e)},this.limparEdicoes=function(e){i("limpar as edições de")&&t.alterar.limparEdicoes(o,e)},this.ativar=function(){i("ativar")&&t.manutencao.ativar(o)},this.fechar=function(){i("fechar")&&t.manutencao.fechar(o)},this.reabrir=function(){i("reabrir")&&t.manutencao.reabrir(o)},this.maxmin=function(e){i("maximizar ou restaurar")&&t.manutencao.maxmin(o,e)},this.botaoOnOff=function(e,n){i("ativar ou desativar um botao de")&&t.alterar.botaoOnOff(o,e,n)}},this.get=new function(){const e="conhecer informações de";this.id=function(){return i(e)?o:""},this.zIndex=function(){return i(e)?t.recursos.zIndex(o):-1},this.maxmin=function(){return i(e)?t.recursos.maxmin(o):null}}}};

// Aqui termina o código PRINCIPAL