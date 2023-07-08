class Pendaftaran {
  constructor() {
    this.pendaftarList = [];
  }

  tambahPendaftar(nama, umur, uangSangu) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
          reject("Data tidak sesuai dengan kriteria!");
        } else {
          this.pendaftarList.push({
            nama: nama,
            umur: parseInt(umur),
            uangSangu: parseInt(uangSangu)
          });
          resolve();
        }
      }, 1000);
    });
  }

  hitungRataRata() {
    let totalUangSangu = 0;
    let totalUmur = 0;

    this.pendaftarList.forEach(pendaftar => {
      totalUangSangu += pendaftar.uangSangu;
      totalUmur += pendaftar.umur;
    });

    const averageUangSangu = totalUangSangu / this.pendaftarList.length;
    const averageUmur = totalUmur / this.pendaftarList.length;

    return {
      averageUangSangu: averageUangSangu,
      averageUmur: averageUmur
    };
  }
}

const pendaftaran = new Pendaftaran();

function changeTab(event, tabName) {
  const tabContent = document.getElementsByClassName("tab");
  for (let i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  const tabLinks = document.getElementsByClassName("tab-header")[0].getElementsByTagName("button");
  for (let i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  event.target.classList.add("active");
}

function resetForm() {
  document.getElementById("nama").value = "";
  document.getElementById("umur").value = "";
  document.getElementById("uang").value = "";
}

async function submitForm() {
  const namaPendaftar = document.getElementById("nama").value;
  const umurPendaftar = document.getElementById("umur").value;
  const uangSanguPendaftar = document.getElementById("uang").value;

  if (namaPendaftar.length < 10 || umurPendaftar < 25 || uangSanguPendaftar < 100000 || uangSanguPendaftar > 1000000) {
    alert("Data tidak sesuai dengan kriteria!");
    return;
  }

  try {
    await pendaftaran.tambahPendaftar(namaPendaftar, umurPendaftar, uangSanguPendaftar);
    alert("Pendaftaran berhasil ditambahkan!");
    resetForm();
    await showPendaftarList();
    calculateAverage();
  } catch (error) {
    alert(error);
  }
}

async function showPendaftarList() {
  const table = document.getElementById("pendaftar-data");
  table.innerHTML = "";

  for (let i = 0; i < pendaftaran.pendaftarList.length; i++) {
    const pendaftar = pendaftaran.pendaftarList[i];

    const row = table.insertRow();
    const cell1 = row.insertCell();
    const cell2 = row.insertCell();
    const cell3 = row.insertCell();

    cell1.textContent = pendaftar.nama;
    cell2.textContent = pendaftar.umur;
    cell3.textContent = formatCurrency(pendaftar.uangSangu);
  }
}

function calculateAverage() {
  const { averageUangSangu, averageUmur } = pendaftaran.hitungRataRata();

  const resume = document.getElementById("resume");
  resume.textContent = `Rata-rata pendaftar memiliki uang sangu sebesar ${formatCurrency(averageUangSangu)} dengan rata-rata umur ${averageUmur.toFixed(1)}`;
}


changeTab(event, 'registrasi');


function formatCurrency(amount) {
  const formatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR"
  });

  return formatter.format(amount);
}
