import { Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  async handleError(error: any) {
    console.error('error_SERVICE', error.message);
  }
}
