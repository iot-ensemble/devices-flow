import { Component, Input, OnInit } from '@angular/core';
import { PayloadFormComponent } from '../../controls/payload-form/payload-form.component';
import { GenericModalModel } from '../../models/generice-modal.model';
import { GenericModalService } from '../../services/generic-modal.service';
import { IoTEnsembleState, IoTEnsembleTelemetryPayload } from '../../state/iot-ensemble.state';
import { IoTEnsembleStateContext } from '../../state/iot-ensemble-state.context';
import { SendMessageDialogComponent } from '../manage/controls/send-message-dialog/send-message-dialog.component';
import { ColdQueryModel } from '../../models/cold-query.model';
import { TelemetryDownloadDialogComponent } from '../manage/controls/telemetry-download-dialog/telemetry-download-dialog.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'lcu-telemetry',
  templateUrl: './telemetry.component.html',
  styleUrls: ['./telemetry.component.css']
})
export class TelemetryComponent implements OnInit {
  // Fields
  protected stateHandlerSub: Subscription;
  //  Properties
  public DeviceNames!: string[];
  
  public LastSyncedAt!: Date;

  @Input('state')
  public State!: IoTEnsembleState;
  //  Constructors
  constructor(
    protected iotEnsCtxt: IoTEnsembleStateContext,
    protected genericModalService: GenericModalService<PayloadFormComponent>,
  ) { }
  //  Life Cycle
  public ngOnDestroy(): void {
    this.stateHandlerSub?.unsubscribe();
  }

  public ngOnInit() {
    this.setupStateHandler();
  }
  //  API Methods
  public DownloadTelemetryModal(): void {
    console.log("we downloading");
    /**
     * Acces component properties not working - shannon
     *
     * TODO: get this working
     */

    const modalConfig: GenericModalModel = new GenericModalModel({
      ModalType: 'data', // type of modal we want (data, confirm, info)
      CallbackAction: (val: any) => {}, // function exposed to the modal
      Component: TelemetryDownloadDialogComponent, // set component to be used inside the modal
      Data: {
        Devices: this.State?.DevicesConfig.Devices,
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
        console.log('TELEMETRY MODAL OPEN', res);
      }
    );

    this.genericModalService.ModalComponent.afterClosed().subscribe(
      (res: ColdQueryModel) => {
        console.log('TELEMETRY MODAL CLOSED', res);
        this.TelemetryDownload(res);
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
  }


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

          this.iotEnsCtxt.ListAllDeviceNames(this.State.UserEnterpriseLookup, filterValue)
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

    this.iotEnsCtxt.SendDeviceMessage(payload.DeviceID, payload);
  }

  public TelemetryDownload(query: ColdQueryModel) {
    console.log('ColdQueryModelCall: ', query);

    if (!query.Zip) {
      this.iotEnsCtxt
        .ColdQuery(
          query.StartDate,
          query.EndDate,
          query.PageSize,
          query.PageSize,
          query.SelectedDeviceIds,
          query.IncludeEmulated,
          query.DataType,
          query.ResultType,
          query.Flatten,
          query.Zip
        )
        .then((obs: any) => {
          console.log('OBS: ', obs);
          const blob = new Blob([JSON.stringify(obs.body)], {
            type: 'text/json',
          });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.download = 'telemetry.json';
          link.href = url;
          link.click();
        });
    }
  }

  public ToggleTelemetryEnabledChanged(enabled: boolean) {
    this.State!.Telemetry!.Loading = true;

    this.iotEnsCtxt.ToggleTelemetrySync();
  }

  public UpdateTelemetryPage(page: number) {
    this.State.Telemetry.Loading = true;

    this.iotEnsCtxt.UpdateTelemetrySync(
      this.State.Telemetry.RefreshRate,
      page,
      this.State.Telemetry.PageSize,
      null
    );
  }

  public UpdateTelemetryPageSize(pageSize: number) {
    this.State.Telemetry.Loading = true;

    this.iotEnsCtxt.UpdateTelemetrySync(
      this.State.Telemetry.RefreshRate,
      this.State.Telemetry.Page,
      pageSize,
      null
    );
  }
  
  //  Helpers
  protected convertToDate(syncDate: string) {
    if (syncDate) {
      this.LastSyncedAt = new Date(Date.parse(syncDate));
    } else {
      this.LastSyncedAt = null;
    }
  }

  HandleExpandedPayloadID(event: string)
  {
    if(this.State.ExpandedPayloadID === event)
      return;
    this.iotEnsCtxt.UpdateTelemetrySync(
      this.State.Telemetry.RefreshRate,
      this.State.Telemetry.Page,
      this.State.Telemetry.PageSize,
      event);
  }

  protected handleStateChanged() {
    this.DeviceNames =
      this.State?.DevicesConfig?.Devices?.map((d) => d.DeviceName) || [];
    if (this.State?.Telemetry) {
      this.convertToDate(this.State?.Telemetry.LastSyncedAt);
    }
  }

  protected setupStateHandler() {
    this.stateHandlerSub = this.iotEnsCtxt.Context.subscribe((state) => {
      this.State = Object.assign(this.State, state);

      // console.log("State: ", this.State)
      this.handleStateChanged();
    });
  }
}
