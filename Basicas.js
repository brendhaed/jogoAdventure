import { validate } from "bycontract";
import promptsync from 'prompt-sync';
const prompt = promptsync({ sigint: true });

//  Classe Ferramenta
export class Ferramenta {
    #nome;

    constructor(nome) {
        validate(nome, "String");
        this.#nome = nome;
    }

    get nome() {
        return this.#nome;
    }

    usar() {
        return true;
    }
}

// Classe Pistas 
export class Pistas extends Ferramenta {
    constructor(nome) {
        super(nome);
        this.mensagem = ""; 
    }
}

// Classe Mochila
export class Mochila {
    #ferramentas;

    constructor() {
        this.#ferramentas = [];
    }

    guarda(item) {
        if (item instanceof Ferramenta) {
            this.#ferramentas.push(item);
        } else {
            console.log(" Não é possível guardar este item.");
        }
    }

    pega(nome) {
        validate(nome, "String");
        return this.#ferramentas.find(f => f.nome === nome);
    }

    tem(nome) {
        validate(nome, "String");
        return this.#ferramentas.some(f => f.nome === nome);
    }

    inventario() {
        if (this.#ferramentas.length === 0) {
            return "(vazio)";
        }
        return this.#ferramentas.map(obj => obj.nome).join(", ");
    }
}

// Classe Objeto
export class Objeto {
    #nome;
    #descricaoAntesAcao;
    #descricaoDepoisAcao;
    #acaoOk;

    constructor(nome, descricaoAntesAcao, descricaoDepoisAcao) {
        validate(arguments, ["String", "String", "String"]);
        this.#nome = nome;
        this.#descricaoAntesAcao = descricaoAntesAcao;
        this.#descricaoDepoisAcao = descricaoDepoisAcao;
        this.#acaoOk = false;
    }

    get nome() {
        return this.#nome;
    }

    get acaoOk() {
        return this.#acaoOk;
    }

    set acaoOk(acaoOk) {
        validate(acaoOk, "Boolean");
        this.#acaoOk = acaoOk;
    }

    get descricao() {
        if (!this.acaoOk) {
            return this.#descricaoAntesAcao;
        } else {
            return this.#descricaoDepoisAcao;
        }
    }

    usar(ferramenta) {
        return false;
    }
}

// Classe Sala
export class Sala {
    #nome;
    #objetos;
    #ferramentas;
    #portas;
    #pistas;
    #engine;

    constructor(nome, engine) {
        validate(arguments, ["String", Engine]);
        this.#nome = nome;
        this.#objetos = new Map();
        this.#ferramentas = new Map();
        this.#portas = new Map();
        this.#pistas = new Map();
        this.#engine = engine;
    }

    get nome() {
        return this.#nome;
    }

    get objetos() {
        return this.#objetos;
    }

    get ferramentas() {
        return this.#ferramentas;
    }

    get portas() {
        return this.#portas;
    }

    get pistas() {
        return this.#pistas;
    }

    get engine() {
        return this.#engine;
    }

    objetosDisponiveis() {
        const arr = [...this.#objetos.values()];
        return arr.map(obj => obj.nome + " : " + obj.descricao);
    }

    ferramentasDisponiveis() {
        const arr = [...this.#ferramentas.values()];
        return arr.map(f => f.nome);
    }

    pistasDisponiveis() {
        const arr = [...this.#pistas.values()];
        return arr.map(p => `"${p.mensagem}"`);
    }

    portasDisponiveis() {
        const arr = [...this.#portas.values()];
        return arr.map(sala => sala.nome);
    }

    pega(nome) {
        validate(nome, "String");

        if (this.#ferramentas.has(nome)) {
            const ferramenta = this.#ferramentas.get(nome);
            this.#engine.mochila.guarda(ferramenta);
            this.#ferramentas.delete(nome);
            return true;
        }

        if (this.#pistas.has(nome)) {
            const pista = this.#pistas.get(nome);
            this.#engine.mochila.guarda(pista);
            this.#pistas.delete(nome);
            return true;
        }

        return false;
    }

    sai(porta) {
        validate(porta, "String");
        return this.#portas.get(porta);
    }

    textoDescricao() {
        let descricao = `Você está no ${this.nome}\n`;

        // Objetos
        if (this.#objetos.size === 0) {
            descricao += "Não há objetos na sala\n";
        } else {
            descricao += `Objetos: ${this.objetosDisponiveis().join(", ")}\n`;
        }

        // Ferramentas
        if (this.#ferramentas.size === 0) {
            descricao += "Não há ferramentas na sala\n";
        } else {
            descricao += `Ferramentas: ${this.ferramentasDisponiveis().join(", ")}\n`;
        }

        // Pistas
        if (this.#pistas.size === 0) {
            descricao += "Não há pistas na sala\n";
        } else {
            descricao += `Pistas: ${this.#pistas.size} pista(s) encontrada(s):\n- ${this.pistasDisponiveis().join("\n- ")}\n`;
        }

        // Portas
        descricao += `Portas: ${this.portasDisponiveis().join(", ")}\n`;

        return descricao;
    }

    usa(ferramenta, objeto) {
        return false;
    }
}

// Classe Engine
export class Engine {
    #mochila;
    #salaCorrente;
    #fim;

    constructor() {
        this.#mochila = new Mochila();
        this.#salaCorrente = null;
        this.#fim = false;
        this.criaCenario();
    }

    get mochila() {
        return this.#mochila;
    }

    get salaCorrente() {
        return this.#salaCorrente;
    }

    set salaCorrente(sala) {
        validate(sala, Sala);
        this.#salaCorrente = sala;
    }

    indicaFimDeJogo() {
        this.#fim = true;
    }

    // Para criar um jogo → sobrescreva esse método
    criaCenario() {}

    joga() {
        let novaSala = null;
        let acao = "";
        let tokens = null;

        while (!this.#fim) {
            console.log("-------------------------");
            console.log(this.salaCorrente.textoDescricao());
            acao = prompt("O que voce deseja fazer? ");
            tokens = acao.split(" ");

            switch (tokens[0]) {
                case "fim":
                    this.#fim = true;
                    break;
                case "pega":
                    if (this.salaCorrente.pega(tokens[1])) {
                        console.log(`Ok! ${tokens[1]} guardado!`);
                    } else {
                        console.log(`Objeto ${tokens[1]} não encontrado.`);
                    }
                    break;
                case "inventario":
                    console.log(`Inventário: ${this.#mochila.inventario()}`);
                    break;
                case "usa":
                    if (this.salaCorrente.usa(tokens[1], tokens[2])) {
                        console.log("Feito!!");
                        if (this.#fim === true) {
                            console.log("Parabéns, você venceu!");
                        }
                    } else {
                        console.log(`Não é possível usar ${tokens[1]} sobre ${tokens[2]} nesta sala.`);
                    }
                    break;
                case "ir":
                    novaSala = this.salaCorrente.sai(tokens[1]);
                    if (novaSala === null) {
                        console.log("Sala desconhecida...");
                    } else {
                        this.#salaCorrente = novaSala;
                    }
                    break;
                default:
                    console.log(`Comando desconhecido: ${tokens[0]}`);
                    break;
            }
        }

        console.log("Jogo encerrado!");
    }
}
