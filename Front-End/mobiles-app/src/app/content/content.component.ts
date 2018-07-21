import { Component } from '@angular/core';
import { MainService } from './main.service';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  constructor(private mainService: MainService){}
}
