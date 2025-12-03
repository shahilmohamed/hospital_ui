import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from '../service/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.css']
})
export class CookieConsentComponent implements OnInit {
  showBanner: boolean = false;

  constructor(private cookieConsentService: CookieConsentService) { }

  ngOnInit(): void {
    if (!this.cookieConsentService.hasConsent()) {
      setTimeout(() => {
        this.showBanner = true;
      }, 500);
    }
  }

  acceptCookies(): void {
    this.cookieConsentService.acceptCookies();
    this.hideBanner();
  }

  declineCookies(): void {
    this.cookieConsentService.declineCookies();
    this.hideBanner();
  }

  private hideBanner(): void {
    this.showBanner = false;
    setTimeout(() => {
      const banner = document.getElementById('cookie-consent-banner');
      if (banner) {
        banner.style.display = 'none';
      }
    }, 300);
  }
}


