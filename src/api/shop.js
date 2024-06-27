import posts from '@/assets/json/posts.json'

export default {
  async getPosts () {
    await wait(100);
    return posts;
  },
}

function wait (ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}
