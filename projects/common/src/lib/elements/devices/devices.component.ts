import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { GenericModalModel } from '../../models/generice-modal.model';
import { GenericModalService } from '../../services/generic-modal.service';
import { IoTEnsembleStateContext } from '../../state/iot-ensemble-state.context';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';
import { SasTokenDialogComponent } from '../manage/controls/sas-token-dialog/sas-token-dialog.component';
import { PayloadFormComponent } from '../../controls/payload-form/payload-form.component';

@Component({
  selector: 'lcu-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {
  //  Fields
  
  protected stateHandlerSub: Subscription;

  protected devicesSasTokensOpened: boolean;

  //  Properties
  public AddDeviceFormGroup: FormGroup;

  public ConnectedDevicesInfoCardFlex: string;

  public DeviceNames: string[];

  public get DeviceNameErrorText(): string {
    let errorText: string = null;

    if (this.AddDeviceFormGroup.get('deviceName').hasError('required') && this.AddDeviceFormGroup.touched) {
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
    protected genericModalService: GenericModalService<PayloadFormComponent>,
    protected iotEnsCtxt: IoTEnsembleStateContext,
    protected formBldr: FormBuilder,
    ) {
    this.State = {};
    this.DeviceNameToAdd = '';
  }

  //  Life Cycle
  public ngOnInit() {
    this.setupStateHandler();
    this.setupAddDeviceForm();
  }

  //  API Methods
  public get AddDeviceFGDeviceName(): AbstractControl{
    return this.AddDeviceFormGroup.get('deviceName');
  }

  public EnrollDeviceSubmit() {
    this.State!.DevicesConfig!.Loading = true;

    this.DeviceNameToAdd = this.AddDeviceFormGroup?.controls.deviceName.value;

    this.iotEnsCtxt.EnrollDevice({
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

  public DeviceSASTokensModal(): void {
    // debugger;
    if (
      !this.devicesSasTokensOpened &&
      !!this.State?.DevicesConfig?.SASTokens
    ) {
      /**
       * Acces component properties not working - shannon
       *
       * TODO: get this working
       */
      // const tt = el.nativeElement.DeviceName;
      // payloadForm.DeviceName = 'blah;

      const modalConfig: GenericModalModel = new GenericModalModel({
        ModalType: 'data', // type of modal we want (data, confirm, info)
        CallbackAction: (val: any) => {}, // function exposed to the modal
        Component: SasTokenDialogComponent, // set component to be used inside the modal
        Data: {
          SASTokens: this.State?.DevicesConfig?.SASTokens,
        },
        LabelCancel: 'Close',
        // LabelAction: 'OK',
        Title: 'Device SAS Tokens',
        Width: '50%',
      });

      this.genericModalService.Open(modalConfig);

      this.genericModalService.ModalComponent.afterClosed().subscribe(
        (res: any) => {
          this.Refresh('Devices');

          this.devicesSasTokensOpened = false;
        }
      );

      this.devicesSasTokensOpened = true;
    }
  }

  public IssueDeviceSASToken(deviceName: string) {

    this.State.DevicesConfig.Loading = true;

    //  TODO:  Pass through expiry time in some way?
    this.iotEnsCtxt.IssueDeviceSASToken(deviceName, 0);
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

    this.iotEnsCtxt.RevokeDeviceEnrollment(deviceId);
  }

  public Refresh(ctxt: string) {

    const loadingCtxt = this.State[ctxt] || this.State;

    loadingCtxt.Loading = true;

    this.iotEnsCtxt.$Refresh();

    /**
     * as per a discussion with Mike,
     * placing this here to circumvent, bug 9297, for now - shannon
     *
     */
    loadingCtxt.Loading = false;
    //
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

    this.iotEnsCtxt.UpdateConnectedDevicesSync(
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
          this.deviceNameValidator()
        ]),
      ],
    });
  }

  protected setupStateHandler() {
    this.stateHandlerSub = this.iotEnsCtxt.Context.subscribe((state) => {
      this.State = Object.assign(this.State, state);

      // console.log("State: ", this.State)
      this.handleStateChanged();
    });
  }

  protected handleStateChanged() {
    this.DeviceSASTokensModal();

    this.DeviceNames =
      this.State?.DevicesConfig?.Devices?.map((d) => d.DeviceName) || [];
    if (this.State?.Telemetry) {
      if(this.EnrollOpen === undefined)
        this.EnrollOpen = this.isEnrollOpen();
    }

    this.setConnectedDevicesInfoCardFlex();
  }

  protected isEnrollOpen() {
    if(this.State.DevicesConfig.TotalDevices > 0)
      return false
    return true;
  }

  protected setConnectedDevicesInfoCardFlex() {
    const maxDeviceFlex = this.MaxDevicesReached ? '100%' : '50%';

    this.ConnectedDevicesInfoCardFlex = this.EnrollOpen ? maxDeviceFlex : '100%';
  }

  public UpdateDeviceTablePageSize(pageSize: number) {
    this.State!.DevicesConfig!.Loading = true;

    this.iotEnsCtxt.UpdateConnectedDevicesSync(
      this.State.DevicesConfig.Page,
      pageSize
    );
  }
}
