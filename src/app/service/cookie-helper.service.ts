import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieHelperService {
  private readonly MAX_AGE_DAYS = 7;
  private readonly MAX_AGE_SECONDS = 604800;

  constructor(private cookieService: CookieService) { }
  setCookie(name: string, value: string, httpOnly: boolean = false): void {
    const isSecure = this.isSecure();
    const sameSite: 'Lax' | 'None' = isSecure ? 'None' : 'Lax';
    const expires = new Date();
    expires.setTime(expires.getTime() + (this.MAX_AGE_DAYS * 24 * 60 * 60 * 1000));
    
    const domain = this.extractDomain();
    this.cookieService.set(
      name,
      value,
      expires,
      '/',
      domain,
      isSecure,
      sameSite
    );
  }

  private isSecure(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return window.location.protocol === 'https:';
  }

  private extractDomain(): string | undefined {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || 
        hostname === '127.0.0.1' ||
        this.isIPAddress(hostname)) {
      return undefined;
    }
    
    return hostname;
  }

  private isIPAddress(hostname: string): boolean {
    const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipv4Pattern.test(hostname)) {
      return true;
    }
    
    if (hostname.startsWith('192.168.') ||
        hostname.startsWith('10.') ||
        hostname.startsWith('172.')) {
      return true;
    }
    
    return false;
  }

  deleteCookie(name: string): void {
    const domain = this.extractDomain();
    this.cookieService.delete(name, '/', domain);
  }

  getCookie(name: string): string {
    return this.cookieService.get(name);
  }
}

