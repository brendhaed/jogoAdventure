import { validate } from "bycontract";
import { Objeto, Ferramenta } from "./Basicas.js";
import { ChaveMestra, Martelo, ChaveDePrata, PeDeCabra, ChaveDeOuro } from "./FerramentasDemo.js";

export class ArmarioCozinha extends Objeto {
	constructor() {
		super("Armario "," O armário está fechado",
			  "O armário está aberto. Abrir com pé de cabra?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof ChaveDePrata) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}

}

// ---------------------------------------------

export class Quadro extends Objeto {
	constructor() {
		super("Quadro "," O quadro está preso na parede",
			  "O quadro está preso na parede. Usar martelo?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof Martelo) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// ---------------------------------------------

export class Tabua extends Objeto {
	constructor() {
		super("Tábua "," A tábua está pregada",
			  "A tábua está pregada. Abrir com martelo?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof Martelo) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// ---------------------------------------------

export class Livro extends Objeto {
	constructor() {
		super("Livro "," O livro está trancado",
			  "O livro está trancado. Usar chave mestra para abrir?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof ChaveMestra) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// ---------------------------------------------

export class CaixaDeMadeira extends Objeto {
	constructor() {
		super("Caixa de madeira "," A caixa está trancada",
			  "A caixa está trancada. Usar chave mestra para abrir?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof ChaveMestra) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}

// ---------------------------------------------

export class Espelho extends Objeto {
	constructor() {
		super("Espelho "," O espelho está preso",
			  "O espelho está preso. Usar pé de cabra para desprender?",
			  "Pegar pista encontrada?");
	}

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof PeDeCabra) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}


// -------------------------------------------------

export class Porta extends Objeto {
    constructor() {
        super("porta", 
			  "A porta está fechada", 
			  "A porta foi aberta. Parabéns você conseguiu sair do castelo!!");
    }

	usar(ferramenta) {
        validate(ferramenta,Ferramenta);
		if (ferramenta instanceof ChaveDeOuro) {
			this.acaoOk = true;
			return true;
		}
		return false;
	}
}
