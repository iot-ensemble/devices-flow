import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './controls/home/home.component';
import { AdminComponent } from './controls/admin/admin.component';
import { ManageComponent } from './controls/manage/manage.component';
import { DevicesComponent } from './controls/devices/devices.component';
import { EmulatedDevicesComponent } from './controls/emulated-devices/emulated-devices.component';
import { PayloadComponent } from './controls/payload/payload.component';
import { StorageAccessComponent } from './controls/storage-access/storage-access.component';
import { TelemetryComponent } from './controls/telemetry/telemetry.component';

const routes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: 'devices', component: DevicesComponent},
  { path: 'emulated', component: EmulatedDevicesComponent},
  { path: 'manage', component: ManageComponent },
  { path: 'payload', component: PayloadComponent },
  { path: 'home', component: HomeComponent },

 
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
      RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
