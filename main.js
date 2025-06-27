        window.addEventListener('load', () => {
            setTimeout(() => {
                document.body.classList.add('reveal');
            }, 500);

            setTimeout(() => {
                document.body.classList.add('tirai-gone');
                const content = document.querySelector('.hero-content');
                content?.classList.remove('hidden');
                content?.classList.add('show');
            }, 4800);
        });

        const yearList = document.getElementById('yearList');
const yearItems = document.querySelectorAll('.year-item');
const contents = document.querySelectorAll('.year-content');

// Utility
function isMobile() {
  return window.innerWidth <= 768;
}

// Fungsi scroll ke konten aktif (khusus mobile)
function scrollToActiveContent() {
  const activeContent = document.querySelector('.year-content.active');
  if (isMobile() && activeContent) {
    activeContent.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Fungsi aktifkan tahun berdasarkan elemen
function activateYear(item) {
  yearItems.forEach(i => i.classList.remove('selected'));
  item.classList.add('selected');

  const year = item.dataset.year;
  localStorage.setItem("activeYear", year);

  contents.forEach(c => c.classList.remove('active'));
  const newContent = document.getElementById('content' + year);
  if (newContent) {
    setTimeout(() => {
      newContent.classList.add('active');
      scrollToActiveContent();
    }, 50);
  }

  const titleEl = document.getElementById('dynamicTitle');
  if (titleEl) {
    const titleMap = {
      "1400": "1400-an — Awal Mula Cirebon",
      "1500": "1500-an — Kejayaan Kesultanan Cirebon",
      "1600": "1600-an — Kontak Awal dengan Dunia Barat",
      "1700": "1700-an — Konflik dan Perpecahan",
      "1800": "1800-an — Dominasi Belanda & Keraton",
      "1900": "1900-an — Pergerakan & Kemerdekaan",
      "2000": "2000-an — Cirebon Modern dan Digital"
    };
    titleEl.innerText = titleMap[year] || `Tahun ${year}`;
  }
}

// Tombol scroll (desktop only)
document.getElementById('btnUp').addEventListener('click', () => {
  if (!isMobile()) {
    yearList.scrollBy({ top: -60, behavior: 'smooth' });
  }
});
document.getElementById('btnDown').addEventListener('click', () => {
  if (!isMobile()) {
    yearList.scrollBy({ top: 60, behavior: 'smooth' });
  }
});

// Selalu aktifkan click event, tapi hanya berfungsi di mobile
yearItems.forEach(item => {
  item.addEventListener('click', () => {
    if (isMobile()) activateYear(item);
  });
});

// Scroll handler untuk desktop
yearList.addEventListener('scroll', () => {
  if (!isMobile()) {
    clearTimeout(yearList._scrollTimer);
    yearList._scrollTimer = setTimeout(() => {
      const listRect = yearList.getBoundingClientRect();
      let closest = null;
      let closestDist = Infinity;

      yearItems.forEach(item => {
        const itemRect = item.getBoundingClientRect();
        const dist = Math.abs(itemRect.top + itemRect.height / 2 - (listRect.top + listRect.height / 2));
        if (dist < closestDist) {
          closestDist = dist;
          closest = item;
        }
      });

      if (closest && !closest.classList.contains('selected')) {
        activateYear(closest);
      }
    }, 100);
  }
});