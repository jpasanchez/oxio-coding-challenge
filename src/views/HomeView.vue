<template>
  <div class="home">
    <VTable
				:data="posts">
      <template #head>
        <tr>
					<VTh sortKey="userId" defaultSort="desc">User Id</VTh>
					<VTh sortKey="title">Title</VTh>
					<VTh :sortKey="bodyLength">Body</VTh>
        </tr>
      </template>
      <template #body="{rows}">
        <tr v-for="row in rows" :key="row.id">
          <td>{{ row.userId }}</td>
          <td>{{ row.title }}</td>
          <td>{{ row.body }}</td>
        </tr>
      </template>
    </VTable>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { ref, nextTick } from 'vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data: () => ({
    error: null,
		loading: true,
		posts: [],
  }),
  async beforeRouteEnter(to, from, next) {
    try {
      await fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((json) => next(vm => vm.setPost(json)));
    } catch (err) {
      next(vm => vm.setError(err));
    }
  },
  mounted() {
	},
	computed: {
	},
  methods: {
    setPost(posts) {
      this.posts = posts;
			this.loading = false;
    },
    setError(err) {
      this.error = err.toString();
    },
		bodyLength(row) {
			return row.body.length;
		}
  }
}
</script>
