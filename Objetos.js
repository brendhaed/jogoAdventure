import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import {PistaBiblioteca, PistaCozinha, PistaHall, PistaQuartoSecreto, PistaSalao, PistaTorreDoRelogio} from "./Pistas.js";


export class ArmarioCozinha extends Objeto {
	constructor(sala) {
		super("armario"," O armário está fechado", "armario foi aberto" );
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "chave_de_prata") {
            this.acaoOk = true;
            console.log("Você usou a chave de prata no armário da cozinha! Uma pista foi revelada.");
           
			// Criando uma nova pista:
            const novaPista = new PistaCozinha();
            this.sala.adicionaPista(novaPista);

			return true;
        }

        return false;
    }

}

// -----------------------------------------------------------------------------

export class Quadro extends Objeto {
	constructor(sala) {
		super("quadro"," O quadro está preso na parede", "quadro foi solto");
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "martelo") {
            this.acaoOk = true;
            console.log("Você usou o martelo no quadro! Uma pista foi revelada.");

			// Criando uma nova pista:
            const novaPista = new PistaSalao();
            this.sala.adicionaPista(novaPista);

            return true;
        }

        return false;
    }
}

// ------------------------------------------------------------------------------

export class Tabua extends Objeto {
	constructor(sala) {
		super("tabua"," A tábua está pregada", "tábua foi solta");
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "martelo") {
            this.acaoOk = true;
            console.log("Você usou o martelo na tábua! Uma pista foi revelada.");
            
			// Criando uma nova pista:
            const novaPista = new PistaHall();
            this.sala.adicionaPista(novaPista);

            return true;
        }

        return false;
    }
}

// -----------------------------------------------------------------------------

export class Livro extends Objeto {
	constructor(sala) {
		super("livro"," O livro está trancado", "livro foi aberto");
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "chave_mestra") {
            this.acaoOk = true;
            console.log("Você usou a chave mestra no Livro! Uma pista foi revelada.");

			// Criando uma nova pista:
            const novaPista = new PistaBiblioteca();
            this.sala.adicionaPista(novaPista);

            return true;
        }

        return false;
    }
}

// -------------------------------------------------------------------------

export class CaixaDeMadeira extends Objeto {
	constructor(sala) {
		super("caixa_de_madeira"," A caixa está trancada", "caixa de madeira foi aberta");
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "chave_mestra") {
            this.acaoOk = true;
            console.log("Você usou a chave mestra na Caixa de madeira! Uma pista foi revelada.");

			// Criando uma nova pista:
            const novaPista = new PistaTorreDoRelogio();
            this.sala.adicionaPista(novaPista);
            return true;
        }

        return false;
    }
}

// ------------------------------------------------------------------------

export class Espelho extends Objeto {
	constructor(sala) {
		super("espelho"," O espelho está preso", "espelho foi solto");
		this.sala = sala;
	}

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "pe_de_cabra") {
            this.acaoOk = true;
            console.log("Você usou o pé de cabra no espelho! Uma pista foi revelada.");

			// Criando uma nova pista:
            const novaPista = new PistaQuartoSecreto();
            this.sala.adicionaPista(novaPista);

            return true;
        }

        return false;
    }
}


// -----------------------------------------------------------------------------

export class Porta extends Objeto {
    constructor(sala) {
        super("porta", "A porta está fechada", 
			"A porta foi aberta. Parabéns você conseguiu sair do castelo!!"
		);
		this.sala = sala;
};

	usar(ferramenta) {
        validate(ferramenta, Ferramenta);

        if (ferramenta.nome.trim().toLowerCase() === "chave_de_ouro") {
            this.acaoOk = true;
            console.log("Você usou a chave de ouro na Porta e abriu!!");

			// Finalizar o jogo
			this.sala.engine.finalizarJogo();  
            return true;
        }

        return false;
    }
}
