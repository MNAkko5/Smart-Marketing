const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const userMessage = chatInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, 'user');

  chatInput.value = '';
  chatInput.focus();

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage }),
    });

    const data = await response.json();

    if (data.reply) {
      addMessage(data.reply, 'bot');
    } else {
      addMessage('عذراً، لم نحصل على رد من الخادم.', 'bot');
    }
  } catch (error) {
    addMessage('حدث خطأ في الاتصال بالخادم.', 'bot');
    console.error(error);
  }
});

function addMessage(text, sender) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = text;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
// في ملف الجافاسكريبت الخاص بالشات
function scrollToBottom() {
  const chatWindow = document.querySelector('.chat-window');
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// استدعاء هذه الدالة بعد إضافة كل رسالة جديدة
