import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IoTEnsembleTelemetryPayload } from '../../../../state/iot-ensemble.state';
import { GenericModalModel } from '../../../../models/generice-modal.model';
//import { filter } from 'jszip';

@Component({
  selector: 'send-message-dialog',
  templateUrl: './send-message-dialog.component.html',
  styleUrls: ['./send-message-dialog.component.scss'],
})
export class SendMessageDialogComponent implements OnInit {
  //  Fields

  //  Properties
  public DeviceNames: string[];

  @Output('filter-value')
  public FilterValue: EventEmitter<string>;

  @Input('device-options')
  public DeviceOptions!: Array<string>;

  //  Constructors
  constructor(
    @Inject(MAT_DIALOG_DATA) protected data: GenericModalModel,
    public dialogRef: MatDialogRef<SendMessageDialogComponent>
  ) {

    this.FilterValue = new EventEmitter<string>();

  }

  //  Life Cycle
  public ngOnInit(): void {
    this.DeviceNames = this.data.Data.DeviceNames;
  }


  //  API Methods
  public Cancel() {
    this.dialogRef.close(null);
  }

  public FilterValueChanged(filterValue: string){
    this.FilterValue.emit(filterValue);
  }
  

  public SendDeviceMessage(payload: IoTEnsembleTelemetryPayload) {
    this.dialogRef.close(payload);
  }

  //  Helpers
}
