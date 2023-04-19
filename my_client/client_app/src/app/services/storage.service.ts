import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private identifier =""
  storageUpdated = new Subject<void>();

  constructor() { }

  setSourceIdentifier(id: string): void {
    this.identifier = id;

    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key === this.identifier) {
        this.storageUpdated.next();
      }
    });
  }

  save(data: any): void {
    localStorage.setItem(this.identifier, JSON.stringify(data));
  }

  fetch(): any {
    const data = localStorage.getItem(this.identifier) || '';
    return JSON.parse(data);
  }

  remove(): void {
    localStorage.removeItem(this.identifier);
  }
}
