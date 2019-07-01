export class RespostaAposta{
    id: string;
    idAposta : string;
    idUsuario : string;
    premio : string;
    resposta : string;
    tempoResposta : string;
    resposta1 : string;
    resposta2 : string;
    resposta3 : string;
    valorApostado : string;

    constructor(){}

    setDados(obj : any){
        this.idAposta = obj.idAposta;
        this.idUsuario = obj.idUsuario;
        this.premio = obj.premio;
        this.resposta = obj.resposta;
        this.tempoResposta = obj.tempoResposta;
        this.resposta1 = obj.resposta1;
        this.resposta2 = obj.resposta2;
        this.resposta3 = obj.resposta3;
        this.valorApostado = obj.valorApostado;
    }
}