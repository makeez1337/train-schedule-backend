import { ValidationError } from 'class-validator';

export const classValidatorErrorConvert = (
  validationErrors: ValidationError[],
): Array<{ field: string; messages: string[] }> => {
  const result: Array<{ field: string; messages: string[] }> = [];

  const traverse = (errorObj: ValidationError, fieldPrefix = ''): void => {
    const field = fieldPrefix + errorObj.property;
    const messages: string[] = [];

    if (errorObj.constraints) {
      Object.keys(errorObj.constraints).forEach((key) => {
        messages.push(errorObj.constraints[key]);
      });
    }

    if (errorObj.children.length) {
      const lastChild = errorObj.children[errorObj.children.length - 1];
      traverse(lastChild, field + '.');
    } else {
      result.push({
        field,
        messages,
      });
    }
  };

  validationErrors.forEach((errorObj) => {
    traverse(errorObj);
  });

  return result;
};
