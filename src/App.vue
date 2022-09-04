<template>
    <div>
        这是App根组件,深度是{{deep}}
    </div>
</template>
<script>
import {ref} from 'vue';
export default {
    setup(props) {
        let deep = ref(1);

        return {
            deep
        }
    }
}
</script>