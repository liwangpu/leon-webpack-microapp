import { isOdd } from 'eoncc-is-odd';

window.onload = () => {

  document.getElementById('btnTest').addEventListener('click', handleTest);
  document.getElementById('btnLoadSecondaryLib').addEventListener('click', handleLoadSecondaryLibrary);

};

async function handleTest() {
  // const { test } = await import('./test');
  // test();
}

async function handleLoadSecondaryLibrary() {
  // @ts-ignore
  // const m = await import('tertiary-library');
  // m.add();
  // console.log(`m:`, m);

  console.log(`is odd:`, isOdd(1));
}
