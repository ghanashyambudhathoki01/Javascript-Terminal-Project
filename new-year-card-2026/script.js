
const readline = require('readline');
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  
  // Background colors
  bgBlack: '\x1b[40m',
  bgRed: '\x1b[41m',
  bgGreen: '\x1b[42m',
  bgYellow: '\x1b[43m',
  bgBlue: '\x1b[44m',
  bgMagenta: '\x1b[45m',
  bgCyan: '\x1b[46m',
  bgWhite: '\x1b[47m'
};
const asciiArt = {
  header: `
happy new year 2026

  `,
  
  firework1: `
       *
      ***
     *****
      ***
       *
  `,
  
  firework2: `
    *   *   *
      \\ | /
    *-- + --*
      / | \\
    *   *   *
  `,
  
  sparkle: '✨',
  star: '⭐',
  heart: '❤️',
  gift: '🎁',
  party: '🎉',
  balloon: '🎈'
};

// Wishes database
const wishes = {
  friend: [
    "May this year bring you happiness, peace, and success in all your endeavors!",
    "New dreams, new goals, and new achievements await you in this fresh year!",
    "Wishing you health, wealth, and endless smiles throughout 2026!",
    "Here's to adventures, laughter, and unforgettable memories in 2026!"
  ],
  family: [
    "May our family be blessed with love, health, and prosperity this year!",
    "Wishing you and our entire family a year filled with joy and togetherness!",
    "May this year bring our family closer and fill our hearts with happiness!",
    "Here's to another year of beautiful family moments and cherished memories!"
  ],
  colleague: [
    "Wishing you professional success and personal growth in 2026!",
    "May this year bring exciting opportunities and career achievements!",
    "Here's to a productive and rewarding year ahead in our journey!",
    "Wishing you success in all your professional endeavors this year!"
  ],
  partner: [
    "To my love, may this year bring us even closer and fill our hearts with joy!",
    "Here's to another year of love, laughter, and beautiful moments together!",
    "May our bond grow stronger and our love deeper in this wonderful new year!",
    "Wishing us a year filled with romance, adventures, and endless happiness!"
  ],
  teacher: [
    "Thank you for your guidance! May this year bring you joy and fulfillment!",
    "Wishing you a year of inspiration, growth, and rewarding experiences!",
    "May 2026 bring you the appreciation and success you truly deserve!",
    "Here's to another year of making a difference in students' lives!"
  ],
  mentor: [
    "Thank you for believing in me! Wishing you an amazing year ahead!",
    "May this year reward you with the success you've helped others achieve!",
    "Wishing you continued wisdom, success, and fulfillment in 2026!",
    "Here's to a year of new opportunities and well-deserved recognition!"
  ]
};

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Helper functions
function clearScreen() {
  console.clear();
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function printWithColor(text, color) {
  console.log(color + text + colors.reset);
}

function printCentered(text, color = colors.white) {
  const terminalWidth = process.stdout.columns || 80;
  const lines = text.split('\n');
  lines.forEach(line => {
    const padding = Math.max(0, Math.floor((terminalWidth - line.length) / 2));
    console.log(color + ' '.repeat(padding) + line + colors.reset);
  });
}

function printBorder(char = '=', color = colors.yellow) {
  const width = process.stdout.columns || 80;
  printWithColor(char.repeat(width), color);
}

async function animateFireworks() {
  const fireworks = [asciiArt.firework1, asciiArt.firework2];
  for (let i = 0; i < 3; i++) {
    clearScreen();
    printCentered(fireworks[i % 2], colors.yellow + colors.bright);
    await sleep(300);
  }
}

async function showSparkles() {
  const sparkles = ['✨ ', '⭐ ', '💫 ', '🌟 '];
  let line = '';
  for (let i = 0; i < 10; i++) {
    line += sparkles[i % sparkles.length];
  }
  printCentered(line, colors.cyan + colors.bright);
}

function printCard(name, relationship, wish, themeColor) {
  const width = Math.min(process.stdout.columns || 80, 70);
  const border = '═'.repeat(width - 2);
  
  console.log('\n');
  printWithColor('╔' + border + '╗', themeColor);
  
  const emojis = {
    friend: '🎉',
    family: '❤️',
    colleague: '🤝',
    partner: '💕',
    teacher: '📚',
    mentor: '🌟'
  };
  
  const emoji = emojis[relationship.toLowerCase()] || '🎉';
  
  printWithColor(`║${' '.repeat((width - 20) / 2)}${emoji}  HAPPY NEW YEAR 2026  ${emoji}${' '.repeat((width - 20) / 2)}║`, themeColor);
  printWithColor('║' + ' '.repeat(width - 2) + '║', themeColor);
  
  printWithColor(`║  Dear ${name},${' '.repeat(width - 10 - name.length)}║`, colors.white + colors.bright);
  printWithColor('║' + ' '.repeat(width - 2) + '║', themeColor);
  
  // Word wrap the wish
  const words = wish.split(' ');
  let currentLine = '  ';
  const maxLineLength = width - 6;
  
  words.forEach((word, index) => {
    if ((currentLine + word).length > maxLineLength) {
      printWithColor(`║  ${currentLine}${' '.repeat(width - 4 - currentLine.length)}║`, colors.cyan);
      currentLine = '  ' + word + ' ';
    } else {
      currentLine += word + ' ';
    }
    
    if (index === words.length - 1) {
      printWithColor(`║  ${currentLine}${' '.repeat(width - 4 - currentLine.length)}║`, colors.cyan);
    }
  });
  
  printWithColor('║' + ' '.repeat(width - 2) + '║', themeColor);
  printWithColor(`║  With warm wishes,${' '.repeat(width - 22)}║`, colors.white);
  printWithColor(`║  Your ${relationship}${' '.repeat(width - 10 - relationship.length)}║`, colors.white);
  printWithColor('║' + ' '.repeat(width - 2) + '║', themeColor);
  printWithColor('╚' + border + '╝', themeColor);
  console.log('\n');
}

function showCountdown() {
  const newYear = new Date('2026-01-01T00:00:00');
  const now = new Date();
  const diff = now - newYear;
  
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  printCentered(`⏰ Time since New Year: ${days}d ${hours}h ${minutes}m ${seconds}s`, colors.yellow);
}

function question(prompt) {
  return new Promise(resolve => {
    rl.question(colors.green + prompt + colors.reset, answer => {
      resolve(answer);
    });
  });
}

async function selectTheme() {
  console.log('\n' + colors.bright + 'Select a theme color:' + colors.reset);
  console.log(colors.yellow + '1.' + colors.reset + ' Gold (Default)');
  console.log(colors.red + '2.' + colors.reset + ' Red');
  console.log(colors.blue + '3.' + colors.reset + ' Blue');
  console.log(colors.green + '4.' + colors.reset + ' Green');
  console.log(colors.magenta + '5.' + colors.reset + ' Magenta');
  console.log(colors.cyan + '6.' + colors.reset + ' Cyan');
  
  const choice = await question('\nEnter your choice (1-6): ');
  
  const themes = {
    '1': colors.yellow,
    '2': colors.red,
    '3': colors.blue,
    '4': colors.green,
    '5': colors.magenta,
    '6': colors.cyan
  };
  
  return themes[choice] || colors.yellow;
}

async function saveCard(name, relationship, wish) {
  const fs = require('fs');
  const content = `
═══════════════════════════════════════════════════
           🎉 HAPPY NEW YEAR 2026 🎉
═══════════════════════════════════════════════════

Dear ${name},

${wish}

With warm wishes,
Your ${relationship}

═══════════════════════════════════════════════════
Generated at: ${new Date().toLocaleString()}
═══════════════════════════════════════════════════
`;
  
  const filename = `new-year-card-${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
  
  try {
    fs.writeFileSync(filename, content);
    printWithColor(`\n✅ Card saved as: ${filename}`, colors.green + colors.bright);
  } catch (error) {
    printWithColor(`\n❌ Error saving card: ${error.message}`, colors.red);
  }
}

async function showStats(cardsGenerated) {
  console.log('\n');
  printBorder('─', colors.cyan);
  printCentered('📊 SESSION STATISTICS', colors.cyan + colors.bright);
  printBorder('─', colors.cyan);
  printCentered(`Cards Generated: ${cardsGenerated}`, colors.white);
  printCentered(`Session Time: ${new Date().toLocaleTimeString()}`, colors.white);
  printBorder('─', colors.cyan);
}

// Main application
async function main() {
  let cardsGenerated = 0;
  
  clearScreen();
  printCentered(asciiArt.header, colors.yellow + colors.bright);
  await showSparkles();
  showCountdown();
  
  await sleep(1000);
  
  console.log('\n');
  printBorder('═', colors.cyan);
  printCentered('Welcome to the New Year Card Generator!', colors.cyan + colors.bright);
  printBorder('═', colors.cyan);
  
  let continueGenerating = true;
  
  while (continueGenerating) {
    console.log('\n');
    
    // Get user inputs
    const name = await question('Enter recipient name: ') || 'Friend';
    
    console.log('\n' + colors.bright + 'Select relationship:' + colors.reset);
    console.log('1. Friend');
    console.log('2. Family');
    console.log('3. Colleague');
    console.log('4. Partner');
    console.log('5. Teacher');
    console.log('6. Mentor');
    
    const relChoice = await question('\nEnter your choice (1-6): ');
    const relationships = ['friend', 'family', 'colleague', 'partner', 'teacher', 'mentor'];
    const relationship = relationships[parseInt(relChoice) - 1] || 'friend';
    
    // Select theme
    const themeColor = await selectTheme();
    
    // Generate card
    printWithColor('\n🎨 Generating your card...', colors.yellow);
    await sleep(500);
    
    await animateFireworks();
    
    const wishArray = wishes[relationship];
    const randomWish = wishArray[Math.floor(Math.random() * wishArray.length)];
    
    clearScreen();
    printCard(name, relationship.charAt(0).toUpperCase() + relationship.slice(1), randomWish, themeColor);
    
    cardsGenerated++;
    
    // Options
    console.log('\n' + colors.bright + 'Options:' + colors.reset);
    console.log('1. Save card to file');
    console.log('2. Generate another card');
    console.log('3. View statistics');
    console.log('4. Exit');
    
    const option = await question('\nEnter your choice (1-4): ');
    
    switch(option) {
      case '1':
        await saveCard(name, relationship, randomWish);
        await sleep(1500);
        break;
      case '2':
        clearScreen();
        break;
      case '3':
        await showStats(cardsGenerated);
        await question('\nPress Enter to continue...');
        clearScreen();
        break;
      case '4':
        continueGenerating = false;
        break;
      default:
        clearScreen();
    }
  }
  
  // Goodbye message
  console.log('\n');
  printBorder('═', colors.yellow);
  printCentered('Thank you for using New Year Card Generator!', colors.yellow + colors.bright);
  printCentered(`You created ${cardsGenerated} card(s) this session! 🎉`, colors.cyan);
  printBorder('═', colors.yellow);
  console.log('\n');
  
  rl.close();
}

// Run the application
main().catch(error => {
  console.error(colors.red + 'An error occurred: ' + error.message + colors.reset);
  rl.close();
  process.exit(1);
});