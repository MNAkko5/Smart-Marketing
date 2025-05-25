import express from 'express';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// ضبط مفتاح OpenAI API الخاص بك هنا:
const openai = new OpenAI({
  apiKey: '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',
});

// خدمة API للدردشة
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: userMessage }],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: 'حدث خطأ في الخادم، يرجى المحاولة لاحقاً.' });
  }
});

// تقديم ملفات الواجهة الثابتة
app.use(express.static(path.join(__dirname, '/')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
