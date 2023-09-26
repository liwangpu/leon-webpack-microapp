import { isOdd } from 'eoncc-is-odd';

window.onload = () => {

  document.getElementById('btnTest').addEventListener('click', handleTest);

};

async function handleTest() {
  try {
    console.log(`is odd:`, isOdd('xxxx'));
  } catch (err) {
    console.error(err);
  }
}

async function handleLoadSecondaryLibrary() {
  // @ts-ignore
  // const m = await import('tertiary-library');
  // m.add();
  // console.log(`m:`, m);


}
