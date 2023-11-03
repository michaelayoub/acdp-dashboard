import type { Attribute } from "../../_old/Attribute";
import type { Character } from "../../_old/Character";
import type { Skill } from "../../_old/Skill";

function getRandomInt(max: number) {
    return Math.ceil(Math.random() * max);
}

function rav(name: string): Attribute {
    return { name, base: getRandomInt(290), creation: getRandomInt(100) };
}

function rs(name: string): Skill {
    return { name, base: getRandomInt(450), advancementClass: getRandomInt(2) % 2 == 0 ? "SPECIALIZED" : "TRAINED" };
}

function swap(sac: string): "TRAINED" | "SPECIALIZED" {
    return sac == "TRAINED" ? "SPECIALIZED" : "TRAINED";
}

export function mutate(char: Character): void {
    char.level += getRandomInt(2);
    char.unassignedXp += getRandomInt(1_000_000);
    char.attributes[getRandomInt(char.attributes.length) - 1].base += getRandomInt(2);

    const skillIndex = getRandomInt(char.skills.length) - 1;
    char.skills[skillIndex].base += getRandomInt(5);
    if (getRandomInt(10) % 10 == 0) {
        char.skills[skillIndex].advancementClass = swap(char.skills[skillIndex].advancementClass);
    }
}

export const charactersArray: Character[] = [
    {
        name: "Bob",
        level: getRandomInt(275),
        attributes: [rav("Strength"), rav("Endurance"), rav("Coordination"), rav("Quickness"), rav("Focus"), rav("Self")],
        unassignedXp: getRandomInt(4_000_000_000),
        skills: [rs("Heavy Weapons"), rs("Shield"), rs("War Magic"), rs("Life Magic"), rs("Light Weapons")]
    },
    {
        name: "Joe",
        level: getRandomInt(275),
        attributes: [rav("Strength"), rav("Endurance"), rav("Coordination"), rav("Quickness"), rav("Focus"), rav("Self")],
        unassignedXp: getRandomInt(4_000_000_000),
        skills: [rs("Heavy Weapons"), rs("Shield"), rs("War Magic"), rs("Life Magic"), rs("Light Weapons")]
    },
    {
        name: "Jo",
        level: getRandomInt(275),
        attributes: [rav("Strength"), rav("Endurance"), rav("Coordination"), rav("Quickness"), rav("Focus"), rav("Self")],
        unassignedXp: getRandomInt(4_000_000_000),
        skills: [rs("Heavy Weapons"), rs("Shield"), rs("War Magic"), rs("Life Magic"), rs("Light Weapons")]
    },
    {
        name: "Bill",
        level: getRandomInt(275),
        attributes: [rav("Strength"), rav("Endurance"), rav("Coordination"), rav("Quickness"), rav("Focus"), rav("Self")],
        unassignedXp: getRandomInt(4_000_000_000),
        skills: [rs("Heavy Weapons"), rs("Shield"), rs("War Magic"), rs("Life Magic"), rs("Light Weapons")]
    },
];