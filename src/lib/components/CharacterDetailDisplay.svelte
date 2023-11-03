<script lang="ts">
	import type { CharacterWithDetails } from "$lib/model/CharacterWithDetails";
	import CharacterAttributes from "./CharacterAttributes.svelte";
	import CharacterSecondaryAttributes from "./CharacterSecondaryAttributes.svelte";
	import CharacterSkills from "./CharacterSkills.svelte";

    export let character: CharacterWithDetails
	export let loading = true;
</script>

{#if loading}
	<div class="pl-4 pr-4">
		<div class="h-screen flex justify-center items-center">
			<h2>Loading...</h2>
		</div>
	</div>
{/if}

{#if !loading}
<div class="grid grid-cols-4">
	<div class="col-span-2 card m-4">
		<div class="text-center">
			<h2><a href="/characters/{character.ObjectID}"><h1 class="text-3xl">{character.CharacterName}</h1></a></h2>
			<p>{character.Sex} {character.HeritageGroup}</p>
			<p>{character.Template}</p>
			{#if character.CurrentTitle !== character.Template}
				<p>{character.CurrentTitle}</p>
			{/if}
		</div>
	</div>
	<div class="col-span-2 card m-4 grid-rows-2">
		<p class="text-center text-2xl row-span-2">Level {character.CurrentLevel}</p>
		<div class="text-center row-span-1">
			<p class="text-sm">{character.CreatureKills ?? 0} kill{ character.CreatureKills != 1 ? "s" : ""}</p>
			<p class="text-sm">{character.NumDeaths ?? 0} death{ character.NumDeaths != 1 ? "s" : ""} </p>
		</div>
	</div>
	<div class="col-span-4 m-4">
		<CharacterAttributes attributes={character.Attributes ?? []} />
	</div>
	<div class="col-span-4 m-4">
		<CharacterSecondaryAttributes attributes2nd={character.SecondaryAttributes ?? []} />
	</div>
	<div class="col-span-4">
		<CharacterSkills skills={character.Skills ?? []} />
	</div>
</div>
{/if}