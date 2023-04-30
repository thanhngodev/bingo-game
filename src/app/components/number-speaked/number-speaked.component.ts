import { Component, Input, OnInit } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';

@Component({
  selector: 'app-number-speaked',
  templateUrl: './number-speaked.component.html',
  styleUrls: ['./number-speaked.component.scss']
})
export class NumberSpeakedComponent implements OnInit {
  numberArr: Array<number> = []
  constructor(private bingoService: BingoService) { }

  ngOnInit() {
    this.bingoService.numberSpeaked$.subscribe(value => this.numberArr = value)
  }

}
