import { Component, Input, OnInit } from '@angular/core';
import { PayloadFormComponent } from '../../controls/payload-form/payload-form.component';
import { GenericModalModel } from '../../models/generice-modal.model';
import { GenericModalService } from '../../services/generic-modal.service';
import { IoTEnsembleService } from '../../services/iot-ensemble.service';
import { IoTEnsembleState, IoTEnsembleTelemetryPayload } from '../../state/iot-ensemble.state';
import { SendMessageDialogComponent } from '../manage/send-message-dialog/send-message-dialog.component';

@Component({
  selector: 'lcu-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent implements OnInit {
  // Fields
  //  Properties
  public DeviceNames!: string[];
  
  public LastSyncedAt!: Date;

  @Input('state')
  public State!: IoTEnsembleState;
  //  Constructors
  constructor(
    protected iotEnsSvc: IoTEnsembleService,
    protected genericModalService: GenericModalService<PayloadFormComponent>,
  ) { }
  //  Life Cycle
  ngOnInit(): void {
  }
  //  API Methods
    public HandleTelemetryPageEvent(event: any) {
    if (event.pageIndex + 1 !== this.State!.Telemetry!.Page) {
      this.UpdateTelemetryPage(event.pageIndex + 1);
    } else if (event.pageSize !== this.State!.Telemetry!.PageSize) {
      this.UpdateTelemetryPageSize(event.pageSize);
    }
  }

  public PayloadFormModal(): void {
    /**
     * Acces component properties not working - shannon
     *
     * TODO: get this working
     */
    // const tt = el.nativeElement.DeviceName;
    // payloadForm.DeviceName = 'blah;

    // setTimeout(() => {

    // let sendMessageModalService: GenericModalService<SendMessageDialogComponent>
    const modalConfig: GenericModalModel = new GenericModalModel({
      ModalType: 'data', // type of modal we want (data, confirm, info)
      CallbackAction: (val: any) => {}, // function exposed to the modal
      Component: SendMessageDialogComponent, // set component to be used inside the modal
      Data: {
        DeviceNames: this.DeviceNames,
      },
      LabelCancel: 'Cancel',
      LabelAction: 'OK',
      Title: 'Settings',
      Width: '50%',
    });

    /**
     * Pass modal config to service open function
     */
    this.genericModalService.Open(modalConfig);

    this.genericModalService.ModalComponent.afterOpened().subscribe(
      (res: any) => {
        console.log('MODAL OPEN', res);

        this.genericModalService.ModalInstance.FilterValue.subscribe((filterValue: string) => {

          this.iotEnsSvc.ListAllDeviceNames(this.State.UserEnterpriseLookup, filterValue)
          .then((obs: any) => {
            // console.log("obs: ", obs)
            if (obs.body?.Status?.Code === 0) 
            {
              this.genericModalService.ModalInstance.DeviceOptions = obs.body.DeviceNames;

            } else 
              {
                console.log("error: ", obs.body.Status);
               }
          });
        })
      }
    );

  this.genericModalService.ModalComponent.afterClosed().subscribe(
      (res: any) => {
        console.log('MODAL CLOSED', res);
      }
    );

    this.genericModalService
      .OnAction()
      .subscribe((payload: IoTEnsembleTelemetryPayload) => {
        console.log('ONAction', payload);

        if (payload) {
          this.SendDeviceMessage(payload);
        }
      });
    // }, 1000);
  } 
  public SendDeviceMessage(payload: IoTEnsembleTelemetryPayload) {
    this.State!.Telemetry!.Loading = true;

    this.iotEnsSvc.SendDeviceMessage(payload.DeviceID, payload);
  }

  public ToggleTelemetryEnabledChanged(enabled: boolean) {
    this.State!.Telemetry!.Loading = true;

    this.iotEnsSvc.ToggleTelemetrySync();
  }

  public UpdateTelemetryPage(page: number) {
    this.State!.Telemetry!.Loading = true;

    this.iotEnsSvc.UpdateTelemetrySync(
      this.State!.Telemetry!.RefreshRate!,
      page,
      this.State!.Telemetry!.PageSize!
    );
  }

  public UpdateTelemetryPageSize(pageSize: number) {
    this.State!.Telemetry!.Loading = true;

    this.iotEnsSvc.UpdateTelemetrySync(
      this.State!.Telemetry!.RefreshRate,
      this.State!.Telemetry!.Page,
      pageSize
    );
  }
  //  Helpers

}
