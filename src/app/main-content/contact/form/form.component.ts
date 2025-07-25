import { CommonModule } from '@angular/common';
import { Component, DoCheck, ElementRef, inject, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';
import { TouchHoverDirective } from '../../shared/directives/touch-hover.directive';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TranslatePipe, CommonModule, TouchHoverDirective],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent implements DoCheck {
  /** Input refs to blur after submission */
  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') messageInput!: ElementRef;
  @ViewChild('email') email!: NgModel;

  /** Boolean indicating whether the overlay is open. */
  overlayOpen: boolean = false;

  /** Injected HTTP client */
  http = inject(HttpClient);

  emailHintShouldBeShown = false;

  onEmailBlur() {
    const value = this.contactData.email?.trim();
    const input = this.emailInput?.nativeElement;
    const isActive = document.activeElement === input;
    const isInvalid = this.email.valid === false;
    const hasValue = !!value;

    if (!isActive && isInvalid && hasValue) {
      this.emailHintShouldBeShown = true;
    }
  }

  ngDoCheck() {
    if (this.email && this.email.valid === true && this.emailHintShouldBeShown) {
      this.emailHintShouldBeShown = false;
    }
  }

  // isEmailFieldBlurredAndInvalid(): boolean {
  //   const input = this.emailInput?.nativeElement;
  //   return (
  //     !!input &&
  //     document.activeElement !== input &&
  //     this.email.valid === false && // statt !this.email.valid
  //     this.email.touched === true &&
  //     !!this.contactData.email?.trim()
  //   );
  // }
  /** Contact form data */
  contactData = {
    name: '',
    email: '',
    message: '',
    privacyPolicy: false,
  };

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
   */
  onSubmit(ngForm: NgForm) {
    if (!ngForm.valid) {
      Object.values(ngForm.controls).forEach((control) =>
        control.markAsTouched()
      );
      return;
    }
    if (ngForm.submitted && ngForm.valid) {
      this.http
        .post(this.post.endPoint, this.post.body(this.contactData))
        .subscribe({
          next: () => ngForm.resetForm(),
          error: (error) => console.error(error),
          complete: () => console.info('send post complete'),
        });
      this.blurFormAndOpenOverlay();
    }
  }

  /**
   * This function blurs the form inputs and briefly displays an overlay.
   */
  blurFormAndOpenOverlay() {
    setTimeout(() => {
      this.nameInput?.nativeElement.blur();
      this.emailInput?.nativeElement.blur();
      this.messageInput?.nativeElement.blur();
      this.overlayOpen = true;
      setTimeout(() => (this.overlayOpen = false), 3000);
    }, 200);
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
