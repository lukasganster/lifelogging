import { Injectable } from '@angular/core';
import { Record } from './record.interface';

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor() { }

  createNewRecord():Record{
    return {
      id:Math.ceil(Math.random()*10000).toString()
    };
  }
}
