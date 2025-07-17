import { Component } from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { ReferenceComponent } from './reference/reference.component';
@Component({
  selector: 'app-references',
  imports: [
    HeaderComponent,
    TranslatePipe,
    NavBulletsComponent,
    ReferenceComponent,
  ],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent {
}
