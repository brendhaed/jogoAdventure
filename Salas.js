import { validate } from "bycontract";
import { Sala, Engine } from "./Basicas.js";
import { ChaveDePrata, ChaveMestra, Martelo, ChaveDeOuro, PeDeCabra } from "./Ferramentas.js";
import { ArmarioCozinha, Quadro, Tabua, Livro, CaixaDeMadeira, Espelho, Porta } from "./Objetos.js";


// Sala Hall de Entrada: onde inicia o jogo

export class HallEntrada extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("hall_entrada",engine);

		let tabua = new Tabua(this);
		this.objetos.set(tabua.nome.toLowerCase(),tabua)

	} 

	usa(nomeFerramenta, nomeObjeto) {
        validate(arguments, ["String", "String"]);

        if (!this.engine.mochila.tem(nomeFerramenta)) {
            return false;
        }

        if (!this.objetos.has(nomeObjeto.toLowerCase())) {
            return false;
        }

        const ferramenta = this.engine.mochila.pega(nomeFerramenta);
        const objeto = this.objetos.get(nomeObjeto.toLowerCase());

        return objeto.usar(ferramenta);
    }

}

// Sala Salão Principal

export class SalaoPrincipal extends Sala {
	constructor(engine) {
        validate(engine,Engine);
		super("salao_principal",engine);

        let quadro = new Quadro(this);
		this.objetos.set(quadro.nome.toLowerCase(),quadro);

		let chaveMestra = new ChaveMestra();
		let peDeCabra = new PeDeCabra();
		this.ferramentas.set(chaveMestra.nome, chaveMestra);
		this.ferramentas.set(peDeCabra.nome, peDeCabra);

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
		super("quarto_secreto",engine);

        let espelho = new Espelho(this);
		this.objetos.set(espelho.nome.toLowerCase(),espelho);

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
		super("cozinha",engine);

        let armario_cozinha = new ArmarioCozinha(this);
		this.objetos.set(armario_cozinha.nome.toLowerCase(),armario_cozinha);

		let martelo = new Martelo();
		this.ferramentas.set(martelo.nome, martelo);

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
		super("biblioteca",engine);

        let livro = new Livro(this);
		this.objetos.set(livro.nome.toLowerCase(),livro);

		let chave_de_prata = new ChaveDePrata();
		this.ferramentas.set(chave_de_prata.nome, chave_de_prata);

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
		super("torre_relogio",engine);

        let caixa_de_madeira = new CaixaDeMadeira(this);
		this.objetos.set(caixa_de_madeira.nome.toLowerCase(),caixa_de_madeira);

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

	pega(nome) {
		const resultado = super.pega(nome);

		// Se o jogador pegou a pista da torre, a chave de ouro é desbloqueada
		if (nome === "pista_torre_do_relogio") {
			const chaveDeOuro = new ChaveDeOuro();
			this.ferramentas.set(chaveDeOuro.nome, chaveDeOuro);
			console.log("\nUma nova ferramenta apareceu na sala: Chave de Ouro!");
		}

		return resultado;
	}
}

// Sala Portão Principal

export class PortaoPrincipal extends Sala {
		constructor(engine) {
        validate(engine,Engine);
		super("portao_principal",engine);

        let porta = new Porta(this);
		this.objetos.set(porta.nome.toLowerCase(),porta);

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