<script lang="ts">
	import type { Attribute } from "$lib/model/CharacterWithDetails";
	import { Table, tableMapperValues } from "@skeletonlabs/skeleton";

    export let attributes: Attribute[];

    $: attributesTable = {
        head: ['Name', 'Current Level', 'Initial Level'],
        body: tableMapperValues(attributes, ['Name', 'CurrentLevel', 'InitialLevel'])
    };
</script>

<div class="card">
    <div class="text-center card-header">
        <h3>Attributes</h3>
    </div>
    <Table class="max-h-30" source={attributesTable} />
</div>