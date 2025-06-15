// --- career_and_interview.js ---

document.addEventListener('DOMContentLoaded', function() {
    const careerSelect = document.getElementById('careerSelect');
    const careerInfoDiv = document.getElementById('careerInfo');
    const exploreMoreCareersButton = document.getElementById('exploreMoreCareers');

    const interviewRoleSelect = document.getElementById('interviewRoleSelect');
    const interviewQuestionDiv = document.getElementById('interviewQuestion');
    const interviewAnswerInput = document.getElementById('interviewAnswerInput');
    const submitAnswerButton = document.getElementById('submitAnswerButton');
    const aiFeedbackDiv = document.getElementById('aiFeedback');

    // Dữ liệu mẫu về nghề nghiệp với tỷ lệ cạnh tranh (%)
    // (Đây là dữ liệu ước tính, bạn có thể thay đổi dựa trên nghiên cứu thực tế)
    const careerData = {
        frontend_dev: {
            name: "Lập trình viên Frontend",
            description: "Chuyên phát triển giao diện người dùng website và ứng dụng web. Yêu cầu cao về UI/UX và khả năng làm việc với JavaScript frameworks (React, Vue, Angular).",
            skills: ["HTML/CSS", "JavaScript", "React/Vue/Angular", "Thiết kế UI/UX", "Kiểm thử"],
            salary: "10-20 triệu VND/tháng",
            competition_percent: 75 // Tỷ lệ cạnh tranh ước tính theo % (0-100)
        },
        backend_dev: {
            name: "Lập trình viên Backend",
            description: "Xây dựng và duy trì logic phía máy chủ, cơ sở dữ liệu và API. Yêu cầu kiến thức về ngôn ngữ lập trình server-side (Node.js, Python, Java), database (SQL, NoSQL).",
            skills: ["Python/Java/Node.js", "Cơ sở dữ liệu (SQL, NoSQL)", "API Development", "Cloud Computing", "Bảo mật"],
            salary: "12-25 triệu VND/tháng",
            competition_percent: 60
        },
        data_analyst: {
            name: "Chuyên viên Phân tích dữ liệu",
            description: "Thu thập, xử lý và phân tích dữ liệu để đưa ra các insights hỗ trợ quyết định kinh doanh. Yêu cầu kỹ năng về thống kê, Python/R, SQL, công cụ trực quan hóa dữ liệu.",
            skills: ["SQL", "Python/R", "Thống kê", "Trực quan hóa dữ liệu (Tableau, Power BI)", "Excel"],
            salary: "9-18 triệu VND/tháng",
            competition_percent: 85
        },
        ux_ui_designer: {
            name: "Thiết kế UI/UX",
            description: "Thiết kế trải nghiệm người dùng (UX) và giao diện người dùng (UI) cho các sản phẩm số. Tập trung vào tính dễ sử dụng, thẩm mỹ và sự hài lòng của người dùng.",
            skills: ["Figma/Sketch/Adobe XD", "Thiết kế đồ họa", "Phân tích người dùng", "Kiểm thử Usability", "Tư duy thiết kế"],
            salary: "8-16 triệu VND/tháng",
            competition_percent: 70
        }
    };

    // Dữ liệu mẫu câu hỏi phỏng vấn và phản hồi AI (có thể mở rộng)
    const interviewQuestions = {
        fe_interview: [
            "Hãy giới thiệu đôi nét về bản thân bạn.",
            "Bạn có kinh nghiệm gì với React/Vue/Angular không?",
            "Làm thế nào để tối ưu hóa hiệu suất website Frontend?",
            "Bạn có câu hỏi nào cho chúng tôi không?"
        ],
        be_interview: [
            "Hãy giới thiệu đôi nét về bản thân bạn.",
            "Bạn đã từng làm việc với hệ quản trị cơ sở dữ liệu nào?",
            "Giải thích về RESTful API.",
            "Bạn có câu hỏi nào cho chúng tôi không?"
        ],
        da_interview: [
            "Hãy giới thiệu đôi nét về bản thân bạn.",
            "Bạn hiểu thế nào về phân tích dữ liệu và vai trò của nó?",
            "Kể về một dự án phân tích dữ liệu bạn đã làm.",
            "Bạn có câu hỏi nào cho chúng tôi không?"
        ]
    };

    let currentQuestionIndex = 0;
    let selectedInterviewRole = '';

    // HIỂN THỊ THÔNG TIN NGHỀ NGHIỆP
    careerSelect.addEventListener('change', function() {
        const selectedCareerId = this.value;
        if (selectedCareerId && careerData?.[selectedCareerId]) {
            const career = careerData?.[selectedCareerId];
            careerInfoDiv.innerHTML = `
                <h4>${career.name}</h4>
                <p><strong>Mô tả:</strong> ${career.description}</p>
                <p><strong>Kỹ năng cần thiết:</strong></p>
                <ul>
                    ${career.skills.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
                <p><strong>Mức lương trung bình:</strong> ${career.salary}</p>
            `;
            careerInfoDiv.style.display = 'block';
        } else {
            careerInfoDiv.style.display = 'none';
            careerInfoDiv.innerHTML = '';
        }
    });

    exploreMoreCareersButton.addEventListener('click', function() {
        alert('Chức năng này sẽ đưa bạn đến trang khám phá nghề nghiệp chi tiết hơn! (Demo)');
    });

    // --- VẼ BIỂU ĐỒ CẠNH TRANH NGÀNH NGHỀ (BAR CHART) ---
    const competitionChartCtx = document.getElementById('competitionBarChart').getContext('2d');
    const competitionLabels = Object.values(careerData).map(career => career.name);
    const competitionValues = Object.values(careerData).map(career => career.competition_percent);

    // Màu sắc cho các cột dựa trên tỷ lệ cạnh tranh (tùy chỉnh màu sắc để đẹp mắt)
    const backgroundColors = competitionValues.map(percent => {
        if (percent >= 80) return 'rgba(255, 64, 129, 0.7)'; // Accent - Rất cao
        if (percent >= 60) return 'rgba(255, 193, 7, 0.7)'; // Yellow - Cao
        return 'rgba(76, 175, 80, 0.7)'; // Green - Trung bình/Thấp
    });
    const borderColors = competitionValues.map(percent => {
        if (percent >= 80) return '#FF4081';
        if (percent >= 60) return '#FFC107';
        return '#4CAF50';
    });

    const competitionBarChart = new Chart(competitionChartCtx, {
        type: 'bar', // Loại biểu đồ cột
        data: {
            labels: competitionLabels,
            datasets: [{
                label: 'Tỷ lệ Cạnh tranh (%)',
                data: competitionValues,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { // Trục Y cho tỷ lệ cạnh tranh
                    beginAtZero: true,
                    max: 100, // Tối đa 100%
                    ticks: {
                        stepSize: 20, // Bước nhảy 20%
                        callback: function(value) { return value + '%'; }, // Thêm % vào nhãn
                        font: { family: 'Inter' },
                        color: 'var(--text-secondary)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: { // Trục X cho tên ngành nghề
                    ticks: {
                        font: { family: 'Inter' },
                        color: 'var(--text-primary)'
                    },
                    grid: {
                        display: false // Ẩn lưới dọc
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Ẩn legend nếu chỉ có 1 dataset
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    },
                    bodyFont: { family: 'Inter' },
                    titleFont: { family: 'Inter' }
                }
            }
        }
    });

    // --- LUYỆN PHỎNG VẤN ẢO ---
    submitAnswerButton.addEventListener('click', handleSubmitAnswer);

    interviewRoleSelect.addEventListener('change', function() {
        selectedInterviewRole = this.value;
        currentQuestionIndex = 0;
        aiFeedbackDiv.style.display = 'none';
        interviewAnswerInput.value = '';

        if (selectedInterviewRole && interviewQuestions?.[selectedInterviewRole]) {
            displayQuestion();
            submitAnswerButton.textContent = 'Gửi Câu Trả Lời & Nhận Phản Hồi';
        } else {
            interviewQuestionDiv.innerHTML = '<p class="question-text">Vui lòng chọn vị trí phỏng vấn để bắt đầu.</p>';
            submitAnswerButton.textContent = 'Bắt Đầu Phỏng Vấn';
        }
    });

    function displayQuestion() {
        if (selectedInterviewRole && interviewQuestions?.[selectedInterviewRole] && currentQuestionIndex < interviewQuestions?.[selectedInterviewRole]?.length) {
            const question = interviewQuestions?.[selectedInterviewRole][currentQuestionIndex];
            interviewQuestionDiv.innerHTML = `
                <p class="question-text">Câu hỏi ${currentQuestionIndex + 1}:</p>
                <p class="question-text">"${question}"</p>
            `;
            interviewAnswerInput.value = '';
            aiFeedbackDiv.style.display = 'none';
            submitAnswerButton.textContent = 'Gửi Câu Trả Lời & Nhận Phản Hồi';
            submitAnswerButton.removeEventListener('click', displayQuestion);
            submitAnswerButton.removeEventListener('click', restartInterview);
            submitAnswerButton.addEventListener('click', handleSubmitAnswer);
        } else {
            interviewQuestionDiv.innerHTML = '<p class="question-text">Buổi phỏng vấn đã kết thúc! Cảm ơn bạn đã tham gia.</p>';
            submitAnswerButton.textContent = 'Bắt Đầu Lại';
            submitAnswerButton.removeEventListener('click', handleSubmitAnswer);
            submitAnswerButton.addEventListener('click', restartInterview);
        }
    }

    function handleSubmitAnswer() {
        const userAnswer = interviewAnswerInput.value.trim();
        if (userAnswer === '') {
            alert('Vui lòng nhập câu trả lời của bạn.');
            return;
        }

        let feedback = '';
        if (userAnswer.length < 20) {
            feedback = "Phản hồi AI: Câu trả lời của bạn hơi ngắn gọn, hãy cung cấp thêm chi tiết và ví dụ cụ thể hơn nhé.";
            aiFeedbackDiv.style.backgroundColor = '#fff3e0';
            aiFeedbackDiv.style.borderColor = '#ffcc80';
            aiFeedbackDiv.style.color = '#EF6C00';
        } else if (userAnswer.toLowerCase().includes('react') || userAnswer.toLowerCase().includes('python')) {
            feedback = "Phản hồi AI: Rất tốt! Bạn đã đề cập đến những từ khóa quan trọng. Hãy tự tin và trình bày mạch lạc hơn trong buổi phỏng vấn thực tế.";
            aiFeedbackDiv.style.backgroundColor = '#e8f5e9';
            aiFeedbackDiv.style.borderColor = '#c8e6c9';
            aiFeedbackDiv.style.color = '#388E3C';
        } else {
            feedback = "Phản hồi AI: Câu trả lời khá ổn. Hãy nhớ nhấn mạnh kinh nghiệm và các kỹ năng liên quan đến vị trí này nhé.";
            aiFeedbackDiv.style.backgroundColor = '#e3f2fd';
            aiFeedbackDiv.style.borderColor = '#bbdefb';
            aiFeedbackDiv.style.color = '#1976D2';
        }

        aiFeedbackDiv.textContent = feedback;
        aiFeedbackDiv.style.display = 'block';

        currentQuestionIndex++;
        if (currentQuestionIndex < interviewQuestions?.[selectedInterviewRole]?.length) {
            submitAnswerButton.textContent = 'Câu hỏi tiếp theo';
            submitAnswerButton.removeEventListener('click', handleSubmitAnswer);
            submitAnswerButton.addEventListener('click', displayQuestion);
        } else {
            interviewQuestionDiv.innerHTML = '<p class="question-text">Buổi phỏng vấn đã kết thúc! Bạn đã hoàn thành tốt các câu hỏi.</p>';
            submitAnswerButton.textContent = 'Bắt Đầu Lại';
            submitAnswerButton.removeEventListener('click', handleSubmitAnswer);
            submitAnswerButton.addEventListener('click', restartInterview);
            
        }
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Restart the interview session from the beginning.
     * This function resets the question index, clears the answer input field, hides the AI feedback div, and displays the first question again.

/*******  4b19c338-575a-42af-8ea6-0583d249e0ae  *******/    }

    function restartInterview() {
        currentQuestionIndex = 0;
        interviewAnswerInput.value = '';
        aiFeedbackDiv.style.display = 'none';
        displayQuestion();
        submitAnswerButton.removeEventListener('click', restartInterview);
        submitAnswerButton.addEventListener('click', handleSubmitAnswer);

    }

    // Kích hoạt sự kiện change ban đầu để hiển thị thông tin mặc định nếu có
    careerSelect.dispatchEvent(new Event('change'));

    interviewRoleSelect.dispatchEvent(new Event('change'));
});