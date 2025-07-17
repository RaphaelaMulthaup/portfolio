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
  /** Input refs to blur after submission */
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef;
  @ViewChild('messageInput') messageInput!: ElementRef;

  overlayOpen: boolean = false;

  /** Injected HTTP client */
  http = inject(HttpClient);

  /** Contact form data */
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

  /** Enables test mode for skipping request */
  mailTest = false;

  /** POST request config */
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

  /**
   * Sends contact data via HTTP POST.
   * If form is invalid, all controls are marked as touched.
   * In test mode, only resets the form.
   */
  onSubmit(ngForm: NgForm) {
    if (!ngForm.valid) {
      Object.values(ngForm.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }

    if (ngForm.submitted && ngForm.valid && !this.mailTest) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => ngForm.resetForm(),
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
      this.nameInput?.nativeElement.blur();
      this.emailInput?.nativeElement.blur();
      this.messageInput?.nativeElement.blur();
      this.overlayOpen = true;
      setTimeout(() => (this.overlayOpen = false), 3000);
    } else if (ngForm.submitted && ngForm.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }

  /**
   * Cursor fix via repaint on input focus
   */
  onInputFocus(input: HTMLInputElement) {
    const isIOS = /iPhone|iPod|iPad/.test(navigator.userAgent);
    if (!isIOS) {
      const val = input.value;
      input.value = '';
      input.value = val;
    }
  }
}
