const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("===== PASSWORD GENERATOR =====");

function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

(async () => {
  const length = parseInt(await ask("Password length: "));

  const useLower =
    (await ask("Include lowercase letters? (y/n): ")).toLowerCase() === "y";
  const useUpper =
    (await ask("Include uppercase letters? (y/n): ")).toLowerCase() === "y";
  const useNumbers =
    (await ask("Include numbers? (y/n): ")).toLowerCase() === "y";
  const useSymbols =
    (await ask("Include symbols? (y/n): ")).toLowerCase() === "y";

  let chars = "";
  if (useLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (useUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (useNumbers) chars += "0123456789";
  if (useSymbols) chars += "!@#$%^&*()_+-={}[]<>?/";

  if (chars.length === 0) {
    console.log("❌ You must select at least one character type!");
    rl.close();
    return;
  }

  function generatePassword(len, charset) {
    let pass = "";
    for (let i = 0; i < len; i++) {
      pass += charset[Math.floor(Math.random() * charset.length)];
    }
    return pass;
  }

  const password = generatePassword(length, chars);

  console.log("\nGenerated Password:");
  console.log("====================");
  console.log(password);
  console.log("====================");

  rl.close();
})();
