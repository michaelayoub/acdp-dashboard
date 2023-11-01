<script lang="ts">
	import type { Character } from '$lib/model/Character';
	import {
		Tab,
		TabGroup,
		Table,
		tableMapperValues,
		type TableSource
	} from '@skeletonlabs/skeleton';

	export let character: Character;

	const headerData = [
		{ name: 'Total XP', value: 1_234_567_890 },
		{ name: 'Unassigned XP', value: character.unassignedXp }
	];
	const headerTable: TableSource = {
		head: [],
		body: tableMapperValues(headerData, ['name', 'value'])
	};

	const attributesTable: TableSource = {
		head: ['Name', 'Base', 'Initial'],
		body: tableMapperValues(character.attributes, ['name', 'base', 'creation'])
	};

	const trainedSkills = character.skills.filter((s) => s.advancementClass === 'TRAINED');
	const specializedSkills = character.skills.filter((s) => s.advancementClass === 'SPECIALIZED');
	const trainedSkillsTable: TableSource = {
		head: ['Name', 'Base'],
		body: tableMapperValues(trainedSkills, ['name', 'base'])
	};
	const specializedSkillsTable: TableSource = {
		head: ['Name', 'Base'],
		body: tableMapperValues(specializedSkills, ['name', 'base'])
	};

    const listOfTitles = [{ name: "Adept Adventurer"}, { name: "Aerbax's Bane"}, { name: "Artifex"}, { name: "Banderling Bully"}];
    const titlesTable: TableSource = {
        head: [],
        body: tableMapperValues(listOfTitles, ['name'])
    };

	let tabSet: number = 0;
</script>

<div class="rounded card max-w-lg">
	<div class="grid grid-cols-3 card-header">
		<div class="col-span-2 text-center">
			<h2>{character.name}</h2>
			<p>Male Gharu'ndim Artifex</p>
		</div>
		<div class="col-span-2 text-left my-4">
			<!-- <p>Total Experience (XP): </p>
            <p>Unassigned Experience: {character.unassignedXp}</p> -->
			<Table source={headerTable} />
		</div>
		<div class="my-4 text-center">
			<p class="text-xl">Character Level</p>
			<p class="text-3xl">{character.level}</p>
		</div>
	</div>

	<TabGroup>
		<Tab bind:group={tabSet} name="attributes" value={0}>
			<svelte:fragment slot="lead">Attributes</svelte:fragment>
		</Tab>
		<Tab bind:group={tabSet} name="skills" value={1}>
			<svelte:fragment slot="lead">Skills</svelte:fragment>
		</Tab>
        <Tab bind:group={tabSet} name="titles" value={2}>
            <svelte:fragment slot="lead">Titles ({ listOfTitles.length })</svelte:fragment>
        </Tab>
		<svelte:fragment slot="panel">
			{#if tabSet == 0}
				<div class="card">
					<Table source={attributesTable} />
				</div>
			{:else if tabSet == 1}
				<div class="card">
					<div class="card-header my-4"><h2>Specialized</h2></div>
					<Table source={specializedSkillsTable} />
				</div>
				<div class="card">
					<div class="card-header my-4"><h2>Trained</h2></div>
					<Table source={trainedSkillsTable} />
				</div>
            {:else if tabSet == 2}
                <div class="card">
                    <Table source={titlesTable} />
                </div>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
