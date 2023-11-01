<script lang="ts">
    import { page } from "$app/stores";
	import CharacterCard from "$lib/components/CharacterCard.svelte";
    import type { Character } from "$lib/model/Character";
    import { source } from "sveltekit-sse";

    const name = $page.params.name;
    const values = source(`/characters/${name}`).onError((event) => console.error({ event }));

    let character: Character;
    values.subscribe((v: string) => {
        if (v !== '') {
            character = JSON.parse(v);
        }
    });
</script>

{#if character}
    <CharacterCard {character} />
{/if}