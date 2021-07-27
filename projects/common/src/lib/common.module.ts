import { ApiAccessComponent } from './controls/api-access/api-access.component'
import { NgModule } from '@angular/core';
import {
  FathymSharedModule,
  MaterialModule,
  PipeModule,
} from '@lcu/common';
import { DataGridComponent } from '@lowcodeunit/data-grid';
import { DevicesComponent } from './elements/devices/devices.component';
import { EmulatedDevicesComponent } from './elements/emulated-devices/emulated-devices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelemetryComponent } from './elements/telemetry/telemetry.component';
import { StorageAccessComponent } from './elements/storage-access/storage-access.component';
import { DashboardComponent } from './elements/dashboard/dashboard.component';
import { DashboardCardComponent } from './controls/dashboard-card/dashboard-card.component';
import { EnabledToggleComponent } from './controls/enabled-toggle/enabled-toggle.component';
import { DevicesTableComponent } from './controls/devices-table/devices-table.component';
import { DataInfoCardsComponent } from './controls/data-info-cards/data-info-cards.component';
import { TelemetryListComponent } from './controls/telemetry-list/telemetry-list.component';
import { LoaderComponent } from './controls/loader/loader.component';
import { IoTEnsembleService } from './services/iot-ensemble.service';
import { PayloadFormComponent } from './controls/payload-form/payload-form.component'
import { SendMessageDialogComponent } from './elements/manage/send-message-dialog/send-message-dialog.component';

@NgModule({
  declarations: [
    ApiAccessComponent,
    EmulatedDevicesComponent,
    DataInfoCardsComponent,
    DevicesComponent,
    DevicesTableComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
    TelemetryListComponent,
    PayloadFormComponent,
    SendMessageDialogComponent,
  ],
  imports: [  
    DataGridComponent,
    FathymSharedModule,
    MaterialModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
            ],
  exports: [
    ApiAccessComponent,
    EmulatedDevicesComponent,
    DataInfoCardsComponent,
    DevicesComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DevicesTableComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
    TelemetryListComponent,
    PayloadFormComponent,
    SendMessageDialogComponent,
  ],
  providers: [
    IoTEnsembleService
  ]
})
export class CommonModule {}
