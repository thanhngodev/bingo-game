import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingoService {
  timeSpeed$ = new BehaviorSubject<number>(4);
  start$ = new BehaviorSubject<boolean>(false);
  numberSpeaked$ = new BehaviorSubject<any>([]);
  arrDataNumber$ = new BehaviorSubject<Array<number>>([])
  lang$ = new BehaviorSubject<string>('vi')

  constructor(private translateService: TranslateService) { }

  initDataNumber(from: number = 1, to: number = 90) {
    var result = []
    for (let i = from; i <= to; i++) result.push(i)
    return result
  }

  onChangeLanguage(lang: string) {
    localStorage.setItem('lang', lang)
    this.lang$.next(localStorage.getItem('lang') || 'vi')
    this.translateService.use(localStorage.getItem('lang') || 'vi')
  }
}
