export class Categoria{
    id : string;
    categoria  : string;
    foto  : string;
    constructor(){}
    setDados(obj : any){
        this.categoria = obj.categoria;
        this.foto = obj.foto;
        this.id = obj.id;
    }
}