import { Injectable } from '@angular/core';
import { Record } from './record.interface';
import { Plugins } from '@capacitor/core';
import { isRegExp } from 'util';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  public records = [];

  createNewRecord():Record{
    return {
      id:"",
      date:new Date().toISOString()
    };
  }

  saveToRecords(record){
    this.getStorage().then(data =>{
      this.records.push(record);
      console.log(this.records);
      this.setStorage();
    });
  }

  async getRecord(id){
    var returnValue;
    await this.getStorage().then(data =>{
      var returnRecord;
      this.records.forEach(record => {
        if(record.id == id)
          returnRecord = record;
      });
      returnValue = returnRecord;
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
    if(!this.records) this.records = [];
  }
  

}
