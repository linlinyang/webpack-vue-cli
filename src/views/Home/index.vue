<template>
    <div class="home">
        <p>{{ welcome }}</p>

        <Table
            :data="datas.data"
            :class="styles['home-table']"
        >
            <TableColumn
                v-for="(item,key) in columns"
                :key="key"
                v-bind="{...item}"
            ></TableColumn>
        </Table>
        
        <div :class="styles.icons">
            <div :class="[styles.item,styles.friends]"></div>
            <div :class="[styles.item,styles.qq]"></div>
            <div :class="[styles.item,styles.wechat]"></div>
        </div>
    </div>
</template>

<script>
import model from './model';
import {
    Table,
    TableColumn
} from 'element-ui';
import columns from './columns';
import styles from './index.module.scss';

export default {
    name: 'Home',
    components: {
        Table,
        TableColumn
    },
    data(){
        return {
            columns,
            styles
        }
    },
    mixins: [model]
};
</script>
