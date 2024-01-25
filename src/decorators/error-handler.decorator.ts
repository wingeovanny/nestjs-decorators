import { Inject } from '@nestjs/common';
import { ErrorHandlerService } from '../user/error-handler.services';

export function ErrorHandler() {
  const injectErrorHandler = Inject(ErrorHandlerService);
  return (
    target: any,
    propertyKey: string,
    propertyDescriptor: PropertyDescriptor,
  ) => {
    injectErrorHandler(target, 'errorHandlerService');

    const original = propertyDescriptor.value;

    propertyDescriptor.value = async function (...args: any[]) {
      try {
        return await original.apply(this, args);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.log(error.message);
          const errorHandlerService: ErrorHandlerService =
            this.errorHandlerService;
          errorHandlerService.handleError(error);
        }
        throw error;
      }
    };

    return propertyDescriptor;
  };
}
