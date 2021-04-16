import { Component, OnInit } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css']
})
export class Page1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1000,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 400,
    overflow: false,
  };

  data: CloudData[] = [
    {text: 'Weight-8-link-color', weight: 8, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 10,color: '#fcba03', tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 5, color: '#fcba03'},
    {text: 'Weight-10-link', weight: 7, tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 6, color: '#fcba03'},
    {text: 'Weight-10-link', weight: 11, tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 4, color: '#fcba03'},
    {text: 'Weight-10-link', weight: 8, tooltip: 'display a tooltip'},
    {text: 'Weight-10-link', weight: 4, tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 5, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 7, tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 6, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 11, tooltip: 'display a tooltip'},
    {text: 'Weight-8-link-color', weight: 4, color: '#ffaaee'},
    {text: 'Weight-10-link', weight: 8, tooltip: 'display a tooltip'},
    {text: 'Weight-10-link', weight: 4, tooltip: 'display a tooltip'}
    // ...
  ];

}
