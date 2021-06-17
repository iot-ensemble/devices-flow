import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IoTEnsembleService {
  //  Constructors
  constructor(protected http: HttpClient) {}

  //  API Methods
  public ToggleEmulatedEnabled() {
    return this.http.post('devices/telemetry/emulated/toggle', {});
  };
}
