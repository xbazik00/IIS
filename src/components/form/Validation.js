export const required = value => (value ? undefined : "Povinné");
// export const email = value => !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? 'Neplatný formát e-mail adresy' : undefined;
// export const isNumeric = value => isNaN(Number(value)) ? 'Zadejte číselnú hodnotu' : undefined;
export const isNumberGTOne = value =>
  isNaN(Number(value)) || Number(value) < 1
    ? "Zadejte kladné číslo"
    : undefined;

export const isNumberLE1000 = value =>
    isNaN(Number(value)) || Number(value) > 1000
      ? "Zadejte číslo menší nebo rovno 1000"
      : undefined;

export const isShorterEqual30 = value => value && value.length <= 30 ? undefined : "Maximálně 30 znaků";
export const isShorterEqual100 = value => value && value.length <= 100 ? undefined : "Maximálně 100 znaků";
export const isShorterEqual1000 = value => value && value.length <= 1000 ? undefined : "Maximálně 1000 znaků";