// Kunci jawaban SNBT
const answerKey = {
  q1: 'A',
  q2: 'A',
  q3: 'A',
  q4: 'C',
  q5: 'D',
  q6: 'D',
  q7: 'C',
  q8: 'B',
  q9: 'C',
  q10: 'B'
};

// Labels untuk display
const questionLabels = {
  q1: 'Soal 1',
  q2: 'Soal 2',
  q3: 'Soal 3',
  q4: 'Soal 4',
  q5: 'Soal 5',
  q6: 'Soal 6',
  q7: 'Soal 7',
  q8: 'Soal 8',
  q9: 'Soal 9',
  q10: 'Soal 10'
};

// Event listener untuk tombol Kirim Jawaban
document.getElementById('submitBtn').addEventListener('click', function(e) {
  e.preventDefault();
  submitQuiz();
});

// Event listener untuk tombol Coba Lagi
document.getElementById('resetBtn').addEventListener('click', function(e) {
  e.preventDefault();
  resetQuiz();
});

// Fungsi untuk submit dan evaluasi jawaban
function submitQuiz() {
  const form = document.getElementById('quizForm');
  let allAnswered = true;
  let correctCount = 0;
  let wrongCount = 0;

  // Cek apakah semua soal sudah dijawab
  for (let i = 1; i <= 10; i++) {
    const question = `q${i}`;
    const checked = document.querySelector(`input[name="${question}"]:checked`);
    if (!checked) {
      allAnswered = false;
      break;
    }
  }

  // Jika belum semua dijawab, tampilkan alert
  if (!allAnswered) {
    alert('Harap jawab semua soal sebelum mengirim.');
    return;
  }

  // Evaluasi setiap jawaban
  for (let i = 1; i <= 10; i++) {
    const question = `q${i}`;
    const userAnswer = document.querySelector(`input[name="${question}"]:checked`).value;
    const correctAnswer = answerKey[question];
    const resultDiv = document.getElementById(`result${i}`);

    if (userAnswer === correctAnswer) {
      correctCount++;
      resultDiv.className = 'answer-result answer-correct';
      resultDiv.innerHTML = `✓ Benar! Jawaban Anda: ${userAnswer}`;
    } else {
      wrongCount++;
      resultDiv.className = 'answer-result answer-wrong';
      resultDiv.innerHTML = `✗ Salah! Jawaban Anda: ${userAnswer}<div class="correct-answer">Jawaban yang benar: ${correctAnswer}</div>`;
    }
  }

  // Hitung persentase
  const totalQuestions = 10;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  // Tampilkan hasil summary
  document.getElementById('correctCount').textContent = correctCount;
  document.getElementById('wrongCount').textContent = wrongCount;
  document.getElementById('percentageScore').textContent = percentage + '%';
  document.getElementById('resultSummary').classList.add('show');

  // Scroll ke hasil
  setTimeout(() => {
    document.getElementById('resultSummary').scrollIntoView({ behavior: 'smooth' });
  }, 100);
}

// Fungsi untuk reset dan coba lagi
function resetQuiz() {
  const form = document.getElementById('quizForm');
  
  // Reset semua radio button
  form.reset();

  // Hapus semua hasil
  for (let i = 1; i <= 10; i++) {
    const resultDiv = document.getElementById(`result${i}`);
    resultDiv.textContent = '';
    resultDiv.className = 'answer-result';
  }

  // Sembunyikan result summary
  document.getElementById('resultSummary').classList.remove('show');

  // Scroll ke atas
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
