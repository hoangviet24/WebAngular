document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Kiểm tra dữ liệu đầu vào
    if (name && email && subject && message) {
        alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
        // Reset form sau khi gửi
        document.getElementById('contactForm').reset();
    } else {
        alert('Vui lòng điền đầy đủ thông tin.');
    }
});