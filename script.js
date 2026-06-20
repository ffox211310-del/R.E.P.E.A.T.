// R.E.P.E.A.T. Mk1 KODAMA — レトロ版

// === メモリ ===
let memory = JSON.parse(localStorage.getItem('repeat_memory')) || [];

// === ELIZAルール（Reflect） ===
const rules = [
  { pattern: /母|おかあさん|mother/i, response: 'お母さんとの関係について、もう少し教えて。' },
  { pattern: /夢|ゆめ|dream/i, response: 'その夢はどんな意味があると思いますか？' },
  { pattern: /悲しい|つらい|sad/i, response: 'それは大変でしたね。もう少し詳しく聞かせてください。' },
  { pattern: /嬉しい|うれしい|happy/i, response: 'それは素晴らしいですね！どんな気持ちですか？' },
  { pattern: /腹減った|お腹すいた|hungry/i, response: 'あなたは何が好きですか？' },
  { pattern: /カレー|curry/i, response: 'それで、どうなりましたか？' },
  { pattern: /コンピュータ|computer|AI/i, response: 'コンピュータが世界を変えると思いますか？' },
];

// === フォールバック（Process + Evolve） ===
function fallback(input) {
  const similar = memory.filter(record =>
    record.input.split(' ').some(word => input.includes(word))
  );
  if (similar.length > 0) {
    const chosen = similar[Math.floor(Math.random() * similar.length)];
    return chosen.response + ' （以前の誰かも似たことを言っていました）';
  }
  return 'もっと詳しく聞かせてください。';
}

// === 応答生成（メイン） ===
function getResponse(input) {
  for (let rule of rules) {
    if (rule.pattern.test(input)) {
      return rule.response;
    }
  }
  return fallback(input);
}

// === 記憶（Ensure） ===
function remember(input, response) {
  memory.push({ input, response, timestamp: Date.now() });
  localStorage.setItem('repeat_memory', JSON.stringify(memory));
}

// === UI制御 ===
const chatLog = document.getElementById('chat-log');
const userInput = document.getElementById('user-input');

function appendMessage(speaker, text) {
  const div = document.createElement('div');
  div.className = speaker === 'YOU' ? 'you' : 'repeat';
  div.textContent = `${speaker} > ${text}`;
  chatLog.appendChild(div);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function handleSend() {
  const input = userInput.value.trim();
  if (!input) return;

  // 表示（YOU）
  appendMessage('YOU', input);

  // 応答生成
  const response = getResponse(input);
  remember(input, response);

  // 表示（REPEAT）
  setTimeout(() => {
    appendMessage('REPEAT', response);
  }, 300); // ちょっと間を入れてレトロ感

  userInput.value = '';
  userInput.focus();
}

// Enterキーで送信
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSend();
  }
});

// 起動時メッセージ
window.addEventListener('DOMContentLoaded', () => {
  appendMessage('REPEAT', 'こんにちは。私はR.E.P.E.A.T. Mk1 KODAMAです。何かお話ししましょう。');
  userInput.focus();
});
