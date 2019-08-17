<script>
import {
    Loading
} from 'element-ui';

export default {
    name: 'Loading',
    data(){
        return {
            instance: ''
        }
    },
    mounted(){
        this.instance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    },
    destroyed(){
        this.instance.close();
    }
}
</script>
