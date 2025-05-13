// Sayfa yüklendiğinde çalışacak işlemler
document.addEventListener("DOMContentLoaded", function () {
    // Tabloyu yükle
    renderTablo();

    // Arama kutusuyla filtreleme
    const aramaKutusu = document.getElementById("aramaKutusu");
    if (aramaKutusu) {
        aramaKutusu.addEventListener("input", function () {
            const filtre = this.value.toLowerCase();
            const satirlar = document.querySelectorAll("#uyeTablosu tbody tr");

            satirlar.forEach(satir => {
                const metin = satir.textContent.toLowerCase();
                satir.style.display = metin.includes(filtre) ? "" : "none";
            });
        });
    }

    // Form gönderildiğinde yapılacak işlemler
    const form = document.querySelector("form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

            // Form verilerini al
            const isim = document.getElementById("isim").value;
            const sifre = document.getElementById("sifre").value;
            const email = document.getElementById("email").value;
            const tel = document.getElementById("tel").value;
            const yas = document.getElementById("yas").value;
            const taraf = document.querySelector('input[name="taraf"]:checked') 
                ? document.querySelector('input[name="taraf"]:checked').value 
                : '';

            // Zorunlu alanlar doluysa işle
            if (isim && sifre && email && taraf) {
                const uye = {
                    ad: isim,
                    sifre: sifre,
                    email: email,
                    tel: tel,
                    yas: yas,
                    taraf: taraf
                };

                // localStorage'a kaydet
                let uyeler = JSON.parse(localStorage.getItem("uyeler")) || [];
                uyeler.push(uye);
                localStorage.setItem("uyeler", JSON.stringify(uyeler));

                form.reset(); // Formu temizle

                // ❌ alert mesajı kaldırıldı
                // ✅ Doğrudan onay sayfasına yönlendir
                window.location.href = "kayit_onay.html";
            } else {
                alert("Lütfen gerekli tüm alanları doldurun.");
            }
        });
    }

    // Temizle butonu varsa, formu sıfırlar
    const temizleButonu = document.querySelector(".temizle-btn");
    if (temizleButonu) {
        temizleButonu.addEventListener("click", function () {
            form.reset();
        });
    }
});

// Tabloyu yeniden oluşturur
function renderTablo() {
    const tablo = document.querySelector("#uyeTablosu tbody");
    if (!tablo) return;

    const uyeler = JSON.parse(localStorage.getItem("uyeler")) || [];
    tablo.innerHTML = ""; // Önce temizle

    uyeler.forEach((uye, index) => {
        const satir = document.createElement("tr");
        satir.innerHTML = `
            <td>${uye.ad}</td>
            <td>${uye.email}</td>
            <td>${uye.tel}</td>
            <td>${uye.yas}</td>
            <td>${uye.taraf}</td>
            <td><button onclick="kayitSil(${index})">Sil</button></td>
        `;
        tablo.appendChild(satir);
    });
}

// Belirli bir kaydı siler
function kayitSil(index) {
    if (confirm("Bu kaydı silmek istiyor musunuz?")) {
        let uyeler = JSON.parse(localStorage.getItem("uyeler")) || [];
        uyeler.splice(index, 1);
        localStorage.setItem("uyeler", JSON.stringify(uyeler));

        renderTablo(); // Silindikten sonra tabloyu güncelle
    }
}

// Tüm kayıtları siler
function tumKayitlariSil() {
    if (confirm("Tüm üyeleri silmek istediğine emin misin?")) {
        localStorage.removeItem("uyeler");
        const tablo = document.querySelector("#uyeTablosu tbody");
        if (tablo) tablo.innerHTML = "";
    }
}

// "Tüm Üyeleri Gör" butonu varsa, tıklanınca üyeler sayfasına gider
const tumUyeleriGorBtn = document.getElementById("tumUyeleriGorBtn");
if (tumUyeleriGorBtn) {
    tumUyeleriGorBtn.addEventListener("click", function () {
        window.location.href = "uyeler.html";
    });
}


function calculateResult() {
    const form = document.getElementById("quizForm");
    const resultDiv = document.getElementById("result");
  
    // Tüm karakterlerin başlangıç puanları
    const characters = {
      "Luke Skywalker": 0,
      "Darth Vader": 0,
      "Leia Organa": 0,
      "Obi-Wan Kenobi": 0,
      "Yoda": 0,
      "Rey": 0,
      "Kylo Ren": 0,
      "Padmé Amidala": 0,
      "Ahsoka Tano": 0,
      "Han Solo": 0,
      "Anakin Skywalker": 0,
      "Mace Windu": 0,
      "Palpatine": 0,
      "Lando Calrissian": 0,
      "Chewbacca": 0,
      "R2-D2": 0,
      "C-3PO": 0
    };
  
    // Harf -> karakter ilişkisi (tek bir harfe birden fazla karakter bağlanabilir)
    const answerMap = {
      A: ["Luke Skywalker", "Rey"],
      B: ["Yoda", "Obi-Wan Kenobi"],
      C: ["Leia Organa", "Padmé Amidala"],
      D: ["Darth Vader", "Kylo Ren"],
      E: ["Han Solo", "Lando Calrissian"],
      F: ["R2-D2", "C-3PO"],
      G: ["Ahsoka Tano", "Mace Windu"],
      H: ["Palpatine"],
      I: ["Anakin Skywalker"],
      J: ["Chewbacca"]
    };
  
    // Her karaktere özel bir söz
    const characterQuotes = {
      "Luke Skywalker": "Ben bir Jedi'ım, tıpkı babam gibi.",
      "Darth Vader": "İnanç eksikliğin rahatsız edici.",
      "Leia Organa": "Birilerinin paçamızı kurtarması lazım!",
      "Obi-Wan Kenobi": "Güç seninle olsun, her zaman.",
      "Yoda": "Yap ya da yapma. Denemek diye bir şey yoktur.",
      "Rey": "İnsanlar sürekli bana kim olduğumu söylüyor. Kimse bilmiyor.",
      "Kylo Ren": "Yapmam gerekeni biliyorum ancak bunu yapacak gücüm var mı bilmiyorum.",
      "Padmé Amidala": "Demokrasi bu şekilde ölür… alkışlarla.",
      "Ahsoka Tano": "Öfkene ve hayal kırıklığına yenik düşmek kolaydır, ama bunlar seni dengesizleştirir.",
      "Han Solo": "Bana asla ihtimallerden bahsetme!",
      "Anakin Skywalker": "Onu kaybetmeme neden olan şey güçsüzlüğümdü.",
      "Mace Windu": "Sen Jedi Yüksek Konseyi'nin bir üyesi değilsin.",
      "Palpatine": "Sınırsız GÜÇ",
      "Lando Calrissian": "Hayat seni düşürdüğünde zarları tekrar atarsın.",
      "Chewbacca": "Raaawrgh! (Ama duygusal bir raawrgh)",
      "R2-D2": "*bip bip bıp* (Çoğu zaman herkesi kurtaran droid)",
      "C-3PO": "Ben insan-cyborg ilişkileri ve protokolleri konusunda uzmanlaşmış bir droidim."
    };
  
    const answers = {};
  
    // Tüm soruların cevaplarını al
    for (let i = 1; i <= 10; i++) {
      const qName = "q" + i;
      const selected = form.querySelector(`input[name="${qName}"]:checked`);
      if (selected) {
        const value = selected.value;
        answers[value] = (answers[value] || 0) + 1;
      }
    }
  
    // Kontrol: tüm sorular cevaplanmış mı?
    const totalAnswered = Object.values(answers).reduce((a, b) => a + b, 0);
    if (totalAnswered < 10) {
      resultDiv.innerHTML = "<p style='color:red;'>Lütfen tüm soruları cevaplayınız.</p>";
      return;
    }
  
    // Her seçeneğe göre karakterlere puan dağıt
    for (const letter in answers) {
      const count = answers[letter];
      const associatedChars = answerMap[letter] || [];
      associatedChars.forEach(character => {
        characters[character] += count;
      });
    }
  
    // En yüksek puanı alan karakteri bul
    let topCharacter = null;
    let maxScore = 0;
    for (const character in characters) {
      if (characters[character] > maxScore) {
        topCharacter = character;
        maxScore = characters[character];
      }
    }
  
    // Sonucu göster
    const quote = characterQuotes[topCharacter] || "";
    resultDiv.innerHTML = `
      <div class="result-box">
        <h2>Sonuç:</h2>
        <p><strong>${topCharacter}</strong></p>
        <p style="font-style: italic;">"${quote}"</p>
      </div>
    `;
  }






