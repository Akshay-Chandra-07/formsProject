import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-dropdown',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomDropdownComponent),
      multi: true,
    },
  ],
  templateUrl: './custom-dropdown.component.html',
  styleUrl: './custom-dropdown.component.css',
})
export class CustomDropdownComponent {
  value: any;
  onChange: any = () => {};
  onTouch: any = () => {};
  @Input() options: any = [];
  @Input() label: string = '';
  constructor() {}

  writeValue(value: any) {
    this.value = value;
    this.onChange(this.value);
    this.onTouch();
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  onInput(event: any) {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouch();
  }
}
