import { Inject, Logger } from '@nestjs/common';

export function LogResponse() {
  const injectLogger = Inject(Logger);
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    injectLogger(target, 'logger');

    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = await original.apply(this, args);
      const logger: Logger = this.logger;
      logger.log(`${propertyKey} ${JSON.stringify(result)}`);
      return result;
    };

    return descriptor;
  };
}
