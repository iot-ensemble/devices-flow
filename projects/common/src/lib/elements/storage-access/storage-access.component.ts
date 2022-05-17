import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';

export const SELECTOR_LCU_DEVICE_DATA_FLOW_STORAGE_ELEMENT = 'lcu-storage-access';

@Component({
  selector: SELECTOR_LCU_DEVICE_DATA_FLOW_STORAGE_ELEMENT,
  templateUrl: './storage-access.component.html',
  styleUrls: ['./storage-access.component.css']
})
export class StorageAccessComponent implements OnInit {

  @Input('state')
  public State!: IoTEnsembleState;
  constructor() { }

  ngOnInit(): void {
  }

  public RegenerateAPIKey(keyName: string) {
    // this.State.Loading = true;

    alert('Implement regenerate: ' + keyName);
    // this.iotEnsCtxt.RegenerateAPIKey(keyName);
  }

}
