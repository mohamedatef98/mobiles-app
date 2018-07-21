import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'all-brands-component',
  templateUrl: './all-brands.component.html',
  styleUrls: ['./all-brands.component.css']
})
export class AllBrandsComponent implements OnInit {
  brands;
  ngOnInit() {
    if (((this.mainService.brands.length == 0) || (this.mainService.topThree.length == 0))){
      this.mainService.getData().subscribe((data) => {
        this.mainService.brands = data['brands'];
        this.mainService.topThree = data['top'];
        this.brands = this.mainService.brands.slice();
      });
    }
    else
      this.brands = this.mainService.brands.slice();
  }

constructor(private mainService: MainService){}
}
