import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TtsService {
  speakVietnamese(text: string): void {
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;
      const voice = new SpeechSynthesisUtterance(text);
      voice.lang = 'vi-VN'; // Set the language to Vietnamese
      synth.speak(voice);
    } else {
        this.speakVietnamese("Cái này nói không được rồi bà con ơi")
    }
  }
}
