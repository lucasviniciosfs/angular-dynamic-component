import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adDirective]'
})
export class AdDirective {

  constructor(
    public viewContainerRef: ViewContainerRef
  ) { }

}
