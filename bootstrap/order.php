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

    @media screen and (max-width: 650px) {
        #user-table {
            font-size: small;
        }
    }

    @media screen and (max-width: 650px) {
        #user-table {
            font-size: smaller;
        }
    }
</style>

<div id="page-container">
<?php include "components/sidenav.php" ?>
<div id="mid-section" class="content">
<div class="row text-dark" style="margin:50px 0 0 40px; padding:20px 20px" >
<h1>Orders</h1>
<table id="user-table" class="text-dark" cellpadding="5" >
    <tr class="bg-dark text-light" >
        <th>ID</th>
        <th>Date</th>
        <th>Product</th>
        <th>Quantity</th>
        <th>Ordered By</th>
    </tr>
</table>
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

    async function fetchAndDisplayCarts() {
        try {
            const cartResponse = await fetch('https://fakestoreapi.com/carts');
            const carts = await cartResponse.json();

            const userResponse = await fetch('https://fakestoreapi.com/users');
            const users = await userResponse.json();
            const userMap = users.reduce((map, user) => {
                map[user.id] = `${user.name.firstname} ${user.name.lastname}`;
                return map;
            }, {});

            const productResponse = await fetch('https://fakestoreapi.com/products');
            const products = await productResponse.json();
            const productMap = products.reduce((map, product) => {
                map[product.id] = product.title;
                return map;
            }, {});

            const table = document.getElementById('user-table');

            carts.forEach(cart => {
                cart.products.forEach(product => {
                    const row = document.createElement('tr');
                    row.style.borderBottom="1px solid #dee2e6"
                    row.innerHTML = `
                        <td>${cart.id}</td>
                        <td>${new Date(cart.date).toLocaleDateString()}</td>
                        <td>${productMap[product.productId]}</td>
                        <td>${product.quantity}</td>
                        <td>${userMap[cart.userId]}</td>
                    `;

                    table.appendChild(row);
                });
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Fetch and display carts when the page loads
    window.onload = fetchAndDisplayCarts;
</script>
