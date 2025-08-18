import {Ferramenta} from "./Basicas.js";

// Ferramenta Chave Mestra
export class ChaveMestra extends Ferramenta {
	constructor() {
		super("chave_mestra");
	}
}
// Ferramenta Martelo
export class Martelo extends Ferramenta {
	constructor() {
		super("martelo");
	}
}

// Ferramenta Pe de Cabra
export class PeDeCabra extends Ferramenta {
	constructor() {
		super("pe_de_cabra");
	}
}
// Ferramenta Chave de Prata
export class ChaveDePrata extends Ferramenta {
	constructor() {
		super("chave_de_prata");
	}
}
// Ferramenta Chave de Ouro
export class ChaveDeOuro extends Ferramenta {
	constructor() {
		super("chave_de_ouro");
	}
}
