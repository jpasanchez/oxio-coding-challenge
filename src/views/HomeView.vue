<template>
  <div class="home">
		<div class="sorting-table">
			<div class="sorting-table__table">
				<VTable
					:data="posts"
					:page-size="10"
					v-model:currentPage="currentPage"
					@totalPagesChanged="totalPages = $event"
					border="0"
					cellspacing="0"
					cellpadding="0"
				>
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

			<div class="sorting-table__pagination">
				<VTPagination
					v-model:currentPage="currentPage"
					:total-pages="totalPages"
					:boundary-links="true"
				/>
			</div>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  data: () => ({
    error: null,
		loading: true,
		totalPages: 1,
		currentPage: 1
  }),
	created () {
		this.$store.dispatch('posts/getAllPosts')
	},
  methods: {
		bodyLength(row) {
			return row.body.length;
		}
  },
	computed: mapState({
		posts: state => state.posts.all
	}),
}
</script>
<style lang="scss">
.home {
	@media screen and (max-width: 767px) {
		padding: 20px;
	}
}

.sorting-table__table {
	display: flex;
	justify-content: center;
	font-size: 17px;

	@media screen and (max-width: 767px) {
		display: block;
		overflow-x: auto;
	}
}

.sorting-table__pagination {
	margin-top: 20px;
}

.v-table {
	thead {
		display: block;
		margin-bottom: 20px;

		@media screen and (min-width: 768px) {
			margin-bottom: 30px;
		}
	}

	tbody {
		display: grid;
		gap: 20px;
	}

	.v-th {
		font-family: oxio-sans-serif;
		display: inline-block;

		svg {
			margin-left: 5px;
			transform: translateY(2px);
		}
	}

	tr {
		display: inline-grid;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		width: 100%;
		align-items: center;

		@media screen and (min-width: 1200px) {
			gap: 20px;
		}
	}

	@media screen and (max-width: 767px) {
		tr {
			grid-template-columns: 75px 300px 300px;
		}
	}

	@media screen and (min-width: 768px) {
		width: 90%;

		tr {
			grid-template-columns: 0.5fr 1fr 1fr;
		}
	}

	@media screen and (min-width: 1200px) {
		width: 75%;

		tr {
			grid-template-columns: 0.5fr 0.75fr 1fr;
		}
	}
}

.pagination {
	list-style-type: none;
	display: inline-grid;
	padding: 0;
	grid-auto-flow: column;
	margin: 0;
	gap: 8px;
}

.vt-pagination {
	padding: 30px;
	color: $oxio-green;

	.page-item {
		a {
			font-size: 18px;
			color: #ffffff;
			text-decoration: none;

			&:hover, &:active {
				text-decoration: underline;
			}
		}

		&.active a {
			color: $oxio-green;
			text-decoration: underline;
		}
	}

	.page-item, .page-link {
		display: inline-flex;
	}

	.page-link {
		align-items: center;
	}
}
</style>
