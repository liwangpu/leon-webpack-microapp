// import('./test');

window.onload = () => {

  document.getElementById('btnTest').addEventListener('click', handleTest);
  document.getElementById('btnLoadSecondaryLib').addEventListener('click', handleLoadSecondaryLibrary);

};

function handleTest() {
  console.log('test');
}

async function handleLoadSecondaryLibrary() {
  // @ts-ignore
  const m = await import('secondary-library');
  // m.add();
  console.log(`m:`, m);
}
