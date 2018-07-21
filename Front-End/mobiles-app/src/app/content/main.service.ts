import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MainService {
    brands = [];
    topThree = [];
    constructor(private http: HttpClient) {
    }

    getData(){
        return this.http.get('http://127.0.0.1:3000/api/');
    }
}