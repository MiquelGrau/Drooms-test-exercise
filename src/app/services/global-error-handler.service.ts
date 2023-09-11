import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './notification.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) {}

  handleError(error: Error | HttpErrorResponse) {
    const notificationService = this.injector.get(NotificationService);

    if (error instanceof HttpErrorResponse) {
      // Handle HTTP errors.
      switch (error.status) {
        case 400:
          notificationService.showError('Bad Request. Please check your data and try again.');
          break;
        case 401:
          notificationService.showError('Unauthorized. Please log in.');
          break;
        case 403:
          notificationService.showError('Forbidden. You do not have permission to access this.');
          break;
        case 404:
          notificationService.showError('The requested URL was not found.');
          break;
        case 500:
          notificationService.showError('Internal Server Error. Please try again later.');
          break;
        default:
          notificationService.showError('An unexpected error occurred.');
      }
    } else {
      // Handle application errors.
      notificationService.showError('An error occurred in the application. Please try again.');
      console.error('Application Error:', error);
    }
  }
}
