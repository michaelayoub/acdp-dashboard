<script lang="ts">
	import { page } from '$app/stores';
	import CharacterCardMinimal from '$lib/components/CharacterCardMinimal.svelte';
	import CharacterDetailDisplay from '$lib/components/CharacterDetailDisplay.svelte';
	import {
		updateWithStringProps,
		type CharacterWithDetails,
		updateWithIntProps,
		updateWithPosProps,
		updateWithDetails
	} from '$lib/model/CharacterWithDetails';
	import type { CharacterDetail } from '$lib/model/queries/CharacterDetails';
	import type { MinimalCharacterIntProperties } from '$lib/model/queries/MinimalCharacterIntProperties';
	import type { MinimalCharacterStringProperties } from '$lib/model/queries/MinimalCharacterStringProperties';
	import type { PositionEnrichedProperties } from '$lib/model/queries/PositionEnrichedProperties';
	import { source } from 'sveltekit-sse';

	const objectId = $page.params.objectId;

	const detailValues = source(`/characters/${objectId}`);
	const stringPropertiesValues = source(`/characters/${objectId}/string-props`);
	const intPropertiesValues = source(`/characters/${objectId}/int-props`);
	const posPropertiesValues = source(`/characters/${objectId}/pos-props`);

    let loading = true;
    let deleted = false;
	let character: CharacterWithDetails = { ObjectID: Number.parseInt(objectId), CharacterName: "" }

	stringPropertiesValues.subscribe((v: string) => {
		if (v !== '') {
			const props: MinimalCharacterStringProperties = JSON.parse(v);
			if (props.isDeleted) {
				deleted = true;
			} else {
				updateWithStringProps(character, props);
				character = character;
			}
		}
	});

	intPropertiesValues.subscribe((v: string) => {
		if (v !== '') {
			const props: MinimalCharacterIntProperties = JSON.parse(v);
			if (props.isDeleted) {
				deleted = true;
			} else {
				updateWithIntProps(character, props);
				character = character;
			}
		}
	});

	posPropertiesValues.subscribe((v: string) => {
		if (v !== '') {
			const props: PositionEnrichedProperties = JSON.parse(v);
			if (props.isDeleted) {
				deleted = true;
			} else {
				updateWithPosProps(character, props);
				character = character;
			}
		}
	});

	detailValues.subscribe((v: string) => {
		if (v !== '') {
			const details: CharacterDetail = JSON.parse(v);
			updateWithDetails(character, details);
			character = character;
		}
	});

	$: if (character.HeritageGroup && character.NumDeaths && character.Skills) {
        loading = false;
		console.log(character);
	}
</script>

<CharacterDetailDisplay character={character} {loading} />
