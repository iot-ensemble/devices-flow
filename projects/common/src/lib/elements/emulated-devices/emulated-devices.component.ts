import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from '../../state/iot-ensemble-state.context';

export const SELECTOR_LCU_DEVICE_DATA_FLOW_EMULATED_ELEMENT = 'lcu-emulated-devices';

@Component({
  selector: SELECTOR_LCU_DEVICE_DATA_FLOW_EMULATED_ELEMENT,
  templateUrl: './emulated-devices.component.html',
  styleUrls: ['./emulated-devices.component.css'],
})
export class EmulatedDevicesComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('state')
  public State!: IoTEnsembleState;

  //  Constructors
  constructor(protected iotEnsCtxt: IoTEnsembleStateContext,) {
    this.State = {};
  }

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public ToggleEmulatedEnabledChanged(enabled: boolean) {
    this.State.Emulated.Loading = true;

    this.iotEnsCtxt.ToggleEmulatedEnabled();
  }


  //  Fields
}
