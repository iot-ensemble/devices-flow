import { Component, Input, OnInit } from '@angular/core';
import { IoTEnsembleTelemetryPayload } from '../../state/iot-ensemble.state';

export const SELECTOR_LCU_DEVICE_DATA_FLOW_PAYLOAD_ELEMENT = 'lcu-payload';

@Component({
  selector: SELECTOR_LCU_DEVICE_DATA_FLOW_PAYLOAD_ELEMENT,
  templateUrl: './payload.component.html',
  styleUrls: ['./payload.component.scss']
})
export class PayloadComponent implements OnInit {

  /**
   * DataSource is required in order to show row data within this component
   */
  private _datasource!: IoTEnsembleTelemetryPayload;
  // tslint:disable-next-line:no-input-rename
  @Input('data-source')
  set DataSource(val: IoTEnsembleTelemetryPayload) {
    this._datasource = val;
  }

  get DataSource(): IoTEnsembleTelemetryPayload {
    return this._datasource;
  }

  constructor() { }

  ngOnInit(): void {
  }
}
