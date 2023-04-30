import { Component, Input, OnInit } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'app-status-time',
  templateUrl: './status-time.component.html',
  styleUrls: ['./status-time.component.scss']
})
export class StatusTimeComponent implements OnInit {
  @Input() timeSpeed: number = 4
  percentNumber: number = 0
  flagRandom: any
  configColor = { '0%': '#ff0000', '50%': '#2db7f5', '100%': '#108ee9' }
  format = (percent: number): string => `${percent*0.01*this.timeSpeed}s`;
  constructor(private bingoService: BingoService) { }

  ngOnInit() {
    this.bingoService.start$.subscribe(value => {
      if (value) {
        this.flagRandom = setInterval(() => {
          if (this.percentNumber === 0) this.percentNumber = 100
          else {
            this.percentNumber = this.percentNumber - 10
          }
          // this.percentNumber = ((this.percentNumber + 0.5) / this.timeSpeed) * 100
          // if ((this.percentNumber * this.timeSpeed) / 100 === this.timeSpeed) {
          //   this.percentNumber = 0
          // }
        }, this.timeSpeed * 100);
      } else {
        clearInterval(this.flagRandom)
      }
    })
  }

}
