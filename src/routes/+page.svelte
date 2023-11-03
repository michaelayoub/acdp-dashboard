<script lang="ts">
	import { source } from 'sveltekit-sse';
	import { updateWithStringProps, updateWithIntProps, type MinimalCharacter } from '$lib/model/MinimalCharacter';
	import type { MinimalCharacterStringProperties } from '$lib/model/queries/MinimalCharacterStringProperties';
	import CharacterCardMinimal from '$lib/components/CharacterCardMinimal.svelte';
	import type { MinimalCharacterIntProperties } from '$lib/model/queries/MinimalCharacterIntProperties';
	
	let map = new Map<number, MinimalCharacter>();
	let filteredMap: Map<number, MinimalCharacter> = new Map();
	
	let loading = true;
	let searchTerm = '';
	
	function searchCharacters() {
		return (filteredMap = new Map([...map].filter(([_, char]) => char.CharacterName.toLowerCase().includes(searchTerm.toLowerCase()))));
	}

	function getOrCreate(props: MinimalCharacterStringProperties | MinimalCharacterIntProperties, map: Map<number, MinimalCharacter>) {
		let data;
		if (!(data = map.get(props.objectId)!)) {
			data = {
				CharacterName: props.characterName,
				ObjectID: props.objectId
			};
		}
		return data;
	}

	const stringPropertiesValues = source('/characters/string-props');
	const intPropertiesValues = source('/characters/int-props');

	stringPropertiesValues.subscribe((v: string) => {
		if (v !== '') {
			const props: MinimalCharacterStringProperties = JSON.parse(v);
			if (props.isDeleted && map.delete(props.objectId)) {
				map = map;
			} else {
				let data: MinimalCharacter = getOrCreate(props, map);
				updateWithStringProps(data, props);
				map.set(props.objectId, data);
				map = map;
			}
		}
	});

	intPropertiesValues.subscribe((v: string) => {
		if (v !== '') {
			const props: MinimalCharacterIntProperties = JSON.parse(v);
			if (props.isDeleted && map.delete(props.objectId)) {
				map = map;
			} else {
				let data: MinimalCharacter = getOrCreate(props, map);
				updateWithIntProps(data, props);
				map.set(props.objectId, data);
				map = map;
			}
		}
	})

	$: if (map.size) {
		loading = false;
		console.log(map);
	}
</script>

{#if loading}
	<div class="pl-4 pr-4">
		<div class="h-screen flex justify-center items-center">
			<h2>Loading...</h2>
		</div>
	</div>
{/if}

<div class="mx-4">
	<input type="search" name="character" placeholder="Search for a character..." class="text-primary-900 my-4" bind:value={searchTerm} on:input={searchCharacters} />

	<div class="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if searchTerm && filteredMap.size == 0}
			<p>No characters found.</p>
		{:else if filteredMap.size}
			{#each filteredMap as [_, minimalCharacter] (minimalCharacter.ObjectID)}
				<CharacterCardMinimal character={minimalCharacter} />
			{/each}
		{:else}
			{#each map as [_, minimalCharacter] (minimalCharacter.ObjectID)}
			<CharacterCardMinimal character={minimalCharacter} />
			{/each}	
		{/if}
	</div>
</div>
