import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';
import { IoTEnsembleService } from './../../services/iot-ensemble.service';

@Component({
  selector: 'lcu-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})
export class DevicesComponent implements OnInit {
  //  Fields

  //  Properties
  public AddDeviceFormGroup!: FormGroup;

  public DeviceNames!: string[];

  public get DeviceNameErrorText(): string {
    let errorText: string = "";

    if (this.AddDeviceFormGroup.get('deviceName').hasError('required') && this.AddDeviceFormGroup?.touched) {
      errorText = 'Device name is required\r\n';
    }

    if (this.AddDeviceFormGroup.get('deviceName').hasError('maxlength')) {
      errorText = 'Device name cannot be longer than 90 characters\r\n';
    }

    if (this.AddDeviceFormGroup!.get('deviceName').hasError('pattern')) {
      errorText = `A case-sensitive string of ASCII 7-bit alphanumeric characters plus certain special characters: - . % _ * ? ! ( ) , : = @ $ ' \r\n`;
    }

    if (this.AddDeviceFormGroup!.get('deviceName').hasError('duplicateName')) {
      errorText = ' Device name already exists \r\n';
    }
    if((this.State?.DevicesConfig?.Status?.Code === 1) &&
       (this.DeviceNameToAdd === this.AddDeviceFormGroup?.controls.deviceName.value)){
      errorText = ' Device name already exists \r\n';
    }

    return errorText;
  }

  public DeviceNameToAdd: string;

  public EnrollOpen?: boolean;

  public get MaxDevicesReached(): boolean {
    return (
      this.State.DevicesConfig.TotalDevices >=
      this.State.DevicesConfig.MaxDevicesCount
    );
  }

  @Input('state')
  public State!: IoTEnsembleState;
  

  //  Constructors
  constructor(
    protected iotEnsSvc: IoTEnsembleService,
    protected formBldr: FormBuilder,
    ) {
    this.State = {};
    this.DeviceNameToAdd = '';
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupAddDeviceForm();
  }

  //  API Methods
  public EnrollDeviceSubmit() {
    this.State!.DevicesConfig!.Loading = true;

    this.DeviceNameToAdd = this.AddDeviceFormGroup?.controls.deviceName.value;

    this.iotEnsSvc.EnrollDevice({
      DeviceName: this.AddDeviceFormGroup?.controls.deviceName.value,
    });
    this.EnrollOpen = false;
  }

  public EnrollNewDevice(){
    this.EnrollOpen = true;
    if(this.AddDeviceFormGroup){
        this.AddDeviceFormGroup.reset();
      }
  }

  public CancelAddingDevice(){
    this.EnrollOpen = false;
    this.AddDeviceFormGroup?.reset();
    this.State!.DevicesConfig!.Status! = null;
  }

  public IssueDeviceSASToken(deviceName: string) {

    this.State.DevicesConfig!.Loading = true;

    //  TODO:  Pass through expiry time in some way?
    this.iotEnsSvc.IssueDeviceSASToken(deviceName, 0);
  }

  public DeviceTablePageEvent(event: any) {
    if (event.pageIndex + 1 !== this.State?.DevicesConfig?.Page) {
      this.UpdateDeviceTablePageIndex(event.pageIndex + 1);
    } else if (event.pageSize !== this.State?.DevicesConfig?.PageSize) {
      this.UpdateDeviceTablePageSize(event.pageSize);
    }
  }

  public RevokeDeviceEnrollmentClick(deviceId: string) {
    this.State.DevicesConfig!.Loading = true;

    this.iotEnsSvc.RevokeDeviceEnrollment(deviceId);
  }

  //Helpers

    /**
   * Custom Validator to determine if the device name already exists by checking the deviceNames array
   */

  protected deviceNameValidator(): ValidatorFn {
      return (control: AbstractControl): { [key: string]: any } | null =>
        !this.DeviceNames.includes(control.value)
          ? null
          : { duplicateName: control.value };
    }

  public ToggleAddingDevice() {
    this.EnrollOpen = !this.EnrollOpen;
  }
  public UpdateDeviceTablePageIndex(page: number) {
    this.State.DevicesConfig.Loading = true;

    this.iotEnsSvc.UpdateConnectedDevicesSync(
      page,
      this.State?.DevicesConfig?.PageSize
    );
  }

  protected setupAddDeviceForm() {
    const regex: RegExp = /(^[A-Za-z0-9-\.%_\*?!(),:=@$']*$)/;
    this.AddDeviceFormGroup = this.formBldr.group({
      deviceName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(90),
          Validators.pattern(regex),
          this.deviceNameValidator(),
        ]),
      ],
    });
  }


  
  public UpdateDeviceTablePageSize(pageSize: number) {
    this.State!.DevicesConfig!.Loading = true;

    this.iotEnsSvc.UpdateConnectedDevicesSync(
      this.State.DevicesConfig.Page,
      pageSize
    );
  }
}
