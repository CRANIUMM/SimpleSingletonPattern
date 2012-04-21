
//Início de APP.ModuloComplexo
var APP  = APP || {};

APP.ModuloPai = {
	
	_nome: "Nestor",
	
	//Quando iniciar o módulo
	setUp: function() {
		console.debug("APP.ModuloPai iniciado");
		
		console.debug(">>> Acessando _nome do ModuloFilho", this.ModuloFilho._nome);
	},
	
	ModuloFilho: {
		
		_nome: "Dennis",
		
		//Quando iniciar o módulo filho
		setUp: function() {
			console.debug("APP.ModuloComplexo.ModuloFilho iniciado");
			
			console.debug(">>> Acessando _nome de ModuloPai", this.pai()._nome);
		}
	}
};
//FIM de APP.ModuloComplexo
 