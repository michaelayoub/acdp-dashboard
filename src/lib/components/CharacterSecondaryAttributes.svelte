<script lang="ts">
	import type { Attribute2nd } from "$lib/model/CharacterWithDetails";
	import { Table, tableMapperValues, type TableSource } from "@skeletonlabs/skeleton";

    export let attributes2nd: Attribute2nd[];

    $: attributes2ndTable = {
        head: ['Name', 'Current Base Maximum', 'Realtime Value'],
        body: tableMapperValues(attributes2nd, ['Name', 'CurrentLevel', 'CurrentLevelWithEnchantments'])
    }
</script>

<div class="card">
    <div class="text-center card-header">
        <h3>Vitals</h3>
    </div>
    <Table source={attributes2ndTable} />
</div>
