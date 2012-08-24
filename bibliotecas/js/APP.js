
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

//FIM de APP
 