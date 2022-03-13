import {Directive, HostBinding} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding("attr.data-bs-toggle") toggle = "dropdown";
}
