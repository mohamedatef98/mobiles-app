import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  constructor(private http: HttpClient) { }
  brands = {};

  getBrand(brand){
    if(brand in this.brands){
        return this.brands[brand];
    }
    else{
      return this.http.get('http://127.0.0.1:3000/api/brand/'+brand);
    }
  }
}