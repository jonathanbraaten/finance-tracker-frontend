export default function (value: number) {
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'decimal',
    currency: 'USD',
  });
  return formatter.format(value);
}
