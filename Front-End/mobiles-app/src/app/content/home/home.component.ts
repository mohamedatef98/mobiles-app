import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';

@Component({
  selector: 'home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  first;
  second;
  third;
  brands;

  ngOnInit(){
    if (((this.mainService.brands.length == 0) || (this.mainService.topThree.length == 0))){
      this.mainService.getData().subscribe((data)=>{
        this.mainService.brands = data['brands'];
        this.mainService.topThree = data['top'];
        this.assignData();
      });
    }
    else
      this.assignData();
  }

  constructor(private mainService: MainService){
  }

  assignData(){
    var t = this.mainService.topThree.slice();
    var t2 = this.mainService.brands.slice();
    this.first = t[0];
    this.second = t[1];
    this.third = t[2];
    this.brands = t2;
  }
}
