export function formatDate(dateString) {
  const date = new Date(dateString); // Tạo đối tượng Date từ chuỗi ISO

  const day = String(date.getUTCDate()).padStart(2, '0'); // Lấy ngày theo UTC và đảm bảo luôn có 2 chữ số
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Lấy tháng theo UTC và đảm bảo luôn có 2 chữ số
  const year = date.getUTCFullYear(); // Lấy năm theo UTC

  const hours = String(date.getUTCHours()).padStart(2, '0'); // Lấy giờ theo UTC và đảm bảo luôn có 2 chữ số
  const minutes = String(date.getUTCMinutes()).padStart(2, '0'); // Lấy phút theo UTC và đảm bảo luôn có 2 chữ số

  return `${day}/${month}/${year} ${hours}:${minutes}`; // Kết hợp các thành phần thành chuỗi định dạng "ngày/tháng/năm giờ:phút"
}
