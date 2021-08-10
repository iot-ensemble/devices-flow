import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FathymSharedModule,
  LCUServiceSettings,
  MaterialModule,
} from '@lcu/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './controls/admin/admin.component';
import { DevicesComponent } from './controls/devices/devices.component';
import { HomeComponent } from './controls/home/home.component';
import { ManageComponent } from './controls/manage/manage.component';
import { LcuDocumentationModule } from '@lowcodeunit/lcu-documentation-common';
import { CommonModule } from '@iot-ensemble/devices-flow-common';
import { environment } from '../environments/environment';
import { AppHostModule } from '@lowcodeunit/app-host-common';
import { EmulatedDevicesComponent } from './controls/emulated-devices/emulated-devices.component';
import { PayloadComponent } from './controls/payload/payload.component';
import { StorageAccessComponent } from './controls/storage-access/storage-access.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, AdminComponent, ManageComponent, DevicesComponent, EmulatedDevicesComponent, PayloadComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FathymSharedModule.forRoot(),
    MaterialModule,
    FlexLayoutModule,
    CommonModule.forRoot(),
    AppHostModule.forRoot()
  ],
  providers: [
    {
      provide: LCUServiceSettings,
      useValue: FathymSharedModule.DefaultServiceSettings(environment),
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
