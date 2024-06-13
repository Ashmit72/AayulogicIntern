<?php require 'layout/head.php'; ?>

<style>
    #page-container {
        height: 100vh;
        color: white;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    /* Content area styles */
    .content {
        margin-left: 250px;
        transition: margin-left 250ms ease-in-out;
    }

    .content.shifted {
        margin-left: 0;
    }

    @media screen and (max-width:650px) {
        #user-table{
            font-size: small;
        }
    }
    @media screen and (max-width:650px) {
        #user-table{
            font-size: smaller;
        }
    }
</style>

<div id="page-container">
<?php include "components/sidenav.php" ?>
<div id="mid-section" class="content">
<div class="row text-dark" style="margin:50px 0 0 40px; padding:20px 20px" >
<h1>Users</h1>
<table id="user-table" class="text-dark" cellpadding="5" >
    <tr class="bg-dark text-light" >
        <th>ID</th>
        <th>Firstname</th>
        <th>Lastname</th>
        <th>Email</th>
        <th>Address</th>
    </tr>
</table>
</div>
</div>
</div>
<?php require 'layout/foot.php'; ?>

<script>
    const sideNav = document.getElementById("side-nav")
    const bar = document.getElementById("bar")
    const content = document.querySelector('.content');

    bar.addEventListener("click", function () {
        content.classList.toggle("shifted")
        sideNav.classList.toggle("hidden")
    });

    // Function to fetch and append user data to the table
    async function fetchAndDisplayUsers() {
        try {
            const response = await fetch('https://fakestoreapi.com/users');
            const users = await response.json();

            const table = document.getElementById('user-table');

            users.forEach(user => {
                const row = document.createElement('tr');
                   row.style.borderBottom="1px solid #dee2e6"
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.name.firstname}</td>
                    <td>${user.name.lastname}</td>
                    <td>${user.email}</td>
                    <td>${user.address.street}, ${user.address.city}</td>
                `;

                table.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }

    // Fetch and display users when the page loads
    window.onload = fetchAndDisplayUsers;
</script>
