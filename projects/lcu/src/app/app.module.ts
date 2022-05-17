import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FathymSharedModule, LCUServiceSettings, MaterialModule } from '@lcu/common';
import { environment } from '../environments/environment';
import {
  CommonModule,
  ManageComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_MANAGE_ELEMENT,
  AdminComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_ADMIN_ELEMENT,
  DevicesComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_DEVICES_ELEMENT,
  LcuDeviceDataFlowSetupElementComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_SETUP_ELEMENT,
  DashboardComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_DASHBOARD_ELEMENT,
  TelemetryComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_TELEMETRY_ELEMENT,
  StorageAccessComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_STORAGE_ELEMENT,
  PayloadComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_PAYLOAD_ELEMENT,
  EmulatedDevicesComponent,
  SELECTOR_LCU_DEVICE_DATA_FLOW_EMULATED_ELEMENT,


} from '@iot-ensemble/devices-flow-common';
import { createCustomElement } from '@angular/elements';

import 'zone.js/dist/zone';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppHostModule } from '@lowcodeunit/app-host-common';

@NgModule({
  declarations: [],
  imports: [
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
  exports: [],

})
export class AppModule implements DoBootstrap {
  constructor(protected injector: Injector) {}

  public ngDoBootstrap() {
    const manage = createCustomElement(ManageComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_MANAGE_ELEMENT, manage);

    const admin = createCustomElement(AdminComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_ADMIN_ELEMENT, admin);

    const devices = createCustomElement(DevicesComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_DEVICES_ELEMENT, devices);

    const setup = createCustomElement(LcuDeviceDataFlowSetupElementComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_SETUP_ELEMENT, setup);

    //need dashboard, emulated-devices, payload, storage-acess, telemetry

    const dashboard = createCustomElement(DashboardComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_DASHBOARD_ELEMENT, dashboard);

    const emulatedDevices = createCustomElement(EmulatedDevicesComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_EMULATED_ELEMENT, emulatedDevices);

    const payload = createCustomElement(PayloadComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_PAYLOAD_ELEMENT, payload);

    const storageAccess = createCustomElement(StorageAccessComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_STORAGE_ELEMENT, storageAccess);

    const telemetry = createCustomElement(TelemetryComponent, {
      injector: this.injector,
    });

    customElements.define(SELECTOR_LCU_DEVICE_DATA_FLOW_TELEMETRY_ELEMENT, telemetry);
  }
}
