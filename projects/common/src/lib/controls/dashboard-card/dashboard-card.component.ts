import { Component, OnInit, Injector, Input } from '@angular/core';

export const SELECTOR_APP_HOST_DASHBOARD_CARD_ELEMENT = 'lcu-dashboard-card-element';

@Component({
  selector: SELECTOR_APP_HOST_DASHBOARD_CARD_ELEMENT,
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {
  //  Fields

  //  Properties
  @Input('icon')
  public Icon?: string;

  @Input('title')
  public Title?: string;

  //  Constructors
  constructor(protected injector: Injector) {
  }

  //  Life Cycle
  public ngOnInit() {
  }

  //  API Methods

  //  Helpers
}
