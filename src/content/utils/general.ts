export const isFloat = (x: number) => {
  return !!(x % 1);
};

export const formatInteger = (input: number) => {
  if (input < 1000) return input;
  if (input < 1000_000) {
    let rightThreeDigits = input % 1000;

    return Math.floor(input / 1000) + "." + ("000" + rightThreeDigits).slice(-3);
  }
  if (input < 1000_000_000) {
    let rightThreeDigits = input % 1000;
    let middleThreeDigits = Math.floor((input % 1000_000) / 1000);
    let leftThreeDigits = Math.floor(input / 1000_000);

    return leftThreeDigits + "." + ("000" + middleThreeDigits).slice(-3) + "." + ("000" + rightThreeDigits).slice(-3);
  }
  if (input < 1000_000_000_000) {
    let millions = input % 1000_000_000;
    let rightThreeDigits = millions % 1000;
    let middleThreeDigits = Math.floor((millions % 1000_000) / 1000);
    let leftThreeDigits = Math.floor(millions / 1000_000);
    let billions = Math.floor(input / 1000_000_000);
    return (
      billions +
      "." +
      ("000" + leftThreeDigits).slice(-3) +
      "." +
      ("000" + middleThreeDigits).slice(-3) +
      "." +
      ("000" + rightThreeDigits).slice(-3)
    );
  }
  if (input >= 1000_000_000_000) return input;

  return input;
};

export const formatNumber = (input: number) => {
  if (Number.isInteger(input)) {
    return formatInteger(input);
  }
  if (isFloat(input)) {
    let partial = input - Math.floor(input);
    partial = Math.floor(partial * 100);

    return formatInteger(Math.floor(input)) + "," + partial;
  }

  return "Not a number: " + input;
};
