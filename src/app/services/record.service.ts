import { Injectable } from '@angular/core';
import { Record } from './record.interface';
import { Plugins } from '@capacitor/core';
import { isRegExp } from 'util';
import * as moment from 'moment';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  public records = {};

  createNewRecord():Record{
    return {
      id:"",
      date:new Date().toISOString()
    };
  }

  saveToRecords(record){
    this.getStorage().then(() =>{
      let id = record.id;
      this.records[id] = record;
      console.log("saving");
      console.log(this.records);
      console.log(JSON.stringify(this.records,null,2));

      this.setStorage();
    });
  }

  async getRecord(id){
    var returnValue;
    await this.getStorage().then(data =>{
      var returnRecord = this.records[id];
      returnValue = returnRecord;
    });
    return returnValue;
  }

  async getLastSevenDays(){
    var returnValue;
    await this.getStorage().then(()=>{
      let helpArray = []; 
      for(var key in this.records){
        var value = this.records[key];
        if(moment(value.date).isSameOrBefore(moment()))
          helpArray.push(value);
      };
      helpArray.sort((a,b) => (a.date > b.date) ? -1 : ((b.date > a.date) ? 1 : 0));
      returnValue =  helpArray.slice(0,7);
    });
    return returnValue;
  }

  ///////////////////////////
  // Local Storage functions

  async setStorage() {
    await Storage.set({
      key: 'records',
      value: JSON.stringify(this.records)
    });
  }
  
  async getStorage() {
    const { value } = await Storage.get({ key: 'records' });
    this.records = JSON.parse(value);
    if(!this.records) this.records = {};
  }
  

}
