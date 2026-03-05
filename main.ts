import * as fs from "fs";
import * as readline from "readline-sync";
import { Emperor } from "./Emperors";


const rawData = fs.readFileSync("Emperors.json", "utf-8");
const emperors: Emperor[] = JSON.parse(rawData);


function main() {
  let running = true;

  do {
    console.log("\nWelcome to the Roman Emperors Viewer!\n");

    let choices = [
      "View all emperors",
      "Filter by ID",
      "Exit"
    ];

    let choiceIndex = readline.keyInSelect(choices, "What do you want to do?", { cancel: false });

    switch (choiceIndex) {
      case 0:
        viewAll();
        break;
      case 1:
        filterById();
        break;
      case 2:
        running = false;
        break;
    }

  } while (running);

  console.log("Goodbye!");
}

function viewAll() {
  console.log("\nAll Roman Emperors:\n");

  emperors.forEach(emp => {
    console.log(`- ${emp.name} (${emp.id})`);
  });
}

function filterById() {
  let id = readline.question("\nEnter the ID you want to filter by. Example = 'EMP-001': ");

  const emperor = emperors.find(e => e.id === id);

  if (!emperor) {
    console.log("\n Emperor not found!\n");
    return;
  }

  console.log(`\n- ${emperor.name} (${emperor.id})`);
  console.log( ` - Description: ${emperor.description}`);
  console.log( ` - Age: ${emperor.age}`);
  console.log( ` - Active: ${emperor.isActive}`);
  console.log( ` - Birthdate: ${emperor.birthDate}`);
  console.log( ` - Image: ${emperor.imageUrl}`);
  console.log( ` - Status: ${emperor.status}`);
  console.log( ` - Titles: ${emperor.titles.join(", ")}`);
  console.log( ` - Era: ${emperor.era.name}`);
  console.log( `   - Period: ${emperor.era.startYear} to ${emperor.era.endYear}`);
  console.log( `   - Description: ${emperor.era.description}\n`);
}


main();