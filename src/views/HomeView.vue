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

		<div class="post-form">
			<form v-on:submit.prevent="validateForm">
				<div class="success-message" :class="{ 'success' : validUserId === true }">Success</div>

				<p>Add post</p>
				<div class="form-field userid" :class="{ 'error' : validUserId === false }">
					<div>User Id:</div>
					<input type="text" required v-model="userId">
					<div class="error-message" :class="{ 'has-errors' : validUserId === false }">Please enter number</div>
				</div>
				<div class="form-field post-title">
					<div>Post Title</div>
					<input type="text" required v-model="postTitle">
				</div>
				<div class="form-field post-body">
					<textarea v-model="postBody" placeholder="post body"></textarea>
				</div>

				<button type="submit">Add post</button>
			</form>
		</div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HomeView',
  data: () => ({
		message: null,
    error: null,
		loading: true,
		totalPages: 1,
		currentPage: 1,
		userId: null,
		postTitle: null,
		postBody: null,
		validUserId: null,
  }),
	created () {
		this.$store.dispatch('posts/getAllPosts')
	},
  methods: {
		validateForm() {
			const userIdRegExp = /^[1-9]+$/;
			this.validUserId = userIdRegExp.test(this.userId);

			if (this.validUserId) {
				this.addItem();
			}
		},
		bodyLength(row) {
			return row.body.length;
		},
		addItem() {
			let post = {
				userId: this.userId,
				title: this.postTitle,
				body: this.postBody
			}

			this.addNewPost(post);
			this.userId = null
			this.postTitle = null
			this.postBody = null
		},
		...mapActions('posts', [
			'addNewPost'
		]),
  },
	computed: mapState({
		posts: state => state.posts.all
	}),
}
</script>
<style lang="scss">
.error-message {
	display: none;

	&.has-errors {
		display: block;
	}
}

.form-field.error {
	input {
		background: red;
	}
}

.error-message {
	color: red;
}

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
		text-align: center;
	}

	.v-th {
		font-family: oxio-sans-serif;
		display: inline-block;

		&:hover {
			cursor: pointer;
		}

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

	td {
		word-break: break-all;
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
	text-align: center;

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

.success-message {
	display: none;

	&.success {
		display: block;
	}
}

.post-form {
	display: flex;
	justify-content: center;

	form {
		@media screen and (min-width: 768px) {
			width: 25%;
		}
	}

	textarea {
		width: 100%;
		height: 200px;
	}
}

.form-field {
	display: flex;
	margin-top: 10px;

	> div {
		margin-right: 20px;
	}

	input {
		flex: 1;
	}
}


</style>
