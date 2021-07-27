import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IoTEnsembleTelemetryPayload } from '../state/iot-ensemble.state';

@Injectable({
  providedIn: 'root',
})
export class IoTEnsembleService {
  //  Constructors
  constructor(protected http: HttpClient) {}

  //  API Methods

  public EnrollDevice(DeviceName:any) {
    return this.http.post('',{});
  };
  
  public IssueDeviceSASToken(
    deviceName: string,
    expiryInSeconds: number = 0
  ): void{}

  public ListAllDeviceNames(childEntLookup: any, filter: string){
  }

  public RevokeDeviceEnrollment(deviceId: any) {
    return this.http.post('',{});
  }

  public SendDeviceMessage(
    deviceName: any,
    payload: IoTEnsembleTelemetryPayload
  ): void {}


  public ToggleEmulatedEnabled() {
    return this.http.post('devices/telemetry/emulated/toggle', {});
  };

  public ToggleTelemetrySync() {}

  public UpdateConnectedDevicesSync(page: number, pageSize: number) {
  }

  public UpdateTelemetrySync(    
    refreshRate: number,
    page: number,
    pageSize: number) {
  }

  
}
