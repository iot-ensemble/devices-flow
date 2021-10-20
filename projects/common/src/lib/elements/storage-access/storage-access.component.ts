import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-storage-access',
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
