import { Component, OnInit } from '@angular/core';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from '../../state/iot-ensemble-state.context';

export const SELECTOR_LCU_DEVICE_DATA_FLOW_MANAGE_ELEMENT = 'lcu-manage';
@Component({
  selector: SELECTOR_LCU_DEVICE_DATA_FLOW_MANAGE_ELEMENT,
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss'],
})
export class ManageComponent implements OnInit {
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
