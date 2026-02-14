import {AbstractControl} from '@angular/forms';

export class CustomValidators {
  static arrayNotEmpty(control: AbstractControl) {
    const array = control.value[0] as unknown[];
    return !array || array.length <= 0
      ? { arrayEmpty: { value: control.value }}
      : null;
  }
}
