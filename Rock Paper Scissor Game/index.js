const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let userScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choices = ["rock", "paper", "scissor"];
  return choices[Math.floor(Math.random() * choices.length)];
}

function getWinner(userChoice, computerChoice) {
  if (userChoice === computerChoice) return "draw";
  if (
    (userChoice === "rock" && computerChoice === "scissor") ||
    (userChoice === "paper" && computerChoice === "rock") ||
    (userChoice === "scissors" && computerChoice === "paper")
  ) {
    return "user";
  }
  return "computer";
}

function playGame() {
  rl.question(
    "Choose rock, paper, or scissor (or type 'exit' to quit): ",
    (answer) => {
      const userChoice = answer.toLowerCase();

      if (userChoice === "exit") {
        console.log(`Final Score -> You:
         ${userScore}, Computer: ${computerScore}`);
        rl.close();
        return;
      }

      if (!["rock", "paper", "scissor"].includes(userChoice)) {
        console.log("Invalid choice. Try again!");
        playGame();
        return;
      }

      const computerChoice = getComputerChoice();
      console.log(`Computer chose: ${computerChoice}`);

      const winner = getWinner(userChoice, computerChoice);

      if (winner === "draw") {
        console.log("It's a draw!");
      } else if (winner === "user") {
        userScore++;
        console.log("You win this round!");
      } else {
        computerScore++;
        console.log("Computer wins this round!");
      }

      console.log(`Score -> You: ${userScore}, Computer: ${computerScore}\n`);
      playGame();
    }
  );
}

console.log("Welcome to Rock–Paper–Scissors!");
console.log("Made by Ghanashyam Budhathoki")
playGame();
