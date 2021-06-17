import { NgModule } from '@angular/core';
import { EmulatedDevicesComponent } from './elements/emulated-devices/emulated-devices.component';
import { DevicesComponent } from './elements/devices/devices.component';
import { TelemetryComponent } from './elements/telemetry/telemetry.component';
import { StorageAccessComponent } from './elements/storage-access/storage-access.component';
import { DashboardComponent } from './elements/dashboard/dashboard.component';
import { DashboardCardComponent } from './controls/dashboard-card/dashboard-card.component';
import { EnabledToggleComponent } from './controls/enabled-toggle/enabled-toggle.component';
import { MaterialModule } from './material.module';
import { LoaderComponent } from './controls/loader/loader.component';
import { IoTEnsembleService } from './services/iot-ensemble.service';

@NgModule({
  declarations: [
    EmulatedDevicesComponent,
    DevicesComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
  ],
  imports: [MaterialModule],
  exports: [
    EmulatedDevicesComponent,
    DevicesComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
    DashboardCardComponent,
    EnabledToggleComponent,
    LoaderComponent,
  ],
  providers: [
    IoTEnsembleService
  ]
})
export class CommonModule {}
