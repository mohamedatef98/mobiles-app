import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MobileService {
    mobiles = [];
    constructor(private http: HttpClient){}

    getMobile(id){
        return this.http.get('http://127.0.0.1:3000/api/mobile/'+id);
    }
}