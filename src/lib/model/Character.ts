import type { Attribute } from "./Attribute";
import type { Skill } from "./Skill";

export type Character = {
    name: string;
    level: number;
    attributes: Attribute[];
    unassignedXp: number;
    skills: Skill[];
}
