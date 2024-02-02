export function fomatterDallarToWon(price) {
  let won = (price * 100 * 133472 / 10000).toFixed(2);
  if (price === 0) {
    won = 0;
  }
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'krw'
  }).format(won);
}