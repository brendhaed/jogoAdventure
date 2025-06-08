import { Engine } from "./Basicas.js";
import { HallEntrada, SalaoPrincipal, QuartoSecreto, Cozinha, Biblioteca, TorreDoRelogio, PortaoPrincipal } from "./SalasDemo.js";

export class JogoDemo extends Engine {
    constructor() {
        super();
    }

    criaCenario() {
        // Criação das salas
        let hall = new HallEntrada(this);
        let salao_principal = new SalaoPrincipal(this);
        let quarto_secreto = new QuartoSecreto(this);
        let cozinha = new Cozinha(this);
        let biblioteca = new Biblioteca(this);
        let torre_relogio = new TorreDoRelogio(this);
        let portao_principal = new PortaoPrincipal(this);

        // Conectar as salas através das portas

        // Hall conecta com Salão Principal
        hall.portas.set(salao_principal.nome, salao_principal);
        salao_principal.portas.set(hall.nome, hall);

        // Salão Principal conecta com Hall, Quarto Secreto, Cozinha, Biblioteca e Torre Relógio
        salao_principal.portas.set(hall.nome, hall)
        salao_principal.portas.set(quarto_secreto.nome, quarto_secreto);
        salao_principal.portas.set(cozinha.nome, cozinha);
        salao_principal.portas.set(biblioteca.nome, biblioteca);
        salao_principal.portas.set(torre_relogio.nome, torre_relogio);

        // Biblioteca conecta com Salão Principal
        biblioteca.portas.set(salao_principal.nome, salao_principal);

        // Quarto Secreto conecta com Salão Principal
        quarto_secreto.portas.set(salao_principal.nome, salao_principal);

        // Cozinha conecta de volta com Salão Principal e Torre do Relógio
        cozinha.portas.set(salao_principal.nome, salao_principal);
        cozinha.portas.set(torre_relogio.nome, torre_relogio);

        // Torre do Relogio também conecta com Salão Principal e Cozinha
        torre_relogio.portas.set(cozinha.nome, cozinha);
        torre_relogio.portas.set(salao_principal.nome, salao_principal);
        torre_relogio.portas.set(portao_principal.nome, portao_principal);

        // Portão Principal conecta com Salão Principal e Torre do Relógio
        portao_principal.portas.set(salao_principal.nome,salao_principal);
        portao_principal.portas.set(torre_relogio.nome,torre_relogio);

        // Define a sala inicial
        this.salaCorrente = hall;
    }
}
