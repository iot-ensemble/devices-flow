import { Component, OnInit } from '@angular/core';
import { IoTEnsembleState, IoTEnsembleStateContext } from '@iot-ensemble/devices-flow-common';

@Component({
  selector: 'lcu-devices-page',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  //  Properties
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
