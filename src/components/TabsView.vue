<template>
    <article>
        <header class="tabs">
            <ul class="flex gap-4" >
                <li v-for="(tab, index) in tabs" :key="index">
                    <div class="nav-item" 
                :class="{'is-active': tab.isActive}"
                @click="selectTab(tab)"
                >
                    {{ tab.name }} 
                </div>
                </li>
            </ul>
        </header>
        <section class="tabs-details">
            <slot>

            </slot>
        </section>
    </article>
</template>

<script >
// import { defineComponent } from "vue";
export default {
    data: () => {
        return {
            tabs: []
        }
    },
    methods: {
        selectTab(selectTab) {
            this.tabs.forEach(tab => {
                tab.isActive = tab.name === selectTab.name
            });
        }
    },
    created() {
        this.tabs = this.$children;
    }
      
}
</script>