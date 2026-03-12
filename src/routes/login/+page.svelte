<script lang="ts">
    export let form;
</script>

<div class="login-container">
    <h1>YoYo Trick Tracker - Login</h1>
    <form method="POST">
        <div class="field">
            <label for="username">Username</label>
            <input type="text" name="username" id="username" required />
        </div>
        <div class="field">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" required />
        </div>
        {#if form?.error}
            <p class="error">{form.error}</p>
        {/if}
        <button type="submit">Login</button>
    </form>
</div>

<style>
    .login-container {
        max-width: 400px;
        margin: 50px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
    }
    .field {
        margin-bottom: 15px;
    }
    label {
        display: block;
        margin-bottom: 5px;
    }
    input {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
    }
    .error {
        color: red;
    }
    button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>
