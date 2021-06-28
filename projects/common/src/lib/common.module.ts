import { NgModule } from '@angular/core';
import { DevicesComponent } from './elements/devices/devices.component';
import { EmulatedDevicesComponent } from './elements/emulated-devices/emulated-devices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TelemetryComponent } from './elements/telemetry/telemetry.component';
import { StorageAccessComponent } from './elements/storage-access/storage-access.component';
import { DashboardComponent } from './elements/dashboard/dashboard.component';
import { DashboardCardComponent } from './controls/dashboard-card/dashboard-card.component';
import { EnabledToggleComponent } from './controls/enabled-toggle/enabled-toggle.component';
import { DevicesTableComponent } from './controls/devices-table/devices-table.component';
import { TelemetryListComponent } from './controls/telemetry-list/telemetry-list.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './controls/loader/loader.component';
import { IoTEnsembleService } from './services/iot-ensemble.service';

@NgModule({
  declarations: [
    EmulatedDevicesComponent,
    DevicesComponent,
    DevicesTableComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
    TelemetryListComponent
  ],
  imports: [MaterialModule,
            FormsModule,
            ReactiveFormsModule,],
  exports: [
    EmulatedDevicesComponent,
    DevicesComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DevicesTableComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
    TelemetryListComponent
  ],
  providers: [
    IoTEnsembleService
  ]
})
export class CommonModule {}
