import { Component } from '@angular/core';
import { Record } from '../services/record.interface';
import { RecordService } from '../services/record.service';
import * as moment from 'moment';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(private recordService:RecordService) {
    this.record = this.recordService.createNewRecord();
  }

  private record:Record;

  public saveRecord(){
    console.log(this.record);
    this.record.date = moment(this.record.date);
  }
}
