import { AdminComponent } from './elements/admin/admin.component';
import { ApiAccessComponent } from './controls/api-access/api-access.component';
import { NgModule, ModuleWithProviders } from '@angular/core';
import {
  FathymSharedModule,
  MaterialModule,
  PipeModule,
} from '@lcu/common';
import { DataGridModule } from '@lowcodeunit/data-grid';
import { DevicesComponent } from './elements/devices/devices.component';
import { EmulatedDevicesComponent } from './elements/emulated-devices/emulated-devices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TelemetryComponent } from './elements/telemetry/telemetry.component';
import { StorageAccessComponent } from './elements/storage-access/storage-access.component';
import { DashboardComponent } from './elements/dashboard/dashboard.component';
import { DashboardCardComponent } from './controls/dashboard-card/dashboard-card.component';
import { EnabledToggleComponent } from './controls/enabled-toggle/enabled-toggle.component';
import { DevicesTableComponent } from './controls/devices-table/devices-table.component';
import { DataInfoCardsComponent } from './controls/data-info-cards/data-info-cards.component';
import { TelemetryListComponent } from './controls/telemetry-list/telemetry-list.component';

import { PayloadFormComponent } from './controls/payload-form/payload-form.component'
import { SendMessageDialogComponent } from './elements/manage/send-message-dialog/send-message-dialog.component';
import { SwaggerUIComponent } from './controls/swagger-ui/swagger-ui.component';
import { IoTEnsembleStateContext } from './state/iot-ensemble-state.context';
import { GenericModalService } from './services/generic-modal.service';
import { GtagService } from './services/gtag.services';
import { ManageComponent } from './elements/manage/manage.component';
import { LoaderComponent } from './controls/loader/loader.component';
@NgModule({
  declarations: [
    AdminComponent,
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
    ManageComponent,
    TelemetryListComponent,
    PayloadFormComponent,
    SendMessageDialogComponent,
    SwaggerUIComponent
  ],
  imports: [  
    DataGridModule,
    FathymSharedModule,
    FlexLayoutModule,
    MaterialModule,
    PipeModule,
    FormsModule,
    ReactiveFormsModule,
            ],
  exports: [
    AdminComponent,
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
    ManageComponent,
    TelemetryListComponent,
    PayloadFormComponent,
    SendMessageDialogComponent,
    SwaggerUIComponent
  ],
  providers: [
  ]
})
export class CommonModule {
  static forRoot(): ModuleWithProviders<CommonModule> {
    return {
      ngModule: CommonModule,
      providers: [
        IoTEnsembleStateContext,
        GenericModalService,
        GtagService,
      ],
    };
  }
}
