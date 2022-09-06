// @flow

const toLocalesString = (num: number): string => Number(num).toLocaleString();

export const getLangValues = (vars: Object, formatCurrency: string => string = v => v) => {
  const { cost, quantity } = vars;
  const processedVars = { ...vars };

  if (cost) {
    processedVars.cost = formatCurrency(cost);
  }

  if (quantity) {
    processedVars.quantity = toLocalesString(quantity);
  }

  return processedVars;
};
