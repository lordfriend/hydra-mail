import { Component, ExistingProvider, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const PASSWORD_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => PasswordFieldComponent),
  multi: true
};

@Component({
  selector: 'app-password-field',
  templateUrl: './password-field.component.html',
  styleUrls: ['./password-field.component.less'],
  providers: [PASSWORD_VALUE_ACCESSOR]
})
export class PasswordFieldComponent implements OnInit, ControlValueAccessor {

  @Input()
  placeholder = '';

  @Input()
  disabled = false;

  showPassword = false;

  value: string;

  get type(): 'password' | 'text' {
    return this.showPassword ? 'text' : 'password';
  }

  private _valueChangeFn = (_: any) => {};

  constructor() { }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onPassChange(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log(input.value);
    this._valueChangeFn(input.value);
  }

  ngOnInit() {
  }

  writeValue(obj: any): void {
    this.value = obj as string;
  }

  registerOnChange(fn: any): void {
    this._valueChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
