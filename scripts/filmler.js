// tablo sıralama fonksiyonu
function sortTable(columnIndex) {
    const table = document.querySelector(".film-table tbody");
    const rows = Array.from(table.rows);

    let isNumeric = columnIndex === 1 || columnIndex === 2; // yıl ve puan numerik
    let isAscending = table.getAttribute("data-sort-dir") !== "asc"; // yön ters çevrilir

    // sıralama işlemi
    rows.sort((a, b) => {
        let cellA = a.cells[columnIndex].innerText.trim();
        let cellB = b.cells[columnIndex].innerText.trim();

        if (isNumeric) {
            return isAscending
                ? parseFloat(cellA) - parseFloat(cellB)
                : parseFloat(cellB) - parseFloat(cellA);
        } else {
            return isAscending
                ? cellA.localeCompare(cellB)
                : cellB.localeCompare(cellA);
        }
    });

    // sıralanmış satırları tekrar ekle
    rows.forEach(row => table.appendChild(row));

    // sıradaki yön bilgisini güncelle
    table.setAttribute("data-sort-dir", isAscending ? "asc" : "desc");
}
