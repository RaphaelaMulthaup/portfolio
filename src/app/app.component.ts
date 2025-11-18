import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  private subs = new Subscription();
  /**
   * Initializes the component, sets the initial page title based on
   * the current language, and listens for language change events
   * to update the title dynamically.
   */
  constructor(private title: Title, private translate: TranslateService) {
    this.setTitle();
    this.subs.add(
      this.translate.onLangChange.subscribe(() => {
        this.setTitle();
      })
    );
  }

  /**
   * Retrieves the translated title string and updates the document title.
   * Called initially and whenever the active language changes.
   */
  private setTitle() {
    this.translate.get('shared.titel').subscribe((title) => {
      this.title.setTitle(title);
    });
  }

  /**
   * Cleans up open subscriptions when the component is destroyed
   * to prevent potential memory leaks.
   */
  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
