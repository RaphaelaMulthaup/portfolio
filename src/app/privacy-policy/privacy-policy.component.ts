import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../main-content/shared/main-header/main-header.component';
import { FooterComponent } from '../main-content/shared/footer/footer.component';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * Component that displays the privacy policy page.
 * 
 * On initialization, it ensures the page content is scrollable by
 * adding a custom CSS class (`overflowVisible`) to the `<body>` and `<html>` elements.
 * On destruction, it cleans up by removing the same class.
 * 
 * This setup allows the privacy policy page to have different scroll behavior
 * than other parts of the application (e.g. if scroll is locked elsewhere).
 */
@Component({
  selector: 'app-privacy-policy',
  imports: [MainHeaderComponent, TranslatePipe, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  /**
   * Adds 'overflowVisible' class to <body> and <html> on component init
   * to ensure the content can scroll properly.
   */
  ngOnInit(): void {
    document.body.classList.add('overflowVisible');
    document.documentElement.classList.add('overflowVisible');
  }

  /**
   * Removes 'overflowVisible' class from <body> and <html> on component destroy
   * to restore default scroll behavior.
   */
  ngOnDestroy(): void {
    document.body.classList.remove('overflowVisible');
    document.documentElement.classList.remove('overflowVisible');
  }

}
