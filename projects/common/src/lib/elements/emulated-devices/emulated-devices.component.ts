import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';
import { IoTEnsembleService } from './../../services/iot-ensemble.service';

@Component({
  selector: 'lcu-emulated-devices',
  templateUrl: './emulated-devices.component.html',
  styleUrls: ['./emulated-devices.component.css'],
})
export class EmulatedDevicesComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('state')
  public State?: IoTEnsembleState;

  //  Constructors
  constructor(protected iotEnsSvc: IoTEnsembleService) {}

  //  Life Cycle
  public ngOnInit(): void {}

  //  API Methods
  public ToggleEmulatedEnabledChanged(enabled: boolean) {
    if (this.State?.Emulated) {
      this.State.Emulated.Loading = true;
    }

    this.iotEnsSvc.ToggleEmulatedEnabled().subscribe(resp => {
      this.State.Emulated.Enabled = resp != null;
    });
  }

  //  Fields
}
