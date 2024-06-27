import posts from '@/assets/json/posts.json'

export default {
  async getPosts () {
    return await fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => json)
  },
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
