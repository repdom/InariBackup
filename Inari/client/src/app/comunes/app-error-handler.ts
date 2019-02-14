import swal from 'sweetalert2';
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
   public handleError(message) {
     console.log(message);
     swal.fire({
      type: 'error',
      title: 'Oops...',
      text: message,
    });
  }
}
