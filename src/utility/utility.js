// function getFormattedDate(date) {
//     // Ambil informasi waktu (tahun, bulan, tanggal, jam, menit, detik)
//     const year = date.getFullYear().toString();
//     const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tambahkan 0 jika hanya satu digit
//     const day = date.getDate().toString().padStart(2, '0');
//     const hours = date.getHours().toString().padStart(2, '0');
//     const minutes = date.getMinutes().toString().padStart(2, '0');
//     const seconds = date.getSeconds().toString().padStart(2, '0');
  
//     // Gabungkan informasi waktu menjadi format yang diinginkan
//     const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
//     return formattedDate;
//   }
  
//   const now = new Date(); // Tanggal sekarang
//   const newTime = getFormattedDate(now); // Format waktu yang fleksibel
//   const date = new Date(newTime);
//   const formattedTime = date.toLocaleString('ID', { timeZone: 'WIB' }).replace(',', '');
//   console.log(formattedTime)
  

// module.exports = formattedTime