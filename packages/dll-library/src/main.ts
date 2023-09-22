import { isOdd } from 'eoncc-is-odd';
import { isArray } from 'lodash-es';

function checkIsOdd(num: number) {
  console.log(`check is odd:`, isOdd(num));
  console.log(`is array:`, isArray([]));
}