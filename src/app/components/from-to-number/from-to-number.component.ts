import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-from-to-number',
  templateUrl: './from-to-number.component.html',
  styleUrls: ['./from-to-number.component.scss']
})

export class FromToNumberComponent implements OnInit {
  @Output() fromToNumberData: EventEmitter<any> = new EventEmitter();

  @Input() fromTitleField: string = "FROM_NUMBER";
  @Input() toTitleField: string = "TO_NUMBER";
  @Input() titleFromTo: string = "SETTING_NUMBER";
  @Input() fromNumber: any = null
  @Input() toNumber: any = null
  @Input() step: number = 1
  @Input() min: number = -10000000000
  @Input() max: number = 10000000000
  @Input() equal: boolean = true
  @Input() disable: boolean = false
  @Input() required: boolean = false
  @Input() reset: boolean = false


  constructor() { }
  ngOnInit(): void {

  }

  onChangeFrom(event: any) {
    if ((!this.equal && event < this.toNumber) || (this.equal && event >= this.toNumber)) {
      this.fromToNumberData.emit({ from: event, to: this.toNumber })
      this.fromNumber = event
    } else {
      this.fromToNumberData.emit({ from: 1, to: 90 })
      window.location.reload
    }
  }

  onChangeTo(event: any) {
    if ((!this.equal && event > this.fromNumber) || (this.equal && event >= this.fromNumber)) {
      this.fromToNumberData.emit({ from: this.fromNumber, to: event })
      this.toNumber = event
    } else {
      this.fromToNumberData.emit({ from: 1, to: 90 })
      window.location.reload
    }
  }

}
