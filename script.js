// التعامل مع أزرار الصفحة العامة
document.getElementById('startBtn')?.addEventListener('click', () => {
  alert('شكرًا لك! سيتم توجيهك لبدء رحلتك التسويقية.');
});

document.getElementById('registerBtn')?.addEventListener('click', () => {
  alert('تم الضغط على زر التسجيل. سيتم تحويلك لصفحة التسجيل قريبًا.');
});

// === أكواد شات الذكاء الاصطناعي ===
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

if (chatForm) {
  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    addMessage(userMessage, 'user');

    chatInput.value = '';
    chatInput.focus();

    // إرسال الطلب إلى السيرفر الخلفي لاستدعاء AI
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      addMessage(data.reply || 'عذراً، لم يتم الحصول على رد.', 'bot');
    } catch {
      addMessage('حدث خطأ في الاتصال بالسيرفر.', 'bot');
    }
  });
}

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
