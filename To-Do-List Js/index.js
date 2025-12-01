const fs = require("fs");
const readline = require("readline");

const FILE = "tasks.json";

// Load saved tasks
function loadTasks() {
  if (!fs.existsSync(FILE)) return [];
  return JSON.parse(fs.readFileSync(FILE, "utf8"));
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

let tasks = loadTasks();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "todo> ",
});

function showMenu() {
  console.log(`
====== TO-DO LIST APP ======
Commands:
  add        - Add a new task
  list       - Show all tasks
  delete     - Delete a task
  done       - Mark task as completed
  edit       - Edit a task
  search     - Search tasks
  filter     - Filter (all/completed/pending)
  clear      - Delete ALL tasks
  exit       - Quit app
=============================
`);
}

function listTasks(filter = "all") {
  console.log("\nYour Tasks:");
  console.log("-----------");

  if (tasks.length === 0) return console.log("No tasks found.\n");

  const filtered = tasks.filter((t) => {
    if (filter === "completed") return t.done;
    if (filter === "pending") return !t.done;
    return true;
  });

  filtered.forEach((task, index) => {
    console.log(`${index + 1}. ${task.done ? "[✔]" : "[ ]"} ${task.text}`);
  });
  console.log();
}

function ask(q) {
  return new Promise((res) => rl.question(q, res));
}

async function main() {
  showMenu();
  rl.prompt();

  rl.on("line", async (cmd) => {
    cmd = cmd.trim();

    if (cmd === "add") {
      const text = await ask("Enter task: ");
      tasks.push({ text, done: false });
      saveTasks(tasks);
      console.log("Task added.\n");
    } else if (cmd === "list") {
      listTasks();
    } else if (cmd === "delete") {
      listTasks();
      const num = await ask("Task number to delete: ");
      const index = parseInt(num) - 1;
      if (tasks[index]) {
        tasks.splice(index, 1);
        saveTasks(tasks);
        console.log("Task deleted.\n");
      } else {
        console.log("Invalid number.\n");
      }
    } else if (cmd === "done") {
      listTasks();
      const num = await ask("Task number to complete: ");
      const index = parseInt(num) - 1;
      if (tasks[index]) {
        tasks[index].done = true;
        saveTasks(tasks);
        console.log("Task marked as completed.\n");
      } else {
        console.log("Invalid number.\n");
      }
    } else if (cmd === "edit") {
      listTasks();
      const num = await ask("Task number to edit: ");
      const index = parseInt(num) - 1;
      if (tasks[index]) {
        const newText = await ask("New text: ");
        tasks[index].text = newText;
        saveTasks(tasks);
        console.log("Task updated.\n");
      } else {
        console.log("Invalid number.\n");
      }
    } else if (cmd === "search") {
      const query = await ask("Search keyword: ");
      const results = tasks.filter((t) => t.text.includes(query));
      console.log("\nSearch Results:");
      results.forEach((task, i) =>
        console.log(`${i + 1}. ${task.done ? "[✔]" : "[ ]"} ${task.text}`)
      );
      console.log();
    } else if (cmd === "filter") {
      const type = await ask("Filter (all/completed/pending): ");
      listTasks(type);
    } else if (cmd === "clear") {
      const confirm = await ask("Are you sure? (y/n): ");
      if (confirm.toLowerCase() === "y") {
        tasks = [];
        saveTasks(tasks);
        console.log("All tasks cleared.\n");
      }
    } else if (cmd === "exit") {
      console.log("Goodbye!");
      process.exit(0);
    } else {
      console.log("Unknown command. Type any command listed above.");
    }

    rl.prompt();
  });
}

main();
