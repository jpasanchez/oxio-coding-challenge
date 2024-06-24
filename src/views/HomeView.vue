<template>
  <div class="home">
    <VTable
        v-if="posts"
        :data="posts">
      <template #head>
        <tr>
          <th>User Id</th>
          <th>Title</th>
          <th>Body</th>
        </tr>
      </template>
      <template #body="{ rows }">
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

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data: () => ({
    posts: [],
    error: null,
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
    // console.log('mounted');
  },
  methods: {
    setPost(posts) {
      this.posts = posts;
    },
    setError(err) {
      this.error = err.toString();
    }
  }
}
</script>
