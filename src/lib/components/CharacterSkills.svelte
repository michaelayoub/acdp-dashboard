<script lang="ts">
	import type { Skill } from "$lib/model/CharacterWithDetails";
	import { Table, tableMapperValues, type TableSource } from "@skeletonlabs/skeleton";

    export let skills: Skill[];
    $: specializedSkills = skills.filter(skill => skill.SkillAdvancementClass === "Specialized");
    $: trainedSkills = skills.filter(skill => skill.SkillAdvancementClass === "Trained");

    $: specializedSkillsTable = {
        head: ['Name', 'Current Level'],
        body: tableMapperValues(specializedSkills, ['Name', 'CurrentLevel'])
    };

    $: trainedSkillsTable = {
        head: ['Name', 'Current Level'],
        body: tableMapperValues(trainedSkills, ['Name', 'CurrentLevel'])
    };
</script>

<div class="grid-flow-col grid">
    <div class="card m-4">
        <div class="text-center card-header mb-4">
            <h3>Specialized Skills</h3>
        </div>
        <Table source={specializedSkillsTable} />
    </div>
    
    <div class="card m-4">
        <div class="text-center card-header mb-4">
            <h3>Trained Skills</h3>
        </div>
        <Table source={trainedSkillsTable} />
    </div>
</div>