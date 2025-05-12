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

  mailTest = true;

  post = {
    endPoint: 'https://deineDomain.de/sendMail.php',
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
      // this.http
      //   .post(this.post.endPoint, this.post.body(this.contactData))
      //   .subscribe({
      //     next: (response) => {
      //       ngForm.resetForm();
      //     },
      //     error: (error) => {
      //       console.error(error);
      //     },
      //     complete: () => console.info('send post complete'),
      //   });
    } else if (ngForm.submitted && ngForm.form.valid && this.mailTest) {
      ngForm.resetForm();
    }
  }
}
