const prompt = require("prompt-sync")({ sigint: true });

const todos = [];

function generateUniqueId() {
  // TODO: Implementasi fungsi untuk menghasilkan ID unik
  // Ini akan digunakan secara internal untuk setiap objek to-do
  // Contoh: Gabungan waktu saat ini dan angka acak

  return Date.now().toString() + Math.floor(Math.random() * 1000).toString();
}

function addTodo() {
  // TODO: Implementasi logika untuk menambah to-do baru
  // 1. Minta input teks to-do dari user menggunakan `prompt()`
  // 2. Validasi input: Pastikan teks tidak kosong atau hanya spasi
  // 3. Buat objek to-do baru dengan properti: id (dari generateUniqueId), text, dan isCompleted (boolean, default false)
  // 4. Tambahkan objek to-do ini ke array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil ditambahkan

  const text = prompt("Enter your to-do: ").trim();

  if (!text) {
    console.log("To-do cannot be empty.");
    return;
  }

  const todo = {
    id: generateUniqueId(),
    text,
    isCompleted: false,
  };

  todos.push(todo);
  console.log(`To-do "${text}" added.`);
}

function markTodoCompleted() {
  // TODO: Implementasi logika untuk menandai to-do sebagai selesai
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin ditandai sebagai selesai
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid (1 sampai jumlah to-do)
  // 4. Ubah properti `isCompleted` dari to-do yang dipilih menjadi `true`
  // 5. Beri feedback ke user bahwa to-do berhasil ditandai selesai
  // 6. Tangani kasus jika to-do sudah selesai

  listTodos();

  if (todos.length === 0) return;

  const number = Number(prompt("Enter the NUMBER of the to-do to mark as completed: "));

  if (isNaN(number) || number < 1 || number > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const todo = todos[number - 1];

  if (todo.isCompleted) {
    console.log(`To-do "${todo.text}" is already completed.`);
    return;
  }

  todo.isCompleted = true;
  console.log(`To-do "${todo.text}" marked as completed.`);
}

function deleteTodo() {
  // TODO: Implementasi logika untuk menghapus to-do
  // 1. Panggil `listTodos()` untuk menampilkan daftar to-do
  // 2. Minta user memasukkan NOMOR to-do yang ingin dihapus
  // 3. Validasi input: Pastikan nomor adalah angka, dalam rentang yang valid
  // 4. Hapus to-do yang dipilih dari array `todos`
  // 5. Beri feedback ke user bahwa to-do berhasil dihapus

  listTodos();

  if (todos.length === 0) return;

  const number = Number(prompt("Enter the NUMBER of the to-do to delete: "));

  if (isNaN(number) || number < 1 || number > todos.length) {
    console.log("Invalid number. Please enter a valid number from the list.");
    return;
  }

  const removed = todos.splice(number - 1, 1)[0];
  console.log(`To-do "${removed.text}" deleted.`);
}

function listTodos() {
  // TODO: Implementasi logika untuk menampilkan semua to-do
  // 1. Tampilkan judul daftar (misal: "--- YOUR TO-DO LIST ---")
  // 2. Cek apakah array `todos` kosong. Jika ya, tampilkan pesan "No to-dos to display."
  // 3. Jika tidak kosong, iterasi (loop) melalui array `todos`
  // 4. Untuk setiap to-do, tampilkan nomor urut, status ([DONE] atau [ACTIVE]), dan teks to-do
  //    Contoh format: "1. [ACTIVE] | Belajar JavaScript"
  // 5. Tampilkan garis penutup daftar

  console.log("\n--- YOUR TO-DO LIST ---");

  if (todos.length === 0) {
    console.log("No to-dos to display.");
    return;
  }

  todos.forEach((todo, index) => {
    const status = todo.isCompleted ? "[DONE]" : "[ACTIVE]";
    console.log(`${index + 1}. ${status} | ${todo.text}`);
  });
}

function runTodoApp() {
  // TODO: Implementasi logika utama aplikasi (menu interaktif)
  // Ini adalah "otak" aplikasi yang terus berjalan sampai user memilih untuk keluar
  console.log(`
  --- TO-DO MENU ---
  1. Add a new to-do      (command: "1" or "add")
  2. Mark completed       (command: "2" or "complete")
  3. Delete a to-do       (command: "3" or "delete")
  4. List all to-dos      (command: "4" or "list")
  5. Exit                 (command: "5" or "exit")
  ---------------------
    `);
  let running = true;
  while (running) {
    // 1. Tampilkan menu perintah yang tersedia (add, complete, delete, list, exit)
    // 2. Minta user memasukkan perintah menggunakan `prompt()`
    // 3. Gunakan `switch` statement atau `if/else if` untuk memanggil fungsi yang sesuai
    //    berdasarkan perintah yang dimasukkan user
    // 4. Tangani perintah 'exit' untuk menghentikan loop aplikasi
    // 5. Tangani input perintah yang tidak valid

    const command = prompt("Enter command: ").trim().toLowerCase();

    switch (command) {
      case "1":
      case "add":
        addTodo();
        break;

      case "2":
      case "complete":
        markTodoCompleted();
        break;

      case "3":
      case "delete":
        deleteTodo();
        break;

      case "4":
      case "list":
        listTodos();
        break;

      case "5":
      case "exit":
        running = false;
        break;

      default:
        console.log("Invalid command.");
        break;
    }
  }
}

if (require.main === module) {
  runTodoApp();
}

module.exports = {
  todos,
  generateUniqueId,
  addTodo,
  markTodoCompleted,
  deleteTodo,
  listTodos,
  runTodoApp,
};
