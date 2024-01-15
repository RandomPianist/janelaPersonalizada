/*
JANELA PERSONALIZADA 2.0 © 2023
Desenvolvido por Reynolds Costa, no Notepad++

O uso é permitido; a comercialização, proibida.
*/

/*
                       ------------------
Esse arquivo contém as |==PREFERÊNCIAS==|
                       ------------------
Todas as janelas terão essas características.
Você pode mudá-las aqui para a página inteira ou trabalhá-las caso a caso ao usar as funções disponíveis no objeto JP.
Para saber como usar as funções, verifique a documentação.

AVISO:
As preferências podem ser alteradas modificando OS VALORES DAS CHAVES listadas abaixo.
Alterar AS CHAVES em si (i.e., seus nomes ou estruturas), bem como excluí-las, contudo, resultará em erro.
Portanto, altere com cuidado.
*/

/*
Abaixo, declara-se a propriedade booleana "JP_mult".
Quando verdadeira, permite que clicar sobre uma janela que esteja atrás na pilha de janelas tome a dianteira sobre suas irmãs.
Apesar de não ser uma constante, recomenda-se, para a facilitação no processo de debug, que a alteração dessa propriedade
seja feita apenas uma vez e apenas aqui.
*/
let JP_mult = false;

/*
Abaixo, declara-se a propriedade "JP_pai".
Essa propriedade contém o id do elemento que conterá e restringirá as janelas.
Caso seja deixada em branco, as janelas poderão ser redimensionadas e movidas por todo o corpo do documento.
*/
const JP_pai = "principal";

/*
Abaixo, declara-se o objeto "JP_preferencias".
Esse é o objeto principal ao qual esse arquivo faz referência.
*/
let JP_preferencias = {
	conteudo : {
		cabecalho : {
			/*
			Abaixo, declara-se a chave "titulo".
			Esse será o título padrão das janelas, se não alterado pelos parâmetros declarados ao se utilizar as funções disponíveis no objeto JP.
			*/
			titulo : "Nenhum título foi inserido", // String sem tags HTML
			botoes : {
				maximizar : true, // Booleano que define se o cabeçalho terá o botão maximizar
				/*
				Abaixo, declara-se a chave "fechar".
				Caso seja uma função, terá como gatilho o botão fechar no cabeçalho da janela.
				Caso tenha qualquer valor que não seja uma função, excluirá do cabeçalho o botão fechar.
				Nessa função, NÃO se deve escrever JP.manutencao.fechar(), pois a função naturalmente já fechará a janela,
				e escrever isso fará com que, caso haja mais de uma janela aberta, mais de uma janela seja fechada e,
				caso não, resultará em erro.
				*/
				fechar : -1 // Função caso deseje o botão fechar, qualquer caso não deseje.
			}
		},
		/*
		Abaixo, declara-se a chave "corpo".
		Esse será o corpo padrão das janelas, se não alterado pelos parâmetros declarados ao se utilizar as funções disponíveis no objeto JP.
		Não é recomendado alterá-la aqui, posto que se, eventualmente, esse corpo for visto,
		significará um erro que poderá ser corrigido mais facilmente seguindo as instruções nele contidas.
		Caso, ainda assim, se deseje alterá-lo, seu valor deverá ser uma string.
		*/
		corpo :
			"<p>Ocorreu um erro. Nenhum corpo foi escrito nessa janela.</p>" +
			"<p>" +
				"Para escrever o corpo de uma janela, declare como argumento dessa função" +
				"<br />" +
				"um objeto com a chave " +
				"<b>conteudo</b> " +
				"e a sub-chave " +
				"<b>corpo</b>." +
			"</p>" +
			"<p>" +
				"O valor da chave " +
				"<b>corpo</b> " +
				"deverá ser uma string." +
			"</p>",
		/*
		Abaixo, declara-se a chave "botoes".
		É um vetor com os botões da janela. Caso não queira inserir nenhum botão, basta passar um vetor vazio.
		*/
		botoes : [
			/*
			Abaixo, está a criação de um botão.
			Os botões das janelas têm como nome a legenda que terão (nesse caso, "Ok")
			e, por isso, não é possível a criação de botões com nomes iguais.
			A declaração de nenhum botão é obrigatória, mas, uma vez declarado,
			o botão precisa obrigatoriamente ter todos os atributos nele contidos.
			*/
			{
				"Ok" : {
					/*
					Abaixo, atribui-se uma função ao botão.
					Por padrão, todas as janelas terão um botão "Ok" que fecha a janela.
					*/
					funcao : function() {
						JP.manutencao.fechar();
					},
					/*
					Abaixo, declara-se a chave "letra".
					É um inteiro em base 0 relativo à string título do botão.
					Quando 0 ou mais, é o índice da letra no título do botão que será sublinhada ao se pressionar a tecla Alt.
					Se sublinhada, a letra se torna gatilho para a função do botão.
					Quando -1, impossibilita essa característica e não sublinha letra alguma ao se pressionar Alt.
					Ainda será possível disparar a função do botão com o teclado ao se pressionar Enter caso ele esteja selecionado
					(as setas esquerda e direita servem para alternar a seleção entre botões ativos) e com o mouse ao se clicar nele.
					*/
					letra : -1, // Inteiro entre -1 e o tamanho do título do botão - 1
					/*
					Abaixo, declara-se a chave "descr".
					É a descrição auxiliar que surgirá em uma caixa ao se mover o mouse pelo botão.
					Caso vazia, não mostrará caixa alguma.
					*/
					descr : "", // String sem tags HTML
					ativo : true // Booleano que define se o botão estará ativo
				}
			}
		],
		/*
		Abaixo, declara-se a chave "botaoPadrao".
		É um inteiro em base 0 relativo à quantidade de botões.
		Quando 0 ou mais, faz referência à posição do botão que iniciará selecionado.
		Quando -1, impossibilita essa característica e não seleciona nenhum botão previamente.
		Ainda será possível selecionar um botão caso algum dos botões tenha o atributo "letra" maior que -1.
		Não é possível selecionar como padrão nenhum botão que não esteja ativo e não é possível inativar nenhum botão padrão.
		*/
		botaoPadrao : -1 // Inteiro entre -1 e a quantidade de botões - 1, devendo ser diferente do índice de qualquer botão inativo.
	},
	estilo : {
		maximizar : false, // Booleano que define se a janela iniciará maximizada
		branco    : true, // Booleano que define se a janela terá o corpo destacado em branco ou se a cor do corpo será igual à da janela
		posicao   : "auto", // String ou objeto. Verifique a documentação para mais informações
		dimensoes : {
			/*
			Abaixo, declara-se a chave "altura".
			É um inteiro que faz referência à altura da janela em pixels.
			Atribuir 0 fará com que a janela assuma altura dinâmica.
			Atribuir números menores que 150 e diferentes de 0 será inefetivo.
			*/
			altura  : 0, // Inteiro igual a 0 ou maior ou igual a 150
			/*
			Abaixo, declara-se a chave "largura".
			É um inteiro que faz referência à largura da janela em pixels.
			Atribuir 0 fará com que a janela assuma largura dinâmica.
			Atribuir números menores que 150 e diferentes de 0 será inefetivo.
			*/
			largura : 0 // Inteiro igual a 0 ou maior ou igual a 150
		}
	},
	config : {
		mover  : true, // Booleano que define se será possível mover a janela quando não maximizada
		fechar : {
			/*
			Abaixo, declara-se a chave booleana "mouse".
			Quando verdadeira, define como possível o fechamento da janela ao se clicar fora da área dela.
			Quando falsa, clicar fora da janela exibirá uma animação nas bordas e no cabeçalho.
			*/
			mouse   : false,
			teclado : true // Booleano que define se será possível fechar a janela pressionando Esc
		}
	}
};