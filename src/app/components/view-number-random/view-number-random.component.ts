import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { BingoService } from 'src/app/services/bingo.service';
import { SpeechDataVi } from 'src/data/speech';

@Component({
  selector: 'app-view-number-random',
  templateUrl: './view-number-random.component.html',
  styleUrls: ['./view-number-random.component.scss']
})
export class ViewNumberRandomComponent implements OnInit {
  @Input() fromNumber: number = 1
  @Input() toNumber: number = 90
  @Input() timeSpeed: number = 4
  @Output() getNumberResultSpeaked: EventEmitter<any> = new EventEmitter();

  numberSpeaked: Array<number> = []
  numberData: Array<number> = []
  startGame: boolean = false
  numberView: number | null = null
  flagRandom: any
  flagSpeed: any
  elmAudio: any = document.getElementById('play-recognition')
  dataSpeech = SpeechDataVi
  itemSpeechNumber: string = ""

  constructor(private bingoService: BingoService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.elmAudio = document.getElementById('play-recognition')
    }, 200);
    this.bingoService.arrDataNumber$.subscribe(value => this.numberData = value)
    this.bingoService.start$.subscribe(value => {
      if (value) {
        this.randomFollowTimeSpeed(this.timeSpeed)
      } else {
        this.stopRandomFollowTimeSpeed()
      }
    })
    this.bingoService.numberSpeaked$.subscribe(value => {
      if (value) {
        this.numberView = value[value.length - 1]
        this.handleChangePlay(true)
      }
    })
  }

  randomFollowTimeSpeed(time: number = 0) {
    this.flagRandom = setInterval(() => {
      let idNumberNew = this.randomIntFromInterval()
      if (this.numberData.length > 0) {
        this.numberSpeaked = [...this.numberSpeaked, this.numberData[idNumberNew]]
        this.bingoService.numberSpeaked$.next(this.numberSpeaked)

        this.numberData.splice(idNumberNew, 1)
        this.bingoService.arrDataNumber$.next(this.numberData)
      } else {
        this.stopRandomFollowTimeSpeed()
        this.bingoService.start$.next(false)
      }
    }, time * 1000);
  }

  stopRandomFollowTimeSpeed() {
    clearInterval(this.flagRandom)
  }

  checkRandomDuplicate() {
    let idNumberNew = this.randomIntFromInterval()
    if (this.numberData.length > 0) {
      this.numberData.splice(idNumberNew, 1)
      this.bingoService.arrDataNumber$.next(this.numberData)
    } else {
      this.stopRandomFollowTimeSpeed()
    }
    return this.numberData[idNumberNew]
  }

  randomIntFromInterval() {
    return Math.round(Math.random() * (this.numberData.length - 1))
  }

  handleChangePlay(status: boolean) {
    if (this.elmAudio) {
      this.elmAudio.play = status;
    }
  }
}
