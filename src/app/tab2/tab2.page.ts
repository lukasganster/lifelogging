import { Component, OnInit } from '@angular/core';
import { Record } from '../services/record.interface';
import { RecordService } from '../services/record.service';
import * as moment from 'moment';
import { from } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  constructor(private recordService:RecordService) {
  
  }

  ngOnInit(): void {
    this.record = this.recordService.createNewRecord();
    console.log(this.record);
  }
  

  private record;

  public saveRecord(){
    this.record.date = moment(this.record.date);
    let wakeup = this.record.wakeup = moment(this.record.wakeup);
    let sleep = this.record.sleep = moment(this.record.sleep);
    let duration = moment.duration(sleep.diff(wakeup));
    // duration in hours
    var hours = parseInt(duration.asHours().toString());

    // duration in minutes
    var minutes = parseInt(duration.asMinutes().toString())%60;

    console.log(hours + ' hour and '+ minutes+' minutes.');
    //this.record.bedtime = bedtime;
    this.record.id = moment(this.record.date).format("YYYY-MM-DD");
    console.log(this.record);
    this.recordService.saveToRecords(this.record);
    let date = this.record.date;
    this.record = this.recordService.createNewRecord();
    this.record.date = date;
  }

  public dayForward(){
    let newDate = moment(this.record.date).add('days',1);
    this.record.date = newDate.toISOString();
    this.dateChanged();
  }

  public dayBack(){
    let newDate = moment(this.record.date).add('days',-1);
    this.record.date = newDate.toISOString();
    this.dateChanged();
  }

  public dateChanged(){
    this.recordService.getRecord(moment(this.record.date).format("YYYY-MM-DD")).then((fromStorage) => {
      if(fromStorage != null){
        this.record = fromStorage;
      }
      else{
        let date = this.record.date;
        this.record = this.recordService.createNewRecord();
        this.record.date = date;
      }
    });
  }
}
