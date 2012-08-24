
//Início de APP

/**
 * Singleton Pattern
 * O seu projeto JS em um objeto literal (JSON)
 * Sugerido por: Dennis Calazans
 * Veja mais em www.denniscalazans.com/js
 * 
 * Problema 
 * Como modularizar o meu projeto, proteger a estrutura, tornar o código manutenível
 * 
 * Solução
 * Criar apenas uma variável global e utilizar notação de objeto
 * 
 * Quando aplicar
 * Projetos pequenos - Como ferramenta para namespace.
 * Projetos médios - Como forma de agrupar códigos relacionados.
 * Projetos grandes e complexos - Como ferramenta de otimização  (Ver Pro JavaScript Design Patterns, capítulo 5).
 *
 * Algumas sugestões para organização:
 *  
 * Atributos - começam com _ e caixa baixa, segue com o padrão camelCase
 * APP._titulo = "Atributos começam com _";
 *
 * Métodos - começam com caixa baixa, segue com padrão camelCase
 * APP.retornarTitulo = function() {
 *	return this._titulo;
 * }
 * 
 * Módulos - começam com caixa alta, segue com padrão camelCase
 *  APP.Mudulo = {
 * 		_atributo: "valor" 
 * }
 * 
 * Colaboradores:
 * - Brenda Barros 
 * - Ciclone Andrade
 * - Pablo Reis
 **/

//Existe APP? Sim. Então usa. Não. Então cria.
var APP = APP || {};

//Propriedade que será executa em todos os módulos
APP._nameSpace = "APP";

//Inicia o APP
APP.iniciar = function(Modulo) {
	
	//Se algum Modulo for especificado, executa o setUp de App	
	if(Modulo !== undefined && Modulo !== APP) APP.setUp();

	//Caso o Modulo seja omitido, TODOS os módulos de APP serão iniciados
	this.iniciarModulos(Modulo || APP);
};

//Quando o APP for iniciado
APP.setUp = function() {
	console.debug('APP iniciado');
};

//Inicícia todos os módulos
APP.iniciarModulos = function(Modulo) {
	var Filho;

	if(typeof Modulo != "object") return false;
	
	//Executa o método construtor do módulo, se existir
	if(Modulo.hasOwnProperty('setUp') && typeof Modulo.setUp == "function") {
		Modulo.setUp();
	}
	
	//Procura por Sub Módulos para fazer a mesma coisa
	for(Filho in Modulo) {
		

		if(Modulo.hasOwnProperty(Filho) === true) {
			if(Modulo[Filho] !== null && typeof Modulo[Filho] == "object") {
				
				//Permite a navegação em níveis superiores do namespace
				Modulo[Filho]['pai'] = function() {
					return Modulo;
				};


				//Cria em cada módulo a propriedade _nameSpace
				//Ex: App.Contato.Formulario._nameSpace = App.Contato.Formulario
				Modulo[Filho]['_nameSpace'] = (Modulo['_nameSpace'] || "APP") + '.'+Filho;

				
				APP.iniciarModulos(Modulo[Filho]);
			}
		}
	}
	
	return false;
};

/**
 *	Executa um método a partir de um nameSpace e pode receber um array de parâmetros da função
 *	Ex: APP.nameSpace("APP.ModuloPai.ModuloFilho.meuMetodo", ["parametro1", "parametro2"]);
 * 	O método retornará o resultado do método apontado no name space
 */
APP.nameSpace = function(nameSpace, arrayDeParametros) {
	//Declaração de variáveis;
	var node, no, escopos, i;

	//Remove a obrigatoriedade de informar o segundo parâmetro
	arrayDeParametros = arrayDeParametros || [];

		//Escopos encontrados
		escopos = [window],

		//Nós do nameSpace
		nos = nameSpace.split('.');

		//Para cada nó
		for(i=0;i<nos.length;i++) {
			no = nos[i];

			//Verifica se não é do protótipo
			if(escopos[i].hasOwnProperty(no)) {

				//Guarda o escpo encontrado
				escopos.push(escopos[i][no]);
			}
		}

		//Se a última referência encontrada
		if(typeof escopos[escopos.length-1] == 'function') {

			return escopos[escopos.length-1]
						.apply(escopos[escopos.length-2], arrayDeParametros);
		} else {
			return escopos[escopos.length-1];
		}
}

//FIM de APP