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
        validate(nome, "String");
        super(nome);
        this.mensagem = ""; 
    }

    ler() {
        return true;
    }
}

// Classe Mochila
export class Mochila {
    #ferramentas;
    #limite;

    constructor(limite = 15) { // define limite de 15 itens na mochila
        validate(limite, "Number");
        this.#ferramentas = [];
        this.#limite = limite;
    }

    // guarda item
    guarda(item) {
        if (!(item instanceof Ferramenta)) {
            console.log("Não é possível guardar este item.");
            return;
        }

        if (this.#ferramentas.length >= this.#limite) {
            console.log("A mochila está cheia! Remova um item para guardar outro.");
            return;
        }

        this.#ferramentas.push(item);
        console.log(`${item.nome} guardado na mochila.`);
    }
    // pega item 
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
    // retira item
    retira(nome) {
        validate(nome, "String");

        const index = this.#ferramentas.findIndex(f => f.nome === nome);
        if (index === -1) {
            console.log(`Item "${nome}" não está na mochila.`);
            return false;
        }

        const removido = this.#ferramentas.splice(index, 1)[0];
        console.log(`Item "${removido.nome}" foi removido da mochila.`);
        return true;
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
        return arr.map(p => `"${p.nome}"`);
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
        console.log(`Pista: "${pista.mensagem}"`);  // Exibe a mensagem da pista

        return true;
    }

    return false;
    }

    sai(porta) {
        validate(porta, "String");
        return this.#portas.get(porta);
    }

    adicionaPista(pista) {
        this.#pistas.set(pista.nome, pista);
        console.log(`Uma nova pista apareceu: "${pista.nome}"`);
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
            descricao += `Pistas: ${this.#pistas.size} pista(s) encontrada(s): ${this.pistasDisponiveis().join("\n- ")}\n`;
        }


        // Portas
        descricao += `Portas: ${this.portasDisponiveis().join(", ")}\n`;

        return descricao;
    }

    usa(nomeFerramenta, nomeObjeto) {
    validate(nomeFerramenta, "String");
    validate(nomeObjeto, "String");

    const nomeFerramentaLower = nomeFerramenta.toLowerCase();
    const nomeObjetoLower = nomeObjeto.toLowerCase();

    // Verificar se o objeto existe na sala
    if (!this.#objetos.has(nomeObjetoLower)) {
        return false;
    }

    // Verifica se o jogador tem a ferramenta na mochila
    const ferramentaNaMochila = this.#engine.mochila.pega(nomeFerramentaLower);
    if (!ferramentaNaMochila) {
        return false;
    }

    const objetoNaSala = this.#objetos.get(nomeObjetoLower);
    return objetoNaSala.usar(ferramentaNaMochila);
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

    finalizarJogo() {
    console.log("\n===== FIM DE JOGO =====");
    process.exit(0);  // <- Isso encerra o jogo
}

    // Criar jogo 
    criaCenario() {}

    joga() {
        let novaSala = null;
        let acao = "";
        let tokens = null;

        while (!this.#fim) {
            console.log("--------------------------------------------------------------------");
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
                        console.log(`Objeto ${tokens[1]} não encontrado na mochila.`);
                    }
                    break;
                case "retira":
                    if (this.#mochila.retira(tokens[1])) {
                        console.log(`Ok! item ${tokens[1]} retirado!`);
                    } else {
                        console.log(`Item ${tokens[1]} não encontrado na mochila.`);
                    }
                    break;

                case "inventario":
                    console.log(`Inventário: ${this.#mochila.inventario()}`);
                    break;
                case "usa":
                    if (this.salaCorrente.usa(tokens[1], tokens[2])) {
                        console.log("Feito!!");
                        
                        } else {
                            console.log(`Não é possível usar ${tokens[1]} sobre ${tokens[2]} nesta sala.`);
                        }
                        break;

                case "ir":
                    novaSala = this.salaCorrente.sai(tokens[1]);
                    if (!novaSala) {
                        console.log(`Sala "${tokens[1]}" não encontrada. As opções válidas são: ${this.salaCorrente.portasDisponiveis().join(", ")}`);
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