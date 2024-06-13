<?php require 'layout/head.php'; ?>

<style>
    /* Page container styles */
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

    #mid-section {
        padding: 42px 42px 0 40px;
    }

    /* Last section styles */
    #last-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        gap: 2rem;
    }

    /* Mid section header styles */
    #mid-section #mid-header {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }

    .card {
        min-width: 300px;
    }

    .data-row {
        border-bottom: 1px solid #dee2e6;
    }

    /* Top sales styles */
    .top-sales-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        border-bottom: 1px solid red;
        /* border-right: 1px solid red; */
        margin-bottom: 2rem;
    }

    .top-sales-item img {
        width: 50px;
        height: auto;
        margin-bottom: 2rem;
    }

    /* Responsive table styles */
    @media screen and (max-width: 850px) {
        .table-data {
            font-size: 12px;
            font-family: 500;
        }
    }

    @media screen and (max-width: 494px) {
        #productDetails {
            transform: translateX(-20px);
        }

        .productTitle {
            font-size: smaller;
        }

        .table-desc {
            overflow: hidden !important;
            display: -webkit-box !important;
            -webkit-line-clamp: 2 !important;
            -webkit-box-orient: vertical !important;
        }

        #table-img {
            transform: scale(0.8);
        }
    }

    @media screen and (max-width: 920px) {
        #infoTable {
            font-size: smaller;
        }
    }
</style>

<div id="page-container">
    <?php include "components/sidenav.php" ?>
    <div id="mid-section" class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12 col-md-8">
                    <div id="mid-header" class="container-fluid">
                        <!-- Cards Section -->
                        <div class="card shadow bg-success text-light mb-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Daily Visitors</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1">
                                    <i class="fa-solid text-light fa-building-columns"></i>
                                </h6>
                                <p class="card-text text-light fw-bolder">4,560</p>
                            </div>
                        </div>

                        <div class="card shadow bg-primary text-light mb-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Total Orders</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1">
                                    <i class="fa-brands text-light fa-first-order"></i>
                                </h6>
                                <p class="card-text text-light fw-bolder">4,560</p>
                            </div>
                        </div>

                        <div class="card shadow bg-warning text-light mb-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Total Sales</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1">
                                    <i class="fa-solid text-light fa-cart-shopping"></i>
                                </h6>
                                <p class="card-text text-light fw-bolder">$7,592</p>
                            </div>
                        </div>
                    </div>
                    <!-- Product Details Section -->
                    <div class="text-dark" id="mid-mid">
                        <h1 class="mt-4 productTitle">Product Details</h1>
                        <table style="width: 95%;" id="productDetails">
                            <tr>
                                <th class="bg-dark text-light" style="padding: 15px;">S.N</th>
                                <th class="bg-dark text-light" style="padding: 15px;">Name</th>
                                <th class="bg-dark text-light" style="padding: 15px;">Price</th>
                                <th class="bg-dark text-light" style="padding: 15px;">Image</th>
                                <th class="bg-dark text-light" style="padding: 15px;">Sales</th>
                            </tr>
                        </table>
                    </div>
                </div>
                <div id="last-section" class="mt-2 col-12 col-md-4 text-dark">
                    <h1 class="text-success" id="topSales">Top Sales</h1>
                    <div id="sales-container">
                        <!-- Top sales content will be dynamically injected here -->
                    </div>

                    <h1 class="fs-4 fw-bolder" >
                        <a style="text-decoration:none;" href="http://localhost:5500/product/index.php">
                            Upload New Product
                        </a>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- JavaScript Section -->
<script>
    const sideNav = document.getElementById("side-nav");
    const bar = document.getElementById("bar");
    const content = document.querySelector('.content');

    function checkScreenWidth() {
        if (window.innerWidth <= 878) {
            console.log("Working!");
            if (!sideNav.classList.contains("hidden")) {
                sideNav.classList.add("hidden");
                content.classList.add("shifted");
            }
        } else {
            if (sideNav.classList.contains("hidden")) {
                sideNav.classList.remove("hidden");
                content.classList.remove("shifted");
            }
        }
    }

    checkScreenWidth();

    bar.addEventListener("click", function () {
        content.classList.toggle("shifted");
        sideNav.classList.toggle("hidden");
    });

    async function getData() {
        try {
            const response = await fetch('https://fakestoreapi.com/products?limit=10');
            const data = await response.json();
            const productDetails = document.getElementById("productDetails");
            const salesContainer = document.querySelector("#sales-container");

            data.forEach((item, index) => {
                const row = document.createElement("tr");
                row.classList.add('data-row');
                row.innerHTML = `
                    <td class="table-data" style="padding: 15px;">${index + 1}</td>
                    <td class="table-data table-desc" style="padding: 15px;">${item.title}</td>
                    <td class="table-data text-danger" style="padding: 15px;">$${item.price}</td>
                    <td id="table-img" class="table-data" style="padding: 15px;">
                        <img src="${item.image}" alt="${item.title}" style="width: 50px; height: auto;">
                    </td>
                    <td class="table-data" style="padding: 15px;">${item.rating.count}</td>
                `;
                productDetails.appendChild(row);

                // Append top sales products
                if (item.rating.count > 400) {
                    const salesItem = document.createElement("div");
                    salesItem.classList.add("top-sales-item");
                    salesItem.innerHTML = `
                        <img src="${item.image}" alt="${item.title}">
                        <div>
                            <h2 style="max-width:200px; text-align:center;" class="fs-6 fw-bolder" >${item.title}</h2>
                            <p>Sales: ${item.rating.count}</p>
                        </div>
                    `;
                    salesContainer.appendChild(salesItem);
                }
            });

            if (response.ok) {
                console.log("Fetched");
            } else {
                console.log("Something went wrong!");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    getData();
</script>

<?php require 'layout/foot.php'; ?>