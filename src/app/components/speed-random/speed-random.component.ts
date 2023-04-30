import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NzMarks } from 'ng-zorro-antd/slider';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'app-speed-random',
  templateUrl: './speed-random.component.html',
  styleUrls: ['./speed-random.component.scss']
})
export class SpeedRandomComponent implements OnInit {
  @Output() getTimeSpeed: EventEmitter<any> = new EventEmitter();

  @Input() timeSpeed: number = 4
  @Input() titleTime: string = "SETTING_SPEED"
  @Input() disable: boolean = false
  @Input() maxRange: number = 10

  marks: NzMarks = {
    1: {
      style: {
        color: '#f50'
      },
      label: '<strong>1s</strong>'
    },
    5: {
      style: {
        color: '#f50'
      },
      label: '<strong>5s</strong>'
    },
    10: {
      style: {
        color: '#f50'
      },
      label: '<strong>10s</strong>'
    },
    20: {
      style: {
        color: '#f50'
      },
      label: '<strong>20s</strong>'
    },
    30: {
      style: {
        color: '#f50'
      },
      label: '<strong>30s</strong>'
    }
  };
  timeSpeedForm!: FormGroup;


  constructor(
  ) { }

  ngOnInit(): void {
  }

  formatter(value: number): string {
    return `${value} Giây`;
  }

  onChangeTimeSpeed(event: any) {
    this.getTimeSpeed.emit(event)
  }

}
