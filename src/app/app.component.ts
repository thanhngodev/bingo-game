import { Component, OnInit } from '@angular/core';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzModalService } from 'ng-zorro-antd/modal';
import { THEME_DATA } from 'src/data/theme';
import { BingoService } from './services/bingo.service';
import { THEME_OPTION } from './constant';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  themeData = THEME_DATA
  fromNumber: number = 1
  toNumber: number = 90
  timeSpeed: number = 4

  disableGame = {
    start: false,
    stop: true
  }

  startStatus: boolean = false

  numberSpeaked: Array<number> = []
  maxRange: number = 10
  languages = [{ title: 'VI', code: "vi" }, { title: 'EN', code: "en" }]
  currentLang: string = localStorage.getItem('lang') || 'vi'
  multipleValueNumber: Array<number> = [];

  constructor(
    private nzConfigService: NzConfigService,
    private modal: NzModalService,
    private bingoService: BingoService,
    private translateService: TranslateService
  ) {
    this.translateService.setDefaultLang('vi')
    this.translateService.use(localStorage.getItem("lang") || 'vi')
  }

  ngOnInit(): void {
    const theme = localStorage.getItem('theme') as string
    if (theme && this.checkTheme(theme)) {
      this.changeTheme(theme)
    } else {
      this.setDefaultTheme()
    }
    this.bingoService.arrDataNumber$.next(this.bingoService.initDataNumber())
    this.bingoService.start$.subscribe(value => this.startStatus = value)
    this.bingoService.numberSpeaked$.subscribe(value => this.numberSpeaked = value)
  }

  checkTheme(theme: any) {
    return this.themeData.find((item) => item.code === theme)
  }

  changeTheme(theme: any) {
    localStorage.setItem('theme', theme);
    this.themeData.find((item) => {
      if (item.code === theme) this.nzConfigService.set('theme', { primaryColor: item.color })
    })
  }

  setDefaultTheme() {
    localStorage.setItem('theme', 'primary');
  }

  handelStartGame() {
    this.bingoService.start$.next(true)
    this.disableGame.start = this.startStatus
    this.disableGame.stop = !this.startStatus
  }

  handelStopGame() {
    this.bingoService.start$.next(false)
    this.disableGame.start = this.startStatus
    this.disableGame.stop = !this.startStatus
  }

  handelResetGame() {
    this.modal.confirm({
      nzTitle: '<i>Do you want to reset game?</i>',
      nzOnOk: () => {
        window.location.reload()
      }
    });
  }

  onChangeLanguage(event: string) {
    localStorage.setItem('lang', event)
    this.translateService.use(localStorage.getItem('lang') || 'vi')
  }

  getTimeSpeed(event: number) {
    this.timeSpeed = event
  }

  getfromToNumber(event: { from: number, to: number }) {
    if (event) {
      this.fromNumber = event.from
      this.toNumber = event.to
      this.bingoService.arrDataNumber$.next(this.bingoService.initDataNumber(event.from, event.to))
    }
  }

}
