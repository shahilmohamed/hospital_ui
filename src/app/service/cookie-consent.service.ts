import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly CONSENT_COOKIE_NAME = 'cookie_consent';
  private readonly CONSENT_EXPIRY_DAYS = 365;

  constructor(private cookieService: CookieService) { }

  hasConsent(): boolean {
    const consent = this.cookieService.get(this.CONSENT_COOKIE_NAME);
    return consent === 'accepted' || consent === 'declined';
  }

  getConsentStatus(): 'accepted' | 'declined' | 'not_set' {
    const consent = this.cookieService.get(this.CONSENT_COOKIE_NAME);
    if (consent === 'accepted') {
      return 'accepted';
    } else if (consent === 'declined') {
      return 'declined';
    }
    return 'not_set';
  }

  acceptCookies(): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.CONSENT_EXPIRY_DAYS);
    this.cookieService.set(this.CONSENT_COOKIE_NAME, 'accepted', expiryDate, '/');
    
    localStorage.setItem(this.CONSENT_COOKIE_NAME, 'accepted');
  }

  declineCookies(): void {
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + this.CONSENT_EXPIRY_DAYS);
    this.cookieService.set(this.CONSENT_COOKIE_NAME, 'declined', expiryDate, '/');
    
    localStorage.setItem(this.CONSENT_COOKIE_NAME, 'declined');
    
    this.clearAllCookies();
  }

  private clearAllCookies(): void {
    const allCookies = this.cookieService.getAll();
    Object.keys(allCookies).forEach(cookieName => {
      if (cookieName !== this.CONSENT_COOKIE_NAME) {
        this.cookieService.delete(cookieName, '/');
      }
    });
  }

  revokeConsent(): void {
    this.cookieService.delete(this.CONSENT_COOKIE_NAME, '/');
    localStorage.removeItem(this.CONSENT_COOKIE_NAME);
    this.clearAllCookies();
  }
}


