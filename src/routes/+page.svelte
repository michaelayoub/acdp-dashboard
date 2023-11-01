<script lang="ts">
	import CharacterCard from '$lib/components/CharacterCardTabbed.svelte';
import type { Character } from '$lib/model/Character';
	import { source } from 'sveltekit-sse';

	const values = source('/characters').onError((event) => console.error({ event }));

	let characters: Character[] = [];
	values.subscribe((v: string) => {
		if (v !== '') {
			characters = JSON.parse(v);
		}
	});

	let filteredCharacters: Character[] = [];
	let searchTerm = '';

	function searchCharacters() {
		return (filteredCharacters = characters.filter((character) =>
			character.name.toLowerCase().includes(searchTerm.toLowerCase())
		));
	}
</script>

<div class="mx-4">
	<input type="search" name="character" placeholder="Search for a character..." class="text-primary-900 my-4" bind:value={searchTerm} on:input={searchCharacters} />

	<div class="grid grid-flow-row gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
		{#if searchTerm && filteredCharacters.length === 0}
			<p>No characters found.</p>
		{:else if filteredCharacters.length > 0}
			{#each filteredCharacters as character (character.name)}
				<CharacterCard {character} />
			{/each}
		{:else}
		{#each characters as character (character.name)}
			<CharacterCard {character} />
		{/each}
		{/if}
	</div>
</div>