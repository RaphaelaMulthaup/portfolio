import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { HexagonComponent } from '../hexagon/hexagon.component';
import { CommonModule } from '@angular/common';
interface ReferenceData {
  name: string;
  text: string;
  designation: string;
  linkedIn: string;
}

@Component({
  selector: 'app-reference',
  imports: [TranslatePipe, HexagonComponent, CommonModule],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  /** This variable specifies which data set is used for the app-reference. */
  @Input() referenceProvider!: string;
  /** The data of the references. */
  dataReferences: { [key: string]: ReferenceData } = {
    martens: {
      name: 'Helmut Martens',
      text: 'textMartens',
      designation: 'designationMartens',
      linkedIn:
        'https://www.linkedin.com/in/helmut-martens-2174921b2/?originalSubdomain=py',
    },
    neußer: {
      name: 'Franz Neußer',
      text: 'textNeußer',
      designation: 'designationNeußer',
      linkedIn: 'string',
    },
    potter: {
      name: 'Harry Potter',
      text: 'textPotter',
      designation: 'designationPotter',
      linkedIn: 'string',
    },
  };
  /** This variable indicates whether the referenceDiv is hovered. */
  referenceDivIsHoverd: boolean = false;
}
