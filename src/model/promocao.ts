export class Promocao{
    id: string;
    descricao : string;
    imagem : string;
    titulo : string;
    saldo : string;
    prata : string;


    constructor(){}

    setDados(obj : any){
        this.descricao = obj.descricao;
        this.imagem = obj.imagem;
        this.titulo = obj.titulo;
        this.saldo = obj.saldo;
        this.prata = obj.prata;
    }
}