// R.E.P.E.A.T. Mk1 KODAMA — ELIZA原点回帰モード

// === ELIZAルール（人生相談系） ===
const rules = [
  { pattern: /母|おかあさん|mother/i, response: '母との関係について、もう少し教えて。' },
  { pattern: /夢|ゆめ|dream/i, response: 'その夢はどんな意味があると思いますか？' },
  { pattern: /仕事|しごと|work/i, response: '仕事について、もっと詳しく教えて。' },
  { pattern: /悲しい|つらい|sad/i, response: 'それは大変でしたね。もう少し詳しく聞かせてください。' },
  { pattern: /嬉しい|うれしい|happy/i, response: 'それは素晴らしいですね！どんな気持ちですか？' },
  { pattern: /恋愛|こい|love|彼女|彼氏/i, response: '恋愛について、あなたはどう思いますか？' },
  { pattern: /友達|ともだち|friend/i, response: '友達との関係は、あなたにとってどんな存在ですか？' },
  { pattern: /将来|しょうらい|future/i, response: '将来について、何か不安や希望はありますか？' },
  { pattern: /不安|ふあん|anxious/i, response: '不安な気持ち、よくわかります。何が一番気がかりですか？' },
];

// === メイン応答（複数キーワード対応版） ===
function getResponse(input) {
  const matchedResponses = [];

  // すべてのルールをチェックして、マッチしたものを収集
  for (let rule of rules) {
    if (rule.pattern.test(input)) {
      matchedResponses.push(rule.response);
    }
  }

  // マッチしたルールが1つ以上ある場合
  if (matchedResponses.length > 0) {
    // ユーザーの言葉を文頭に置いて、すべての応答を「。」で結合
    const combined = matchedResponses.join('。');
    return `${input}。${combined}`;
  }

  // 何もマッチしなかった場合（フォールバック）
  return `${input}。それで、どうなりましたか？`;
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
