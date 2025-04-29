import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TranslatePipe, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

  onSubmit(ngForm: NgForm) {
    if (!ngForm.valid) {
      Object.values(ngForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (ngForm.valid && ngForm.submitted) {
      console.log(this.contactData);
    }
  }

  // autoResize(textarea: HTMLTextAreaElement) {
  //   textarea.style.height = "auto"; // Zurücksetzen
  //   textarea.style.height = Math.min(textarea.scrollHeight, 72) + "px"; // max 3 Zeilen (3 * 24px)
  // }
}
