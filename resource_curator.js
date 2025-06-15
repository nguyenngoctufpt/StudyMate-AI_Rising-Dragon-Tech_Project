// --- resource_curator.js ---

document.addEventListener('DOMContentLoaded', function() {

    const summarizeButton = document.getElementById('summarizeButton');
    const summaryInput = document.getElementById('summaryInput');
    const summaryOutput = document.getElementById('summaryOutput');

    // MÔ PHỎNG CHỨC NĂNG TÓM TẮT / GIẢI THÍCH
    summarizeButton.addEventListener('click', function() {
        const inputText = summaryInput.value.trim();
        if (inputText === '') {
            alert('Vui lòng nhập văn bản hoặc URL để tóm tắt/giải thích.');
            return;
        }

        // Mô phỏng AI tóm tắt hoặc giải thích
        let summarizedText = '';
        if (inputText.toLowerCase().includes('javascript') || inputText.toLowerCase().includes('html')) {
            summarizedText = "AI giải thích: HTML là ngôn ngữ đánh dấu siêu văn bản, dùng để tạo cấu trúc trang web. JavaScript là ngôn ngữ lập trình kịch bản, dùng để tạo tương tác động cho trang web.";
        } else if (inputText.length > 100) {
            summarizedText = "AI tóm tắt: " + inputText.substring(0, 80) + "... (Văn bản đã được tóm tắt bởi AI).\n\n" +
                              "Mô tả chi tiết hơn sẽ được hiển thị trong ứng dụng thực tế.";
        } else if (inputText.startsWith('http')) {
            summarizedText = "AI tóm tắt URL: Nội dung từ liên kết sẽ được phân tích và tóm tắt tại đây. (Chức năng này đòi hỏi backend AI thực tế).";
        }
        else {
            summarizedText = "AI tóm tắt/giải thích: " + inputText + " (Đây là mô phỏng tóm tắt/giải thích đơn giản của AI).\n\n" +
                              "Trong ứng dụng thực tế, AI sẽ đưa ra kết quả chi tiết và chính xác hơn.";
        }

        summaryOutput.textContent = summarizedText;
        summaryOutput.style.display = 'block'; // Hiển thị kết quả
    });

    // MÔ PHỎNG CHỨC NĂNG TÌM KIẾM & ĐỀ XUẤT TÀI NGUYÊN
    const resourceSearchInput = document.getElementById('resourceSearchInput');
    const searchResourceButton = document.getElementById('searchResourceButton');
    const resourceFilterTopic = document.getElementById('resourceFilterTopic');
    const resourceFilterSource = document.getElementById('resourceFilterSource');
    const resourceResultsDiv = document.getElementById('resourceResults');

    const sampleResources = [
        {
            title: "Khóa học Lập trình Python cơ bản",
            description: "Học Python từ đầu, phù hợp cho người mới bắt đầu.",
            source: "Coursera",
            topic: "laptrinh",
            thumbnail: "https://via.placeholder.com/80x60/2196F3/FFFFFF?text=Python"
        },
        {
            title: "Machine Learning cơ bản với Python",
            description: "Giới thiệu về các thuật toán ML và cách triển khai.",
            source: "edX",
            topic: "dulieu",
            thumbnail: "https://via.placeholder.com/80x60/FF4081/FFFFFF?text=ML"
        },
        {
            title: "Thiết kế UI/UX cho người mới",
            description: "Nguyên tắc cơ bản của thiết kế giao diện người dùng và trải nghiệm người dùng.",
            source: "Udemy",
            topic: "design",
            thumbnail: "https://via.placeholder.com/80x60/1976D2/FFFFFF?text=UI/UX"
        },
        {
            title: "Video series: Phát triển Web Frontend",
            description: "Hướng dẫn chi tiết từ HTML, CSS đến JavaScript.",
            source: "YouTube",
            topic: "laptrinh",
            thumbnail: "https://via.placeholder.com/80x60/757575/FFFFFF?text=Web"
        },
        {
            title: "Phân tích dữ liệu với Pandas",
            description: "Sử dụng thư viện Pandas trong Python để phân tích dữ liệu.",
            source: "Coursera",
            topic: "dulieu",
            thumbnail: "https://via.placeholder.com/80x60/FF4081/FFFFFF?text=Pandas"
        }
    ];

    function displayResources(resources) {
        resourceResultsDiv.innerHTML = ''; // Xóa kết quả cũ
        if (resources.length === 0) {
            resourceResultsDiv.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Không tìm thấy tài nguyên phù hợp.</p>';
            return;
        }
        resources.forEach(resource => {
            const resourceCard = document.createElement('div');
            resourceCard.classList.add('resource-card');
            resourceCard.innerHTML = `
                <img src="${resource.thumbnail}" alt="${resource.title}">
                <div class="resource-info">
                    <div class="resource-title">${resource.title}</div>
                    <div class="resource-description">${resource.description}</div>
                    <div class="resource-source">Nguồn: ${resource.source}</div>
                </div>
            `;
            resourceCard.addEventListener('click', () => {
                alert(`Bạn đã chọn tài nguyên: "${resource.title}". (Trong ứng dụng thực tế sẽ mở link hoặc chi tiết tài nguyên)`);
                // window.open('link_to_resource_detail.html', '_blank');
            });
            resourceResultsDiv.appendChild(resourceCard);
        });
    }

    function filterAndSearchResources() {
        const query = resourceSearchInput.value.toLowerCase();
        const selectedTopic = resourceFilterTopic.value;
        const selectedSource = resourceFilterSource.value;

        const filtered = sampleResources.filter(resource => {
            const matchesQuery = resource.title.toLowerCase().includes(query) ||
                                 resource.description.toLowerCase().includes(query);
            const matchesTopic = selectedTopic === '' || resource.topic === selectedTopic;
            const matchesSource = selectedSource === '' || resource.source.toLowerCase() === selectedSource.toLowerCase();
            return matchesQuery && matchesTopic && matchesSource;
        });
        displayResources(filtered);
    }

    // Gắn sự kiện cho nút tìm kiếm và bộ lọc
    searchResourceButton.addEventListener('click', filterAndSearchResources);
    resourceSearchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            filterAndSearchResources();
        }
    });
    resourceFilterTopic.addEventListener('change', filterAndSearchResources);
    resourceFilterSource.addEventListener('change', filterAndSearchResources);

    // Hiển thị tất cả tài nguyên khi tải trang lần đầu
    displayResources(sampleResources);
});