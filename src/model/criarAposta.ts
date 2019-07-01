
export class CriarAposta{
    id: string;
    descricaoAposta : string;
    resposta1 : string;
    resposta2 : string;
    resposta3 : string;
    respostaCorreta : string;
    dataCriado : string;
    dataTermino : string;
    status : string;
    nome: string;
    email:string;

    constructor(){}

    setDados(obj : any){
        this.descricaoAposta = obj.descricaoAposta;
        this.resposta1 = obj.resposta1;
        this.resposta2 = obj.resposta2;
        this.resposta3 = obj.resposta3;
        this.respostaCorreta = obj.respostaCorreta;
        this.dataCriado = obj.dataCriado;
        this.dataTermino = obj.dataTermino;
        this.status = obj.status;
        this.nome = obj.nome;
        this.email = obj.email;
    }
}