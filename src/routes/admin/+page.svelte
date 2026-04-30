<script>
	import { onMount } from 'svelte';

	let users = $state([]);
	let message = $state("");
	let searchTerm = $state("");

	let filteredUsers = $derived(
		users.filter(user => 
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
			user.email.toLowerCase().includes(searchTerm.toLowerCase())
		)
	);

	async function loadUsers() {
		try {
			const res = await fetch('http://localhost:3001/check');
			const data = await res.json();
			users = data;
		} catch (error) {
			console.error("Backend unreachable");
		}
	}

	async function deleteUser(id) {
		if (!confirm("Remove this member?")) return;
		const res = await fetch(`http://localhost:3001/delete-user/${id}`, { method: 'DELETE' });
		const data = await res.json();
		if (data.success) {
			message = "Member deleted.";
			loadUsers(); 
		}
	}

	async function updateMembership(id, membership) {
		const res = await fetch(`http://localhost:3001/update-membership/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ membership })
		});
		const data = await res.json();
		if (data.success) {
			message = "Membership updated.";
			loadUsers();
		}
	}

	onMount(loadUsers);
</script>

<div class="container-fluid">
	<div class="mt-4 col-md-8">
		<div class="row align-items-center">
			<div class="col-md-6">
				<h2 class="fw-bold"><i class="bi bi-shield-lock-fill me-2"></i>Admin</h2>
			</div>
			<div class="mt-4">
				<p>Member Database Management</p>
			</div>
		</div>
	</div>

	<div class="mt-4 col-md-6">
		<div class="input-group shadow-sm border rounded">
			<span class="input-group-text bg-white border-0">
				<i class="bi bi-search"></i>
			</span>
			<input 
				type="text" 
				class="form-control border-0" 
				placeholder="Search by name or email..." 
				bind:value={searchTerm} 
			/>
		</div>
	</div>

	{#if message}
		<div class="alert alert-info col-md-8 mt-3">{message}</div>
	{/if}

	<div class="mt-5 col-md-10">
		<div class="card shadow-sm border-0">
			<div class="card-header bg-dark text-white py-3">
				<b>System Users ({filteredUsers.length})</b>
			</div>
			<div class="card-body p-0">
				<table class="table table-hover mb-0">
					<thead>
						<tr>
							<th class="ps-3 text-muted small">ID</th>
							<th class="text-muted small">NAME</th>
							<th class="text-muted small">EMAIL</th>
							<th class="text-muted small">MEMBERSHIP</th>
							<th class="text-end pe-4 text-muted small">ACTIONS</th>
						</tr>
					</thead>

					<tbody>
						{#each filteredUsers as user}
							<tr>
								<td class="ps-3 text-muted">{user.id}</td>
								<td><b>{user.name}</b></td>
								<td>{user.email}</td>
								<td>
									<select
										class="form-select form-select-sm"
										onchange={(e) => updateMembership(user.id, e.target.value)}
									>
										<option value="basic" selected={user.membership === "basic"}>Basic</option>
										<option value="pro" selected={user.membership === "pro"}>Pro</option>
										<option value="premium" selected={user.membership === "premium"}>Premium</option>
									</select>
								</td>
								<td class="text-end pe-4">
									<button class="btn btn-outline-danger btn-sm" onclick={() => deleteUser(user.id)}>
										Remove
									</button>
								</td>
							</tr>
						{/each}
						{#if filteredUsers.length === 0}
							<tr>
								<td colspan="5" class="text-center py-4 text-muted">No members found matching your search.</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
		
		<div class="mt-4 mb-5">
			<button class="btn btn-primary px-4" onclick={loadUsers}>
				<i class="bi bi-arrow-clockwise me-1"></i>Refresh List
			</button>
		</div>
	</div>
</div>

<style>
	h2 { font-weight: 700; }
	.container-fluid { margin-bottom: 100px; }
</style>
