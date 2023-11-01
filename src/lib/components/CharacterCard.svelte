<script lang="ts">
    import type { Character } from '$lib/model/Character';

    export let character : Character;
</script>

<div class="my-4 rounded card p-4">
    <h2><a href="/characters/{character.name}">{character.name} (level {character.level})</a></h2>
    <p class="my-2">Unassigned XP: {character.unassignedXp}</p>
    <div class="my-2">
        <h3>Attributes</h3>
        {#each character.attributes as { name, base, creation }, i (name)}
            <p>{name}: {base} ({creation})</p>
        {/each}
    </div>
    <div class="my-1">
        <h2>Skills</h2>
        <div class="my-2">
            <h2>Specialized</h2>
            {#each character.skills.filter((s) => s.advancementClass == 'SPECIALIZED') as { name, base}, i (name)}
                <p>{name}: {base}</p>
            {/each}
        </div>
        <div class="my-2">
            <h2>Trained</h2>
            {#each character.skills.filter((s) => s.advancementClass == 'TRAINED') as { name, base }, i (name)}
                <p>{name}: {base}</p>
            {/each}
        </div>
    </div>
</div>
