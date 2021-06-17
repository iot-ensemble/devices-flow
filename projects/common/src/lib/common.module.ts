import { NgModule } from '@angular/core';
import { EmulatedDevicesComponent } from './elements/emulated-devices/emulated-devices.component';
import { DevicesComponent } from './elements/devices/devices.component';
import { TelemetryComponent } from './elements/telemetry/telemetry.component';
import { StorageAccessComponent } from './elements/storage-access/storage-access.component';
import { DashboardComponent } from './elements/dashboard/dashboard.component';

@NgModule({
  declarations: [
    EmulatedDevicesComponent,
    DevicesComponent,
    TelemetryComponent,
    StorageAccessComponent,
    DashboardComponent,
  ],
  imports: [],
  exports: [EmulatedDevicesComponent, DevicesComponent, TelemetryComponent, StorageAccessComponent, DashboardComponent],
})
export class CommonModule {}
