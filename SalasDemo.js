import { validate } from "bycontract";
import { Sala, Engine, Ferramenta, Objeto } from "./Basicas.js";
import { ChaveDePrata, ChaveMestra, Martelo, ChaveDeOuro, PeDeCabra } from "./FerramentasDemo.js";
import { ArmarioCozinha, Quadro, Tabua, Livro, CaixaDeMadeira, Espelho, Porta } from "./ObjetosDemo.js";
import { PistaBiblioteca, PistaCozinha, PistaHall, PistaQuartoSecreto, PistaSalao, PistaTorreDoRelogio } from "./Pistas.js";

// Sala Hall de Entrada

export class HallEntrada extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Hall_de_Entrada",engine);

		let tabua = new Tabua();
		this.objetos.set(tabua.nome,tabua)

		let pista_hall = new PistaHall();
		this.pistas.set(pista_hall.nome, pista_hall);
	} 

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let tabua = this.objetos.get(objeto);
		return tabua.usar(this.engine.mochila.pega(ferramenta));
	}
}

// Sala Salão Principal

export class SalaoPrincipal extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Salao_Principal",engine);

        let quadro = new Quadro();
		this.objetos.set(quadro.nome,quadro);

		let chaveMestra = new ChaveMestra();
		let peDeCabra = new PeDeCabra();
		this.ferramentas.set(chaveMestra.nome, chaveMestra);
		this.ferramentas.set(peDeCabra.nome, peDeCabra);

		let pista_salao = new PistaSalao();
		this.pistas.set(pista_salao.nome, pista_salao);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let quadro = this.objetos.get(objeto);
		return quadro.usar(this.engine.mochila.pega(ferramenta));
	}
	
}

// Sala Quarto secreto

export class QuartoSecreto extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Quarto_secreto",engine);

        let espelho = new Espelho();
		this.objetos.set(espelho.nome,espelho);

		let pista_quarto_secreto = new PistaQuartoSecreto();
		this.pistas.set(pista_quarto_secreto.nome, pista_quarto_secreto);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let espelho = this.objetos.get(objeto);
		return espelho.usar(this.engine.mochila.pega(ferramenta));
	}
}

// Sala Cozinha

export class Cozinha extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("Cozinha",engine);

        let armario_cozinha = new ArmarioCozinha();
		this.objetos.set(armario_cozinha.nome,armario_cozinha);

		let martelo = new Martelo();
		this.ferramentas.set(martelo.nome, martelo);

		let pista_cozinha = new PistaCozinha();
		this.pistas.set(pista_cozinha.nome, pista_cozinha);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
        let armario_cozinha = this.objetos.get(objeto);
		return armario_cozinha.usar(this.engine.mochila.pega(ferramenta));
	}
}

// Sala Biblioteca

export class Biblioteca extends Sala {
		constructor(engine) {
        validate(engine,Engine);
		super("Biblioteca",engine);

        let livro = new Livro();
		this.objetos.set(livro.nome,livro);

		let chave_de_prata = new ChaveDePrata();
		this.ferramentas.set(chave_de_prata.nome, chave_de_prata);

		let pista_biblioteca = new PistaBiblioteca();
		this.pistas.set(pista_biblioteca.nome, pista_biblioteca);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
		let livro = this.objetos.get(objeto);
		return livro.usar(this.engine.mochila.pega(ferramenta));
	}

}

// Sala Torre do Relogio

export class TorreDoRelogio extends Sala {
		constructor(engine) {
        validate(engine,Engine);
		super("Torre_do_relogio",engine);

        let caixa_de_madeira = new CaixaDeMadeira();
		this.objetos.set(caixa_de_madeira.nome,caixa_de_madeira);

		let chave_de_ouro = new ChaveDeOuro();
		this.ferramentas.set(chave_de_ouro.nome, chave_de_ouro);

		let pista_torre_do_relogio = new PistaTorreDoRelogio();
		this.pistas.set(pista_torre_do_relogio.nome, pista_torre_do_relogio);
	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
		let caixa_de_madeira = this.objetos.get(objeto);
		return caixa_de_madeira.usar(this.engine.mochila.pega(ferramenta));
	}

}

// Sala Portão Principal

export class PortaoPrincipal extends Sala {
		constructor(engine) {
        validate(engine,Engine);
		super("portao_principal",engine);

        let porta = new Porta();
		this.objetos.set(porta.nome,porta);

	}

	usa(ferramenta,objeto) {
		validate(arguments,["String","String"]);
		if (!this.engine.mochila.tem(ferramenta)){
			return false;
		}
		if (!this.objetos.has(objeto)){
			return false;
		}
		let caixa_de_madeira = this.objetos.get(objeto);
		return caixa_de_madeira.usar(this.engine.mochila.pega(ferramenta));
	}

}
