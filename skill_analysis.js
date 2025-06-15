// --- skill_analysis.js ---

document.addEventListener('DOMContentLoaded', function() {
    // Dữ liệu mẫu về kỹ năng của sinh viên (đây là dữ liệu giả lập)
    const studentSkills = {
        labels: ['Lập trình Python', 'Cơ sở dữ liệu', 'Giao tiếp', 'Giải quyết vấn đề', 'Học máy', 'Web Frontend'],
        datasets: [{
            label: 'Mức độ Thành thạo',
            data: [4, 3, 4, 3, 2, 3], // Thang điểm 1-5
            backgroundColor: 'rgba(33, 150, 243, 0.4)', // primary_color với độ trong suốt
            borderColor: '#2196F3', // primary_color
            borderWidth: 2,
            pointBackgroundColor: '#2196F3',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#2196F3'
        }, {
            label: 'Mức yêu cầu cho mục tiêu nghề nghiệp',
            data: [5, 4, 3, 4, 4, 3], // Mức độ yêu cầu cho vị trí ví dụ: Data Scientist
            backgroundColor: 'rgba(255, 64, 129, 0.4)', // accent_color với độ trong suốt
            borderColor: '#FF4081', // accent_color
            borderWidth: 2,
            pointBackgroundColor: '#FF4081',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#FF4081'
        }]
    };

    // VẼ BIỂU ĐỒ RADAR
    const ctx = document.getElementById('radarChart').getContext('2d');
    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: studentSkills,
        options: {
            responsive: true,
            maintainAspectRatio: false, // Cho phép canvas tự co giãn theo chiều cao
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            family: 'Inter'
                        },
                        color: 'var(--text-primary)'
                    },
                    suggestedMin: 0,
                    suggestedMax: 5,
                    ticks: {
                        stepSize: 1,
                        display: false // Ẩn nhãn số trên trục radar
                    },
                    backgroundColor: 'rgba(248, 249, 250, 0.5)' // Nền cho biểu đồ
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Inter',
                            size: 14
                        },
                        color: 'var(--text-primary)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.r + '/5';
                        }
                    },
                    bodyFont: {
                        family: 'Inter'
                    },
                    titleFont: {
                        family: 'Inter'
                    }
                }
            }
        }
    });

    // Điền dữ liệu cho "Kỹ Năng Cần Phát Triển"
    const skillsToDevelop = [
        "Lập trình Python (nâng cao)",
        "Học máy (Machine Learning)",
        "Cơ sở dữ liệu (SQL & NoSQL)",
        "Giải quyết vấn đề (Tư duy phản biện)"
    ];
    const skillsListElement = document.getElementById('skillsToDevelopList');
    skillsToDevelop.forEach(skill => {
        const listItem = document.createElement('li');
        listItem.textContent = skill;
        skillsListElement.appendChild(listItem);
    });

    // Điền dữ liệu cho "Lộ Trình Học Tập Gợi Ý"
    const learningPath = [
        {
            step: "Bước 1: Nâng cao Python",
            description: "Tham gia khóa học Python nâng cao trên Coursera (Andrew Ng's ML Course) hoặc luyện tập trên LeetCode."
        },
        {
            step: "Bước 2: Tìm hiểu Machine Learning",
            description: "Đọc sách 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow', thực hiện các dự án nhỏ trên Kaggle."
        },
        {
            step: "Bước 3: Thực hành dự án Data Science",
            description: "Áp dụng kiến thức vào dự án thực tế, có thể tìm nhóm trên Discord hoặc diễn đàn FPT Polytechnic."
        }
    ];
    const learningPathStepsElement = document.getElementById('learningPathSteps');
    learningPath.forEach(path => {
        const divItem = document.createElement('div');
        divItem.classList.add('learning-path-step');
        divItem.innerHTML = `<strong>${path.step}</strong><p>${path.description}</p>`;
        learningPathStepsElement.appendChild(divItem);
    });

    // Xử lý nút "Bắt Đầu Học Tập Theo Lộ Trình"
    document.querySelector('.primary-button').addEventListener('click', function() {
        alert('Chức năng này sẽ đưa bạn đến tài nguyên học tập phù hợp! (Demo)');
        // Trong ứng dụng thực tế, sẽ có logic để chuyển hướng hoặc mở tài nguyên
    });
});