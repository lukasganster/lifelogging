import { Component, ViewChild } from '@angular/core';
import { RecordService } from '../services/record.service';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild('barChart') barChart;

  bars: any;
  colorArray: any;
  averageOverall7Days;
  
  constructor(private recordService: RecordService) {
  }

  ionViewDidEnter() {
    this.getOverallStatus();
  }

  getOverallStatus(){
    this.recordService.getLastSevenDays().then((data)=>{
      let lastSevenDays = data;
      this.createBarChart(lastSevenDays);
    });
  }

  createBarChart(dataArrays) {
    let labels = [];
    let data = [];
    let sum = 0;
    dataArrays.forEach(record => {
      let mom = moment(record.date);
      labels.push(mom.format("dddd"));
      data.push(record.overall);
      sum += record.overall;
    });
    this.averageOverall7Days = (sum/data.length).toFixed(2);
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Overall happiness',
          data: data,
          backgroundColor: 'rgb(242,255,56)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(242,255,56)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
