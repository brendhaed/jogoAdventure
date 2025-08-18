import { Pistas } from "./Basicas.js";

// Pista encontrada na sala Salão Principal
export class PistaSalao extends Pistas {
    constructor() {
        super("pista_salao");
        this.mensagem = "O progresso é sempre a chave do sucesso";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}

// Pista encontrada na sala Hall de Entrada
export class PistaHall extends Pistas {
    constructor() {
        super("pista_hall");
        this.mensagem = "Busque onde o conhecimento pesa mais que as paredes.";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}

// Pista encontrada na sala Biblioteca
export class PistaBiblioteca extends Pistas {
    constructor() {
        super("pista_biblioteca");
        this.mensagem = "A luz revela caminhos, mas também se apaga no tempo.";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}

// Pista encontrada na sala Cozinha
export class PistaCozinha extends Pistas {
    constructor() {
        super("pista_cozinha");
        this.mensagem = "O segredo está onde ninguém vê, mas sempre esteve lá";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}

// Pista encontrada na sala Quarto Secreto
export class PistaQuartoSecreto extends Pistas {
    constructor() {
        super("pista_quarto_secreto");
        this.mensagem = "Quando os ponteiros se alinham, a verdade se revela.";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}

// Pista encontrada na sala Torre do Relógio
export class PistaTorreDoRelogio extends Pistas {
    constructor() {
        super("pista_torre_do_relogio");
        this.mensagem = "Na busca pela saída, ela ilumina onde há escuridão.";
    }
    ler() {
        console.log(this.mensagem);
        return true;
    }
}
