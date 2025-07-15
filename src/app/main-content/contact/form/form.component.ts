import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TouchHoverDirective } from '../../shared/directives/touch-hover.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TranslatePipe, CommonModule, TouchHoverDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  http = inject(HttpClient);

  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

  mailTest = false;

  post = {
    endPoint: 'https://raphaela-multhaup.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (!ngForm.valid) {
      Object.values(ngForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    if (ngForm.submitted && ngForm.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: (response) => {
            ngForm.resetForm();
          },
          error: (error) => {
            console.error(error);
          },
          complete: () => console.info('send post complete'),
        });
      this.nameInput?.nativeElement.blur();
      this.emailInput?.nativeElement.blur();
      this.messageInput?.nativeElement.blur();
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  onInputFocus(input: HTMLInputElement) {
    const isIOS = /iPhone|iPod|iPad/.test(navigator.userAgent);
    if (!isIOS) {
      // Cursor-Fix durch Repaint
      const val = input.value;
      input.value = '';
      input.value = val;
    }

    // // Optional: Cursor an Ende setzen
    // requestAnimationFrame(() => {
    //   input.setSelectionRange(val.length, val.length);
    // });
  }
}
