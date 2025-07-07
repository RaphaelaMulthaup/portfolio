import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainHeaderComponent } from '../main-content/shared/main-header/main-header.component';
import { FooterComponent } from '../main-content/shared/footer/footer.component';

@Component({
  selector: 'app-privacy-policy',
  imports: [MainHeaderComponent, FooterComponent],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {

  ngOnInit(): void {
    document.body.classList.add('overflowVisible');
    document.documentElement.classList.add('overflowVisible');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflowVisible');
    document.documentElement.classList.remove('overflowVisible');
  }

}