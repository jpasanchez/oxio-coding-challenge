<template>
	<Bar
		v-if="loaded"
		id="my-chart-id"
		:options="chartOptions"
		:data="chartData"
	/>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
	name: 'BarChart',
	components: { Bar },
	props: {
		loaded: Boolean,
		chartData: Object,
	},
	data() {
		return {
			chartOptions: {
				responsive: true
			}
		}
	}

}
</script>
<style lang="scss">
.about {
	max-width: 50%;
	margin: 0 auto;
}
</style>
