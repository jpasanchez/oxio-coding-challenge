<template>
  <div class="about">
		<BarChart
			:loaded="loaded"
			:chart-data="chartData"
		/>
	</div>
</template>

<script>
import BarChart from '@/components/BarChart'
import { mapState, mapActions } from 'vuex'

export default {
	name: 'AboutView',
	components: {
		BarChart
	},
	created () {
		this.$store.dispatch('posts/getAllPosts')
	},
	methods: {
		setPost(posts) {
			this.posts = posts;
			this.loaded = true;
		},
		setError(err) {
			this.error = err.toString();
		},
	},
	computed: {
		chartData() {
			return {
				labels: this.uniqueUserIds,
				datasets: [
					{
						label: 'Total words by user',
						backgroundColor: '#87fac8',
						data: this.cumulatedWordsByUser,
					}
				]
			}
		},
		uniqueUserIds() {
			return [...new Set(this.posts.map(item => item.userId))]
		},
		cumulatedWordsByUser() {
			const newDataArr = [];

			this.uniqueUserIds.forEach((userId) => {
				const result = this.posts.filter((item) => item.userId === userId);
				const initialValue = 0;
				const sumWithInitial = result.reduce(
					(accumulator, currentValue) => accumulator + currentValue.body.length,
					initialValue,
				);
				newDataArr.push(sumWithInitial);
			})

			return newDataArr;
		},
		...mapState({
			posts: state => state.posts.all,
			loaded: state => state.posts.loaded
		})
	},
}

</script>
