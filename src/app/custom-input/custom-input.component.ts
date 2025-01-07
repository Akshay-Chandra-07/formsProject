import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  imports: [CommonModule],
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
  styleUrl: './custom-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputComponent implements ControlValueAccessor {
  @Input() value: string = '';
  onChange: any = () => {};
  onTouch: any = () => {};
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() errorMessage: string = '';
  @Input() type: string = '';
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
