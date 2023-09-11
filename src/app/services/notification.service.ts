import { Injectable } from '@angular/core';
import * as bootstrap from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {}

  showSuccess(message: string): void {
    this.createToast(message, 'bg-success text-white');
  }

  showError(message: string): void {
    this.createToast(message, 'bg-danger text-white');
  }

  private createToast(message: string, className: string): void {
    const toast = document.createElement('div');
    toast.className = `toast ${className}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    const toastBody = document.createElement('div');
    toastBody.className = 'toast-body';
    toastBody.textContent = message;

    toast.appendChild(toastBody);

    document.body.appendChild(toast);

    toast.addEventListener('shown.bs.toast', () => {
      setTimeout(() => {
        toast.dispatchEvent(new Event('hide.bs.toast'));
      }, 5000);
    });

    toast.addEventListener('hidden.bs.toast', () => {
      document.body.removeChild(toast);
    });

    if (typeof bootstrap !== 'undefined') {
      new bootstrap.Toast(toast).show();
    } else {
      console.error('Bootstrap is not loaded.');
    }
  }
}
