import { Component, ElementRef, QueryList, ViewChildren, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReferencesComponent } from './references/references.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LandingPageComponent, AboutMeComponent, SkillsComponent, ProjectsComponent, ReferencesComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';

  //ab hier alles für das scrollen. Verstehe ich ncoh nciht so richtig
  @ViewChildren('section') sections!: QueryList<ElementRef>;
  private currentIndexMainComponents = 0;
  private isScrolling = false;

  scrollToSection(index: number) {
    if (index < 0 || index >= this.sections.length) return;
    this.currentIndexMainComponents = index;
    this.sections.toArray()[index].nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling) return;
    this.isScrolling = true;

    setTimeout(() => { this.isScrolling = false; }, 800); // Verhindert zu schnelles Scrollen

    if (event.deltaY > 0 && this.currentIndexMainComponents < this.sections.length - 1) {
      this.scrollToSection(++this.currentIndexMainComponents);
    } else if (event.deltaY < 0 && this.currentIndexMainComponents > 0) {
      this.scrollToSection(--this.currentIndexMainComponents);
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' && this.currentIndexMainComponents < this.sections.length - 1) {
      this.scrollToSection(++this.currentIndexMainComponents);
    } else if (event.key === 'ArrowUp' && this.currentIndexMainComponents > 0) {
      this.scrollToSection(--this.currentIndexMainComponents);
    }
  }
  //bis hier scrollen
}


