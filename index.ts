let ism = document.getElementById('ism') as HTMLInputElement;
let familiya = document.getElementById('familiya') as HTMLInputElement;
let manzil = document.getElementById('manzil') as HTMLInputElement;
let telefon = document.getElementById('telefon') as HTMLInputElement;
let parol = document.getElementById('parol') as HTMLInputElement;
let rol = document.getElementById('rol') as HTMLSelectElement;
let yaratishButton = document.getElementById('yaratish') as HTMLButtonElement;
let form = document.getElementById('form') as HTMLFormElement;

form.addEventListener('submit', function (e) {
  e.preventDefault();

  let xodim = {
    id: Date.now(),
    ism: '',
    familiya: '',
    manzil: '',
    telefon: '',
    parol: '',
    rol: '',
  };

  xodim.ism = ism.value;
  xodim.familiya = familiya.value;
  xodim.manzil = manzil.value;
  xodim.telefon = telefon.value;
  xodim.parol = parol.value;
  xodim.rol = rol.value;

  let olinganXodimlar = JSON.parse(window.localStorage.getItem('xodimlar')!);
  let xodimlar = [];

  if (olinganXodimlar != null) {
    xodimlar = olinganXodimlar;
  }

  xodimlar.push(xodim);

  window.localStorage.setItem('xodimlar', JSON.stringify(xodimlar));

  form.reset();
  window.location.href = 'xodimlar.html';
});
