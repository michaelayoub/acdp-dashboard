<script lang="ts">
    import type { MinimalCharacter } from "$lib/model/MinimalCharacter";

    export let character: MinimalCharacter;
</script>

<div class="rounded card max-w-lg">
    <div class="my-4 mb-4">
        <div class="grid grid-cols-3 grid-rows-2">
            <div class="col-span-2 row-span-3">
                <div class="text-center">
                    <h2><a href="/characters/{character.ObjectID}">{character.CharacterName}</a></h2>
                    <p>{character.Sex} {character.HeritageGroup}</p>
                    <p>{character.Template}</p>
                    {#if character.CurrentTitle !== character.Template}
                        <p>{character.CurrentTitle}</p>
                    {/if}
                    <p class="text-sm">{character.NumDeaths ?? 0} death{ character.NumDeaths != 1 ? "s" : ""} </p>
                </div>
            </div>
            <div class="col-span-1">
                <p class="text-2xl h-full flex justify-center items-center row-span-2">{character.CurrentLevel}</p>
                <div class="flex justify-center items-center row-span-1">
                    <p class="text-sm">{character.CreatureKills ?? 0} kill{ character.CreatureKills != 1 ? "s" : ""}</p>
                </div>
            </div>
        </div>
    </div>
</div>