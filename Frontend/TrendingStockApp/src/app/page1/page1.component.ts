import { Component, OnInit, ViewChild,ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CloudData, CloudOptions, TagCloudComponent } from 'angular-tag-cloud-module';
import { AgWordCloudData, AgWordCloudDirective } from 'angular4-word-cloud';
import {Router} from '@angular/router';
import { Page1Service } from './page1.service';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Page1Component implements OnInit {
  // @ViewChild('word_cloud_chart', {static: false}) word_cloud_chart: AgWordCloudDirective
  @ViewChild(TagCloudComponent, { static: false }) child: TagCloudComponent;
  constructor(private route:Router, private _page1Service: Page1Service, private cdr: ChangeDetectorRef) { }
  searchValue
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
    width: 1,
    // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
    height: 600,
    overflow: true,
    zoomOnHover: {
      scale: 1.1,
      transitionTime: 0.3,
      delay: .1
    },
    randomizeAngle: true
  };
  data: CloudData[] = []
  data1: CloudData[] = []

  // Create Work Cloud Data Array
  wordData: AgWordCloudData[] = [];
  // Word Cloud Options
  // options = {
  //   settings: {
  //     minFontSize: 20,
  //     maxFontSize: 100,
  //     textRotation: 10
  //      // see below
  //     // spiral: "10"
  //   },
  //   margin: {
  //     top: 0,
  //     right: 0,
  //     bottom: 0,
  //     left: 0
  //   },
    
  //   labels: true // false to hide hover labels
  // }
  colors = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];
  count = 0;
  dataLocal = []
  dataTwitter = []

  ngOnInit() {
    console.log("oninit")
    this.loadData();    
  }
  
  async loadData() {
    console.log("loaddata")
    try{
      this.dataLocal = await this._page1Service.enroll1().toPromise()
    }catch(err){
      console.log("local data: " + err)
    }
    // await this._page1Service.enroll1().subscribe(
    //   local=>     
    //   {
    //     console.log("success",local)
    //     this.dataLocal = local        
    //   }    
    // ) 
    try{
      this.dataTwitter = await this._page1Service.enroll2().toPromise()
    }catch(err){
      console.log(`data twitter: ${err}`)
    }
    // this._page1Service.enroll2().subscribe(
    //   data=>     
    //   {
    //     console.log("success",data)
    //     this.dataTwitter = data 
    //     this.wordCloudUpdate(data)       
    //   }    
    // ) 
    this.wordCloudUpdate();
    // setTimeout(() => {
      
    //   // this.word_cloud_chart.wordData = this.wordData;
    // },4000);
  }

  wordCloudUpdate() {
    console.log("wordCloudUpdate")
    // let scores = [...this.dataLocal , ...this.dataTwitter]
    this.dataLocal.forEach(element => {
      if(element["Reddit Score"] > 5) {
        var score 
        if(element["Reddit Score"] > 500) {
          score = 500
        } else {
          score = element["Reddit Score"]
        }
        var obj = {
          text: element.Ticker,
          weight: score,
          color: this.colors[this.count],
          tooltip: 'Score:'+ element["Reddit Score"],
          external: true      
        }
        // console.log(this.wordData)
        this.data = [...this.data,obj]
        if(this.count < 50) {
          this.count += 1
        } else {
          this.count = 0
        }
      }
            
    })
    this.dataTwitter.forEach(element => {
      if(element["Twitter Score"] > 5) {
        var score 
        if(element["Twitter Score"] > 500) {
          score = 500
        } else {
          score = element["Twitter Score"]
        }
        var obj = {
          text: element.Ticker,
          weight: score,
          color: this.colors[this.count],
          tooltip: 'Score:'+ element["Twitter Score"]
          
        }
        // console.log(this.wordData)
        this.data = [...this.data,obj]
        if(this.count < 50) {
          this.count += 1
        } else {
          this.count = 0
        }
      }      
      
    })
    setTimeout(() => {
      // this.word_cloud_chart.update()
      this.cdr.detectChanges()
    });
  }

  clickF(data: CloudData){
    console.log('hey you clicked on',data.text)
    localStorage.setItem("ticker",data.text)
    this.route.navigate([`/stock_details/${data.text}`])
  }

  search() {
    console.log(this.searchValue)
    localStorage.setItem("ticker",this.searchValue)
    this.route.navigate([`/stock_details/${this.searchValue}`])
  }


  

  // data: CloudData[] = [
  //   {text: 'Weight-8-link-color', weight: 8},
  //   {text: 'Weight-10-link', weight: 10,color: '#fcba03', tooltip: 'display a tooltip'},
  //   {text: 'Weight-8-link-color', weight: 5}
  //   // ...
  // ];


}
