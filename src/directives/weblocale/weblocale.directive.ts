import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { WeblocaleService } from '../../services';

// const log = logger('LocaleDirective', 'directive');

@Directive({
  selector: '[appLocale]'
})
export class WeblocaleDirective implements OnInit {
  @Input() locale: string = '';
  element: HTMLElement;
  language = this.localeSrv.language;

  constructor(
    el: ElementRef,
    private localeSrv: WeblocaleService
  ) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.setLocale();
  }

  setLocale() {
    this.element.innerText = this.localeSrv.translate(this.locale);
  }
}
