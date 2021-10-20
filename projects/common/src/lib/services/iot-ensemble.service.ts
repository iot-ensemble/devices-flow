// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { IoTEnsembleTelemetryPayload } from '../state/iot-ensemble.state';

// @Injectable({
//   providedIn: 'root',
// })
// export class IoTEnsembleService {
//   //  Constructors
//   constructor(protected http: HttpClient) {}

//   //  API Methods

//   public EnrollDevice(DeviceName:any) {
//     return this.http.post('',{});
//   };
  
//   public IssueDeviceSASToken(
//     deviceName: string,
//     expiryInSeconds: number = 0
//   ){
//     return this.http.get(`devices/${deviceName}`, {})
//   }

//   public ListAllDeviceNames(childEntLookup: any, filter: string){
//     return this.http.get(`devices/`, {})
//   } 

//   public RevokeDeviceEnrollment(deviceId: any) {
//     return this.http.post(`devices/${deviceId}/revoke`,{});
//   }

//   public SendDeviceMessage(
//     deviceName: any,
//     payload: IoTEnsembleTelemetryPayload
//   ) {
//     this.http.post(`/devices/from/${deviceName}/send`, {});
//   }

//   public UpdateConnectedDevicesSync(page: number, pageSize: number) {
//   }
  
// }
