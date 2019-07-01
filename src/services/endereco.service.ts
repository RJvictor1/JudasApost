import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { Endereco } from "../model/endereco";

@Injectable()
export class EnderecoService{
    
    constructor(private http : HttpClient){
    }

    buscaCEP(cep : string) : Observable<Endereco> {
        return this.http.get<Endereco>(`http://viacep.com.br/ws/${cep}/json/`);
    }

}