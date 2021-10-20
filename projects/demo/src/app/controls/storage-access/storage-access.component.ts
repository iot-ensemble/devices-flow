import { Component, OnInit } from '@angular/core';
import { IoTEnsembleState, IoTEnsembleStateContext } from '@iot-ensemble/devices-flow-common';

@Component({
  selector: 'lcu-storage-access-element',
  templateUrl: './storage-access.component.html',
  styleUrls: ['./storage-access.component.html']
})
export class StorageAccessComponent implements OnInit {
  public State: IoTEnsembleState;

  //  Constructor
  constructor(protected iotEnsCtxt: IoTEnsembleStateContext) {
    this.State ={};
  }

  //  Life Cycle
  public ngOnInit(): void {
    this.setupStateHandler();
  }

  //  API Methods
  
  //  Helpers
  protected setupStateHandler() {
    this.iotEnsCtxt.Context.subscribe((state) => {
      this.State = Object.assign(this.State, state);

      console.log("State: ", this.State)
      // this.handleStateChanged();
    });
  }
}
