import * as fs from 'fs';
import * as readlineSync from 'readline-sync';
import { Coureur, Team } from './interfaces'; 

function readJsonFile(filePath: string): any {
    try {
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(jsonData);
    } catch (error) {
        console.error(`Er is een fout opgetreden bij het lezen van het bestand: ${error}`);
        return null;
    }
}

const coureursFilePath = './data/data.json';
const teamsFilePath = './data/teams.json';

const coureursData: Coureur[] = readJsonFile(coureursFilePath);
const teamsData: Team[] = readJsonFile(teamsFilePath);


function viewAllCoureurs(coureurs: Coureur[]) {
    coureurs.forEach(coureur => {
        const team = teamsData.find(team => team.id === coureur.teamId);
        if (team) {
            console.log(`- ${coureur.name} (${coureur.id}) `);
        } else {
            console.log(`- ${coureur.name} (${coureur.id}) `);
        }
    });
}

function filterCoureurById(coureurs: Coureur[], id: number) {
    const filteredCoureur = coureurs.find(coureur => coureur.id === id);

    if (filteredCoureur) {
        const team = teamsData.find(team => team.id === filteredCoureur?.teamId);

        if (team) {
            console.log(`- ${filteredCoureur.name} (${filteredCoureur.id})`);
            console.log(`  - Description: ${filteredCoureur.description}`);
            console.log(`  - Age: ${filteredCoureur.age}`);
            console.log(`  - Active: ${filteredCoureur.active}`);
            console.log(`  - Birthdate: ${filteredCoureur.birthdate}`);
            console.log(`  - Image: ${filteredCoureur.profileImageUrl}`);
            console.log(`  - Status: ${filteredCoureur.status}`);
            console.log(`  - Hobbies: ${filteredCoureur.hobbies}`);
            console.log(`  - team: ${team.name}`);
            console.log(`  - team country: ${team.country}`);
        } else {
            console.log(`Team for ${filteredCoureur.name} not found.`);
        }
    } else {
        console.log(`Coureur with ID ${id} not found.`);
    }
}


console.log("Welcome to the JSON data viewer!");

console.log("\n1. View all coureurs");
console.log("2. Filter coureur by ID");
console.log("3. Exit");

const choice = parseInt(readlineSync.question("\nPlease enter your choice: "));

switch (choice) {
    case 1:
        console.log("\nAll Coureurs:");
        viewAllCoureurs(coureursData || []);
        break;
    case 2:
        const idString = readlineSync.question("\nPlease enter the ID you want to filter by: ");
        const id = parseInt(idString, 10); 
        filterCoureurById(coureursData || [], id);
        break;
    case 3:
        console.log("\nExiting the program...");
        break;
    default:
        console.log("\nInvalid choice. Exiting the program...");
}
