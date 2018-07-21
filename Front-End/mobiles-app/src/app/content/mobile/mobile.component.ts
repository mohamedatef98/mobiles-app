import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MobileService } from './mobile.service';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'mobile-component',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css']
})
export class MobileComponent implements OnInit {
    id;
    mobile = [];
    ngOnInit(){}
  constructor(private route:ActivatedRoute,
            private mobileService:MobileService,
            private titleService: Title){
                this.route.params.subscribe((params:Params)=>{
                    this.id = params['id'];
                    var inMobilesIndex = this.mobileService.mobiles.findIndex((el)=>{
                        return el['_id'] === this.id;
                    });
                    if (inMobilesIndex !== -1){
                        this.mobile = (this.mobileService.mobiles[inMobilesIndex]);
                        this.titleService.setTitle(this.mobile['Name']);
                    }
                    else{
                        this.mobileService.getMobile(this.id).subscribe((data)=>{
                            var parsedData = parseArray(data);
                            this.mobileService.mobiles.push(parsedData);
                            this.mobile = parsedData
                            this.titleService.setTitle(this.mobile['Name']);
                        });
                    }
                });
            }

}

function parseArray(data){
    var arr = [];
    for(let feature in data){
        //if the value for that property is an Array
        if (Object.getPrototypeOf(data[feature]) == Array.prototype){
            var o = {};
            o['name'] = feature;
            o['data'] = data[feature];
            for(let i = 0; i<o['data'].length;i++){
                var subProp = o['data'][i];
                var o2 = {};
                for(let subPropName in subProp){
                    o2['name'] = subPropName;
                    o2['data'] = subProp[subPropName];
                }
                o['data'][i] = o2;
            }
            arr.push(o);
        }
        else{
            arr[feature] = data[feature];
        }
    }
    return arr;
}