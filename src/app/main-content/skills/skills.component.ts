import {
  Component,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { HeaderComponent } from '../shared/header/header.component';
import { TranslatePipe, TranslateDirective } from '@ngx-translate/core';
import { NavBulletsComponent } from '../shared/nav-bullets/nav-bullets.component';
import { HexagonComponent } from '../shared/hexagon/hexagon.component';
import { CommonModule } from '@angular/common';
import { OverlayController, PortfolioService } from '../../portfolio.service';

/**
 * The SkillsComponent displays a visual representation of technical skills
 * with interactive elements and overlay functionality.
 */
@Component({
  selector: 'app-skills',
  imports: [
    HeaderComponent,
    TranslatePipe,
    TranslateDirective,
    NavBulletsComponent,
    HexagonComponent,
    CommonModule,
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  /** Injected instance of PortfolioService for shared functionality */
  portfolioService = inject(PortfolioService);

  /** Indicates whether the hat icon is currently being hovered */
  hatIsHovered: boolean = false;

  /** Controller instance for managing overlay behavior */
  overlayController: OverlayController;

  constructor() {
    // Initialize overlay controller from portfolio service
    this.overlayController = this.portfolioService.createOverlayController();
  }

  /**
   * Sets the overlay element reference when view child is available.
   * 
   * @param ref The ElementRef of the skills overlay container
   */
  @ViewChild('overlaySkills') set _(ref: ElementRef) {
    this.overlayController.overlayElementRef = ref;
  }

  /**
   * Listens for document clicks to handle overlay closing when clicking outside.
   * 
   * @param event The mouse click event
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.overlayController.handleDocumentClick(event);
  }

  /** 
   * Array containing skill definitions with names and image paths.
   * Ordered and structured for consistent display in hexagon pattern.
   */
  skillList: { name: string; path: string }[] = [
    {
      name: 'HTML',
      path: 'assets/img/0_html.png',
    },
    {
      name: 'CSS',
      path: 'assets/img/1_css.png',
    },
    {
      name: 'JavaScript',
      path: 'assets/img/2_javaScript.png',
    },
    {
      name: 'TypeScript',
      path: 'assets/img/3_typeScript.png',
    },
    {
      name: 'Angular',
      path: 'assets/img/4_angular.png',
    },
    {
      name: 'Firebase',
      path: 'assets/img/5_firebase.png',
    },
    {
      name: 'Git',
      path: 'assets/img/6_git.png',
    },
    {
      name: 'Rest-Api',
      path: 'assets/img/7_restApi.png',
    },
    {
      name: 'Scrum',
      path: 'assets/img/8_scrum.png',
    },
    {
      name: 'Material Design',
      path: 'assets/img/9_materialDesign.png',
    },
  ];
}