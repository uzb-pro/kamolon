// ================== ELEMENTLAR ==================
let container = document.getElementById('xodimlar') as HTMLDivElement;
let jami = document.getElementById('jami') as HTMLHeadingElement;
let search = document.getElementById('search') as HTMLInputElement;

// ================== RENDER ==================
function render() {
  let olinganXodimlar =
    JSON.parse(window.localStorage.getItem('xodimlar')!) || [];

  renderDOM(olinganXodimlar);

  jami.textContent =
    olinganXodimlar.length > 0
      ? `Jami yaratilgan xodimlar: ${olinganXodimlar.length}`
      : 'Hali xodimlar yaratilmadi';
}

function renderDOM(xodimlar: any[]) {
  if (!container) return;

  container.innerHTML = '';

  for (let i = 0; i < xodimlar.length; i++) {
    let quti = document.createElement('div');
    quti.className = 'box';

    quti.innerHTML = `
      <p><b>Xodim haqida</b></p>
      <p>Ism: ${xodimlar[i].ism}</p>
      <p>Familiya: ${xodimlar[i].familiya}</p>
      <p>Manzil: ${xodimlar[i].manzil}</p>
      <p>Telefon: ${xodimlar[i].telefon}</p>
      <p>Lavozimi: ${xodimlar[i].rol}</p>
    `;

    let ochirish = document.createElement('button');
    ochirish.textContent = "Xodimni o‘chirish";
    ochirish.className = 'delButton';

    ochirish.addEventListener('click', function () {
      let tasdiq = confirm("Rostdan ham bu xodimni o‘chirmoqchimisiz?");
      if (!tasdiq) return;

      let yangiXodimlar = xodimlar.filter(function (item) {
        return item.id !== xodimlar[i].id;
      });

      window.localStorage.setItem(
        'xodimlar',
        JSON.stringify(yangiXodimlar)
      );

      alert("❌ Xodim o‘chirildi!");
      render();
    });

    quti.appendChild(ochirish);
    container.appendChild(quti);
  }
}

if (container) {
  render();
}

// ================== QIDIRISH ==================
if (search) {
  search.addEventListener('input', function () {
    let qiymat = search.value.trim().toLowerCase();

    let barcha =
      JSON.parse(window.localStorage.getItem('xodimlar')!) || [];

    let topilgan = barcha.filter(function (item: any) {
      return (
        item.ism.toLowerCase().includes(qiymat) ||
        item.rol.toLowerCase().includes(qiymat)
      );
    });

    if (topilgan.length === 0 && qiymat !== '') {
      alert("Bunday xodim topilmadi!");
    }

    renderDOM(topilgan);
  });
}

// ================== XODIM YARATISH ==================
let form = document.getElementById('form') as HTMLFormElement;

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();

    let ism = (document.getElementById('ism') as HTMLInputElement).value;
    let familiya = (document.getElementById('familiya') as HTMLInputElement).value;
    let manzil = (document.getElementById('manzil') as HTMLInputElement).value;
    let telefon = (document.getElementById('telefon') as HTMLInputElement).value;
    let parol = (document.getElementById('parol') as HTMLInputElement).value;
    let rol = (document.getElementById('rol') as HTMLSelectElement).value;

    if (!ism || !familiya || !manzil || !telefon || !parol || !rol) {
      alert("Iltimos, barcha maydonlarni to‘ldiring!");
      return;
    }

    let yangiXodim = {
      id: Date.now(),
      ism,
      familiya,
      manzil,
      telefon,
      parol,
      rol,
    };

    let barcha =
      JSON.parse(window.localStorage.getItem('xodimlar')!) || [];

    barcha.push(yangiXodim);

    window.localStorage.setItem(
      'xodimlar',
      JSON.stringify(barcha)
    );

    alert("✅ Xodim muvaffaqiyatli yaratildi!");

    form.reset();
    window.location.href = 'xodimlar.html';
  });
}