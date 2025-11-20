import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { TouchHoverDirective } from '../../shared/directives/touch-hover.directive';
import { HexagonComponent } from '../../shared/hexagon/hexagon.component';
interface ReferenceData {
  name: string;
  text: string;
  designation: string;
  linkedIn: string;
}

@Component({
  selector: 'app-reference',
  imports: [TranslatePipe, HexagonComponent, CommonModule, TouchHoverDirective],
  templateUrl: './reference.component.html',
  styleUrl: './reference.component.scss',
})
export class ReferenceComponent {
  /** This variable specifies which data set is used for the app-reference. */
  @Input() referenceProvider!: string;
  /** The data of the references. */
  dataReferences: { [key: string]: ReferenceData } = {
    feldtmann: {
      name: 'Nicolaus Feldtmann',
      text: 'textFeldtmann',
      designation: 'designationFeldtmann',
      linkedIn: 'https://www.linkedin.com/in/nicolaus-feldtmann-861371376/',
    },
    neußer: {
      name: 'Franz Neußer',
      text: 'textNeußer',
      designation: 'designationNeußer',
      linkedIn: 'https://www.linkedin.com/in/franz-neu%C3%9Fer-460214376/',
    },
    vollmann: {
      name: 'Anne Vollmann',
      text: 'textVollmann',
      designation: 'designationVollmann',
      linkedIn: 'https://www.linkedin.com/in/anne-vollmann/',
    },
    buha: {
      name: 'Andrei Buha',
      text: 'textBuha',
      designation: 'designationBuha',
      linkedIn:
        'https://www.linkedin.com/in/andrei-octavian-buha-web-developer/',
    },
  };

  /** This variable indicates whether the referenceDiv is hovered. */
  referenceDivIsHovered: boolean = false;

  /**
   * Sets `referenceDivIsHovered` to false after a short delay.
   */
  setHoveredFalseDelayed() {
    setTimeout(() => {
      this.referenceDivIsHovered = false;
    }, 200);
  }
}
