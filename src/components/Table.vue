<template>
    <table class="table table-striped">
        <thead>
            <tr>
               <th v-for="(obj, ind) in config" :key="ind">
                        {{ obj.title }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, index) in theData" :key="index">
                <td v-for="(obj, ind) in config" :key="ind">
                    <span v-if="obj.type === 'text' && !obj.nested">{{row[obj.key]}}</span>
                    <span v-if="obj.type === 'text' && obj.nested && obj.nestedKey != ''">{{row[obj.key].obj.nestedKey}}</span>
                    
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Table",
    props: ['theData', 'config'],

}
</script>