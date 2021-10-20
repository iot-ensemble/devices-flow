import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LCUServiceSettings } from '@lcu/common';
import { Subscription } from 'rxjs/internal/Subscription';
import { IoTEnsembleStateContext } from '../../state/iot-ensemble-state.context';
import { IoTEnsembleState } from '../../state/iot-ensemble.state';

@Component({
  selector: 'lcu-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  // Fields
  protected stateHandlerSub: Subscription;
  // Properties
  public DashboardIFrameURL: SafeResourceUrl;

  public FreeboardURL: string;

  @Input('state')
  public State!: IoTEnsembleState;
  
  // Constructors
  constructor( 
    protected iotEnsCtxt: IoTEnsembleStateContext,
    protected lcuSvcSettings: LCUServiceSettings,
    protected sanitizer: DomSanitizer,
  ) {
    this.State = {};
   }

  // Life Cycle
  public ngOnDestroy(): void {
    this.stateHandlerSub?.unsubscribe();
  }

  public ngOnInit() {
    this.setupStateHandler();
  }

  // Helpers
  protected handleStateChanged() {
    this.setupFreeboard();
  }

  protected setDashboardIFrameURL() {
    const source = this.State?.Dashboard?.FreeboardConfig
      ? JSON.stringify(this.State?.Dashboard?.FreeboardConfig)
      : '{}';

    this.FreeboardURL = this.lcuSvcSettings.State.FreeboardURL || '/freeboard';

    this.DashboardIFrameURL = this.sanitizer.bypassSecurityTrustResourceUrl(
      `${this.FreeboardURL}#data=${source}`
    );
  }

  protected setupFreeboard() {
    this.setDashboardIFrameURL();

    if (this.State?.Dashboard && this.State?.Dashboard.FreeboardConfig) {
      //   // freeboard.initialize(true);
      //   // const dashboard = freeboard.loadDashboard(
      //   //   this.State.Dashboard.FreeboardConfig,
      //   //   () => {
      //   //     freeboard.setEditing(false);
      //   //   }
      //   // );
      //   // console.log(dashboard);
    }
  }

  protected setupStateHandler() {
    this.stateHandlerSub = this.iotEnsCtxt.Context.subscribe((state) => {
      this.State = Object.assign(this.State, state);

      // console.log("State: ", this.State)

      this.handleStateChanged();
    });
  }

}
