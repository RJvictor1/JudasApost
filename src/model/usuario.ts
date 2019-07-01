export class Usuario{
    id: string;
    nome : string;
    dataNascimento : string;
    sexo : string;
   cpf : string;
    rg : string;
    endereco : string;
    telefone : string;
    estado : string;
    cep: string;
    complemento: string;
    email: string;
    prata: string;
    saldo: string;
    fpagamento1: string;
    fpagamento2: string;
    admin: string;

    constructor(){}

    setDados(obj : any){
        this.nome = obj.nome;
        this.dataNascimento = obj.dataNascimento;
        this.sexo = obj.sexo;
        this.cpf = obj.cpf;
        this.rg = obj.rg;
        this.endereco = obj.endereco;
        this.telefone = obj.telefone;
        this.estado = obj.estado;
        this.cep = obj.cep;
        this.complemento = obj.complemento;
        this.email = obj.email;
        this.prata = obj.prata;
        this.saldo = obj.saldo;
        this.fpagamento1 = obj.fpagamento1;
        this.fpagamento2 = obj.fpagamento2;
        this.admin = obj.admin;
    }
}