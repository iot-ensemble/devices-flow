import { Component, OnInit } from '@angular/core';
import { IoTEnsembleState, IoTEnsembleStateContext } from '@iot-ensemble/devices-flow-common';

@Component({
  selector: 'lcu-manage-element',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

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
