import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-form',
  imports: [FormsModule, TranslatePipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  contactData = {
    name: '',
    email: '',
    message: '',
  };

  onSubmit() {
    console.log(this.contactData);
  }
}
