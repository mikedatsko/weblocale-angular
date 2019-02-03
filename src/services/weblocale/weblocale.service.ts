import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs/Subject';
import { ConfigInterface } from '../../interfaces';

@Injectable({
  providedIn: 'root',
})
export class WeblocaleService {
  languages_: any[] = [];
  languageDefault = '';
  language_: string = this.languageDefault;
  onChangeLanguage: Subject<string> = new Subject<string>();
  translations: any = {};

  constructor(
    private meta: Meta,
    private title: Title,
    private http: HttpClient,
    @Inject(DOCUMENT) private Document: any,
    @Inject('config') private config: ConfigInterface
  ) {
    this.languageDefault = config.languages[0];
    const languagePath = config.path || 'assets/locale';
    this.languages_ = config.languages.map(language => ({
      title: language,
      value: language,
      active: this.languageDefault === language,
      path: `${languagePath}/${language}.json`
    }));
    this.loadTranslations();
  }

  translate(inputText) {
    const language = this.language_ || this.languageDefault;
    const translated = this.translations[language] && this.translations[language][inputText]
      ? this.translations[language][inputText]
      : inputText;
    return translated;
  }

  get languages() {
    return this.languages_;
  }

  set language(language: string) {
    if (language !== 'en' && language !== 'ru') {
      language = this.languageDefault;
    }

    window.localStorage.setItem('l', language);
    this.language_ = language;
    this.Document.documentElement.lang = language;

    const metaTitle = this.config.metaTitle ? this.translate(this.config.metaTitle) : '';
    const metaKeywords = this.config.metaKeywords ? this.translate(this.config.metaKeywords) : '';
    const metaDescription = this.config.metaDescription ? this.translate(this.config.metaDescription) : '';

    this.title.setTitle(this.translate(metaTitle));
    this.meta.updateTag({ name: 'keywords', content: metaKeywords });
    this.meta.updateTag({ name: 'description', content: metaDescription });
    this.onChangeLanguage.next(language);
  }

  get language(): string {
    let language = window.localStorage.getItem('l');

    if (!language || language === 'undefined') {
      language = this.languageDefault;
      this.language = language;
    }

    return language;
  }

  loadTranslations() {
    this.languages_.forEach(language => {
      this.http.get(language.path).subscribe(
        translation => this.translations[language.value] = translation,
        error => console.error('Translation load error:', error)
      );
    });
  }
}
