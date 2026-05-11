export const generateTransactionId = () => {
  const date = new Date();
  const year = date.getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000); // 4 random digits
  return `BW-${year}-${random}`;
};