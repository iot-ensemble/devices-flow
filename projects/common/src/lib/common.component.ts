import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-common',
  template: ` <p>common works!</p> `,
  styles: [],
})
export class CommonComponent implements OnInit {
  public Hey?: string;

  constructor() {}

  ngOnInit(): void {}
}
