<?php require 'layout/head.php'; ?>

<style>
    #page-container {
        height: 100vh;
        color: black; /* Changed to black for better readability */
        position: relative;
        display: flex;
        flex-direction: column;
        background-color: #f1f1f1;
    }
    #mid-section {}

    /* Content area styles */
    .content {
        margin-left: 250px;
        transition: margin-left 250ms ease-in-out;
    }

    .content.shifted {
        margin-left: 0;
    }

    .input-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start; /* Changed to flex-start for better alignment */
        justify-content: center;
        gap: 1rem;
        margin-bottom: 10px;
    }

    .input-section .input-title {
        font-weight: bold;
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
    }

    .input-section input,
    .input-section select {
        max-width: 400px;
    }

    .button-section {
        display: flex;
        justify-content: flex-start;
        margin-top: 20px;
    }

    .button-section button {
        max-width: 200px;
        padding: 10px 20px;
    }
</style>

<div id="page-container">
    <?php include "components/sidenav.php"; ?>
    <div id="mid-section" class="content text-dark">
        <div class="container mt-5 h-100">
            <div class="row h-100">
                <div class="col-12">
                    <h1>General Settings</h1>
                </div>
                <div class="col-12 input-section">
                    <label for="site-title" class="input-title">Site Title</label>
                    <input id="site-title" type="text" class="form-control" placeholder="Site Title">
                </div>
                <div class="col-12 input-section">
                    <label for="tagline" class="input-title">Tagline</label>
                    <input id="tagline" type="text" class="form-control" placeholder="Tagline">
                </div>
                <div class="col-12 input-section">
                    <label for="address" class="input-title">Address</label>
                    <input id="address" type="text" class="form-control" placeholder="Address">
                </div>
                <div class="col-12 input-section">
                    <label for="email" class="input-title">Email Address</label>
                    <input id="email" type="email" class="form-control" placeholder="Email Address">
                </div>
                <div class="col-12 input-section">
                    <label for="membership" class="input-title">Membership</label>
                    <input id="membership" type="checkbox" class="form-check-input">
                </div>
                <div class="col-12 input-section">
                    <label for="role" class="input-title">Role</label>
                    <select id="role" class="form-control">
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="author">Author</option>
                        <option value="contributor">Contributor</option>
                        <option value="subscriber">Subscriber</option>
                    </select>
                </div>
                <div class="col-12 input-section">
                    <label for="language" class="input-title">Language</label>
                    <select id="language" class="form-control">
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                        <option value="zh">Chinese</option>
                        <option value="jp">Japanese</option>
                    </select>
                </div>
                <div class="col-12 button-section">
                    <button class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
</div>

<?php require 'layout/foot.php'; ?>

<script>
    const sideNav = document.getElementById("side-nav");
    const bar = document.getElementById("bar");
    const content = document.querySelector('.content');

    bar.addEventListener("click", function () {
        content.classList.toggle("shifted");
        sideNav.classList.toggle("hidden");
    });
</script>
