import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BrandService } from './brand.service';

@Component({
  selector: 'brand-component',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
    mobiles = [];
    brand;
    ngOnInit(){
        this.route.params.subscribe((params: Params)=>{
            this.brand = params['brand'];
            if (this.brand in this.brandService.brands){
                this.mobiles = this.brandService.brands[this.brand];
            }
            else{
                this.brandService.getBrand(this.brand).subscribe((data)=>{
                    this.brandService.brands[this.brand] = data;
                    this.mobiles = data;
                });
            }
        });
    }
    constructor(private brandService: BrandService,
                private route: ActivatedRoute){}
}
