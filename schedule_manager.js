// --- schedule_manager.js ---

document.addEventListener('DOMContentLoaded', function() {
    const currentDayDisplay = document.getElementById('currentDay');
    const prevDayButton = document.getElementById('prevDay');
    const nextDayButton = document.getElementById('nextDay');
    const scheduleBody = document.getElementById('scheduleBody');
    const reminderTimeSelect = document.getElementById('reminderTime');
    const saveReminderSettingsButton = document.getElementById('saveReminderSettings');
    const addScheduleButton = document.querySelector('.add-schedule-button');

    let currentDate = new Date(); // Ngày hiện tại được hiển thị

    // Dữ liệu lịch học mẫu (có thể thay đổi theo ngày)
    const sampleSchedule = {
        "2025-05-27": [ // Hôm nay
            { STT: 1, Mon: "Lập trình Web", GV: "Thầy A", Phong: "B101", GD: "P.HN", Ca: "Sáng", ThoiGian: "8:00 - 10:00" },
            { STT: 2, Mon: "Cơ sở dữ liệu", GV: "Cô B", Phong: "B205", GD: "P.HN", Ca: "Chiều", ThoiGian: "13:00 - 15:00" }
        ],
        "2025-05-28": [ // Ngày mai
            { STT: 1, Mon: "Giải thuật", GV: "Thầy C", Phong: "C301", GD: "P.HN", Ca: "Sáng", ThoiGian: "9:00 - 11:00" }
        ],
        "2025-05-29": [ // Ngày kia
            { STT: 1, Mon: "Trí tuệ nhân tạo", GV: "Cô D", Phong: "D102", GD: "P.HN", Ca: "Chiều", ThoiGian: "14:00 - 16:00" },
            { STT: 2, Mon: "Thực hành AI", GV: "Cô D", Phong: "Lab AI", GD: "P.HN", Ca: "Chiều", ThoiGian: "16:00 - 18:00" }
        ]
        // Thêm các ngày khác nếu muốn
    };

    // Hàm định dạng ngày thành YYYY-MM-DD
    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Hàm hiển thị lịch học cho ngày được chọn
    function renderSchedule(date) {
        const formattedDate = formatDate(date);
        const dayName = date.toLocaleDateString('vi-VN', { weekday: 'long' });
        const dateString = date.toLocaleDateString('vi-VN');
        currentDayDisplay.textContent = `${dayName}, ${dateString}`;

        const dailySchedule = sampleSchedule[formattedDate] || [];
        scheduleBody.innerHTML = ''; // Xóa lịch cũ

        if (dailySchedule.length === 0) {
            scheduleBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: var(--text-secondary);">Không có lịch học cho ngày này.</td></tr>`;
            return;
        }

        dailySchedule.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.STT}</td>
                <td>${item.Mon}</td>
                <td>${item.GV}</td>
                <td>${item.Phong}</td>
                <td>${item.Ca}</td>
                <td>${item.ThoiGian}</td>
                <td style="text-align: center;"><i class="fas fa-bell reminder-icon" data-mon="${item.Mon}" data-gv="${item.GV}" data-phong="${item.Phong}" data-gd="${item.GD}" data-thoigian="${item.ThoiGian}" data-ngay="${formattedDate}"></i></td>
            `;
            scheduleBody.appendChild(row);
        });

        // Gắn sự kiện cho các icon nhắc nhở
        document.querySelectorAll('.reminder-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const mon = this.dataset.mon;
                const gv = this.dataset.gv;
                const phong = this.dataset.phong;
                const gd = this.dataset.gd;
                const thoiGian = this.dataset.thoigian;
                const ngay = this.dataset.ngay;
                const reminderMinutes = reminderTimeSelect.value;

                alert(`Đã đặt nhắc nhở cho môn "${mon}" của GV ${gv} vào lúc ${thoiGian} tại ${phong}, ${gd} vào ngày ${ngay}, trước ${reminderMinutes} phút. (Chức năng này cần backend AI thực tế)`);
                // Trong ứng dụng thực tế:
                // 1. Gửi thông tin nhắc nhở đến backend hoặc API của AI để xử lý.
                // 2. AI sẽ tạo lời nhắc và gửi thông báo đẩy (push notification) đến điện thoại người dùng vào đúng thời điểm.
            });
        });
    }

    // Xử lý nút chuyển ngày
    prevDayButton.addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() - 1);
        renderSchedule(currentDate);
    });

    nextDayButton.addEventListener('click', function() {
        currentDate.setDate(currentDate.getDate() + 1);
        renderSchedule(currentDate);
    });

    // Xử lý nút lưu cài đặt nhắc nhở
    saveReminderSettingsButton.addEventListener('click', function() {
        const selectedTime = reminderTimeSelect.value;
        localStorage.setItem('defaultReminderTime', selectedTime); // Lưu vào Local Storage
        alert(`Cài đặt nhắc nhở mặc định: trước ${selectedTime} phút đã được lưu.`);
    });

    // Khởi tạo cài đặt nhắc nhở mặc định khi tải trang
    const savedReminderTime = localStorage.getItem('defaultReminderTime');
    if (savedReminderTime) {
        reminderTimeSelect.value = savedReminderTime;
    }

    // Xử lý nút "Thêm Lịch Học Mới"
    addScheduleButton.addEventListener('click', function() {
        alert('Mở form thêm lịch học mới (chức năng này sẽ được phát triển)');
        // TODO: Mở một modal hoặc chuyển đến trang form để thêm lịch học
    });

    // Render lịch học cho ngày hiện tại khi tải trang
    renderSchedule(currentDate);
});