import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p[fundoAmarelo]'
})
export class FundoAmareloDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    //this.elementRef.nativeElement.style.backgroundColor = 'yellow';
    // console.log(this.elementRef.nativeElement);
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'yellow');
   }

}
