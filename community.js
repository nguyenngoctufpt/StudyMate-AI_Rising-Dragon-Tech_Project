// --- community.js ---

document.addEventListener('DOMContentLoaded', function() {
    const communitySearchInput = document.getElementById('communitySearchInput');
    const searchCommunityButton = document.getElementById('searchCommunityButton');
    const communityFilterMajor = document.getElementById('communityFilterMajor');
    const communityFilterSkill = document.getElementById('communityFilterSkill');
    const aiSuggestionsDiv = document.getElementById('aiSuggestions');
    const loadMoreSuggestionsButton = document.getElementById('loadMoreSuggestions');
    const groupListDiv = document.getElementById('groupList');
    const createGroupButton = document.getElementById('createGroupButton');

    // Dữ liệu mẫu sinh viên (đây là dữ liệu giả lập)
    const sampleStudents = [
        { name: "Nguyễn Văn A", major: "CNTT", skills: ["Python", "Web Dev"], interests: ["AI", "Game"], avatar: "https://via.placeholder.com/50/FF4081/FFFFFF?text=A" },
        { name: "Trần Thị B", major: "CNTT", skills: ["Java", "Cơ sở dữ liệu"], interests: ["Blockchain"], avatar: "https://via.placeholder.com/50/2196F3/FFFFFF?text=B" },
        { name: "Lê Văn C", major: "Marketing", skills: ["Content", "SEO"], interests: ["Truyền thông"], avatar: "https://via.placeholder.com/50/4CAF50/FFFFFF?text=C" },
        { name: "Phạm Thị D", major: "CNTT", skills: ["Python", "Phân tích dữ liệu"], interests: ["AI", "Big Data"], avatar: "https://via.placeholder.com/50/FFC107/FFFFFF?text=D" },
        { name: "Hoàng Văn E", major: "CNTT", skills: ["Web Dev", "UI/UX"], interests: ["Thiết kế"], avatar: "https://via.placeholder.com/50/9C27B0/FFFFFF?text=E" },
        { name: "Vũ Thị F", major: "CNTT", skills: ["Java", "Lập trình di động"], interests: ["IoT"], avatar: "https://via.placeholder.com/50/FF9800/FFFFFF?text=F" },
    ];

    // Dữ liệu mẫu nhóm
    const sampleGroups = [
        { name: "Nhóm Học Python Cơ Bản", members: 5, description: "Cùng nhau học và giải bài tập Python.", avatar: "https://via.placeholder.com/50/2196F3/FFFFFF?text=Py" },
        { name: "CLB Trí Tuệ Nhân Tạo", members: 12, description: "Thảo luận về AI và các dự án thực tế.", avatar: "https://via.placeholder.com/50/FF4081/FFFFFF?text=AI" },
        { name: "Team Web Dev FPoly", members: 8, description: "Hỗ trợ phát triển dự án web frontend/backend.", avatar: "https://via.placeholder.com/50/4CAF50/FFFFFF?text=Web" }
    ];

    // --- HIỂN THỊ GỢI Ý TỪ AI ---
    function renderSuggestions(students) {
        aiSuggestionsDiv.innerHTML = '';
        if (students.length === 0) {
            aiSuggestionsDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Không có gợi ý kết nối phù hợp.</p>';
            return;
        }
        students.forEach(student => {
            const userCard = document.createElement('div');
            userCard.classList.add('user-card');
            userCard.innerHTML = `
                <img src="${student.avatar}" alt="${student.name}" class="user-avatar">
                <div class="user-info">
                    <div class="user-name">${student.name}</div>
                    <div class="user-details">${student.major} | ${student.skills.join(', ')}</div>
                </div>
                <button class="connect-button">Kết nối</button>
            `;
            userCard.querySelector('.connect-button').addEventListener('click', function(event) {
                event.stopPropagation(); // Ngăn sự kiện click lan ra card
                alert(`Đã gửi lời mời kết nối đến ${student.name}! (Demo)`);
                this.textContent = 'Đã gửi';
                this.disabled = true;
            });
            aiSuggestionsDiv.appendChild(userCard);
        });
    }

    // --- HIỂN THỊ DANH SÁCH NHÓM ---
    function renderGroups(groups) {
        groupListDiv.innerHTML = '';
        if (groups.length === 0) {
            groupListDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Không có nhóm nào.</p>';
            return;
        }
        groups.forEach(group => {
            const groupCard = document.createElement('div');
            groupCard.classList.add('group-card');
            groupCard.innerHTML = `
                <img src="${group.avatar}" alt="${group.name}" class="user-avatar">
                <div class="group-info">
                    <div class="group-name">${group.name} (${group.members} thành viên)</div>
                    <div class="group-details">${group.description}</div>
                </div>
                <button class="join-button">Tham gia</button>
            `;
            groupCard.querySelector('.join-button').addEventListener('click', function(event) {
                event.stopPropagation();
                alert(`Đã gửi yêu cầu tham gia nhóm "${group.name}"! (Demo)`);
                this.textContent = 'Đã gửi Y/C';
                this.disabled = true;
            });
            groupListDiv.appendChild(groupCard);
        });
    }


    // --- LOGIC TÌM KIẾM & LỌC CỘNG ĐỒNG (Mô phỏng AI) ---
    function filterAndSearchCommunity() {
        const query = communitySearchInput.value.toLowerCase();
        const selectedMajor = communityFilterMajor.value;
        const selectedSkill = communityFilterSkill.value;

        // Mô phỏng AI gợi ý: lọc sinh viên
        const filteredStudents = sampleStudents.filter(student => {
            const matchesQuery = student.name.toLowerCase().includes(query) ||
                                 student.skills.some(s => s.toLowerCase().includes(query)) ||
                                 student.interests.some(i => i.toLowerCase().includes(query));
            const matchesMajor = selectedMajor === '' || student.major.toLowerCase() === selectedMajor.toLowerCase();
            const matchesSkill = selectedSkill === '' || student.skills.some(s => s.toLowerCase() === selectedSkill.toLowerCase());
            return matchesQuery && matchesMajor && matchesSkill;
        });

        renderSuggestions(filteredStudents); // Cập nhật gợi ý AI
        renderGroups(sampleGroups); // Luôn hiển thị các nhóm mẫu hoặc thêm logic lọc nhóm
    }

    // Gắn sự kiện cho nút tìm kiếm và bộ lọc
    searchCommunityButton.addEventListener('click', filterAndSearchCommunity);
    communitySearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterAndSearchCommunity();
        }
    });
    communityFilterMajor.addEventListener('change', filterAndSearchCommunity);
    communityFilterSkill.addEventListener('change', filterAndSearchCommunity);

    // Nút "Xem thêm gợi ý"
    loadMoreSuggestionsButton.addEventListener('click', function() {
        alert('Chức năng này sẽ tải thêm các gợi ý từ AI! (Demo)');
        // Trong ứng dụng thực tế, bạn sẽ gửi yêu cầu tới backend AI để lấy thêm dữ liệu
    });

    // Nút "Tạo Nhóm Mới"
    createGroupButton.addEventListener('click', function() {
        alert('Mở form tạo nhóm mới (chức năng này sẽ được phát triển)');
        // TODO: Chuyển đến trang tạo nhóm mới
    });


    // Hiển thị gợi ý ban đầu khi tải trang
    filterAndSearchCommunity(); // Hiển thị tất cả khi không có query
});