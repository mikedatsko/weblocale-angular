import { Pipe, PipeTransform } from '@angular/core';
import { WeblocaleService } from '../../services';

@Pipe({
  name: 'weblocale',
  pure: false
})
export class WeblocalePipe implements PipeTransform {
  constructor(private localeSrv: WeblocaleService) {
  }

  transform(value: any, args?: any): any {
    return this.localeSrv.translate(value);
  }

}
