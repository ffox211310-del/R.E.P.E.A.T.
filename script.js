// R.E.P.E.A.T. Mk1 KODAMA — ELIZA原点回帰モード

// === ELIZAルール（反射＋オウム返し） ===
const rules = [
  { pattern: /母|おかあさん|mother/i, response: 'お母さんとの関係について、もう少し教えて。' },
  { pattern: /夢|ゆめ|dream/i, response: 'その夢はどんな意味があると思いますか？' },
  { pattern: /悲しい|つらい|sad/i, response: 'それは大変でしたね。もう少し詳しく聞かせてください。' },
  { pattern: /嬉しい|うれしい|happy/i, response: 'それは素晴らしいですね！どんな気持ちですか？' },
  { pattern: /腹減った|お腹すいた|hungry/i, response: 'あなたは何が好きですか？' },
  { pattern: /カレー|curry/i, response: 'それで、どうなりましたか？' },
  { pattern: /コンピュータ|computer|AI/i, response: 'コンピュータが世界を変えると思いますか？' },
];

// === メイン応答（オウム返し＋テンプレート） ===
function getResponse(input) {
  for (let rule of rules) {
    if (rule.pattern.test(input)) {
      // ★ 「」なしで、そのまま文頭に ★
      return `${input}。${rule.response}`;
    }
  }
  // フォールバック
  return `${input}。それで、どうなりましたか？`;
}
  }


// === 記憶（一旦オフ） ===
// let memory = [];
// function remember(input, response) {}

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

  appendMessage('YOU', input);
  
  // 応答生成
  const response = getResponse(input);
  
  // 少し遅延（レトロ感）
  setTimeout(() => {
    appendMessage('REPEAT', response);
  }, 300);

  userInput.value = '';
  userInput.focus();
}

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleSend();
  }
});

window.addEventListener('DOMContentLoaded', () => {
  appendMessage('REPEAT', 'こんにちは。私はR.E.P.E.A.T. Mk1 KODAMAです。何かお話ししましょう。');
  userInput.focus();
});
