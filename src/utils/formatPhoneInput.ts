export const formatPhoneInput = (phoneNumber: string) => {
  const numericPhoneNumber = phoneNumber.replace(/\D/g, "");

  if (numericPhoneNumber.length < 2) {
    return numericPhoneNumber;
  }

  if (numericPhoneNumber.startsWith("55")) {
    const formattedPhoneNumber = `(${numericPhoneNumber.slice(2, 4)}) ${numericPhoneNumber.slice(
      4,
      9
    )}-${numericPhoneNumber.slice(9)}`;
    return formattedPhoneNumber.slice(0, 19);
  }

  const formattedPhoneNumber = `(${numericPhoneNumber.slice(0, 2)}) ${numericPhoneNumber.slice(
    2,
    7
  )}-${numericPhoneNumber.slice(7)}`;
  return formattedPhoneNumber.slice(0, 15);
};
