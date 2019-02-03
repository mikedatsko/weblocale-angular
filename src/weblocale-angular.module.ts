import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { WeblocaleDirective } from './directives';
import { WeblocalePipe } from './pipes';
import { WeblocaleService } from './services';
import { ConfigInterface } from './interfaces';

@NgModule({
  declarations: [ WeblocaleDirective, WeblocalePipe ],
  exports: [ WeblocaleDirective, WeblocalePipe ],
  imports: [ CommonModule, HttpClientModule ],
  providers: [ WeblocaleService ]
})
export class WeblocaleAngularModule {
  static forRoot(config: ConfigInterface): ModuleWithProviders {
    return {
      ngModule: WeblocaleAngularModule,
      providers: [ WeblocaleService, {provide: 'config', useValue: config} ]
    };
  }
}
