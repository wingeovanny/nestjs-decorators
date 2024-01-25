export function ConsoleLogResponse() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const result = original.apply(this, args);
      console.log('result_decorador', result);
      return result;
    };

    return descriptor;
  };
}
