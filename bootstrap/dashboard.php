<?php require 'layout/head.php'; ?>

<style>
    #page-container {
        height: 100vh;
        color: white;
        position: relative;
        display: flex;
        flex-direction: column;
    }
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

    #last-section {
        /* padding: 40px 40px 0 40px; */
    }
    #mid-section #mid-header{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        flex-wrap: wrap;
    }
    .card{
        min-width: 300px;
    }

    @media screen and (max-width:850px) {
        #mid-section #mid-mid{
            display: none;
        }
    } 
    @media screen and (max-width:920px) {
        #infoTable{
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
                    <div class="card shadow bg-success text-light mb-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Daily Visitors</h5>
                            <h6 class="card-subtitle mb-2 text-muted fs-1"><i
                                    class="fa-solid text-light fa-building-columns"></i></h6>
                            <p class="card-text text-light fw-bolder">4,560</p>
                        </div>
                    </div>

                    <div class="card shadow bg-primary text-light mb-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Total Orders</h5>
                            <h6 class="card-subtitle mb-2 text-muted fs-1"><i
                                    class="fa-brands text-light fa-first-order"></i></h6>
                            <p class="card-text text-light fw-bolder">4,560</p>
                        </div>
                    </div>

                    <div class="card shadow bg-warning text-light mb-2" style="width: 18rem;">
                        <div class="card-body">
                            <h5 class="card-title">Total Sales</h5>
                            <h6 class="card-subtitle mb-2 text-muted fs-1"><i
                                    class="fa-solid text-light fa-cart-shopping"></i></i></h6>
                            <p class="card-text text-light fw-bolder">$7,592</p>
                        </div>
                    </div>
                </div>
                <div id="mid-mid">
                    <canvas id="myLineChart"></canvas>
                </div>
            </div>
            <div id="last-section" class="mt-2 col-12 col-md-4 text-dark">
                <h1 class="fs-6 fw-bolder">Recent Orders</h1>
                <table id="infoTable" cellpadding="5" style="width:100%;">
                    <tr style="background-color:black; color:white;">
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th>
                    </tr>
                    <tr style="background-color:white;">
                        <td>1</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;">
                        <td>2</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;">
                        <td>3</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;">
                        <td>4</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;">
                        <td>5</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;">
                        <td>6</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;">
                        <td>7</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;">
                        <td>8</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;">
                        <td>9</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;">
                        <td>10</td>
                        <td><img style="border-radius:100%; object-fit:cover;" width="20px" height="20px"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s"
                                alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</div>
</div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const sideNav = document.getElementById("side-nav");
    const bar = document.getElementById("bar");
    const content = document.querySelector('.content');

    function toggleNav() {
        content.classList.toggle("shifted");
        sideNav.classList.toggle("hidden");
    }

    function checkScreenWidth() {
        if (window.innerWidth <= 878) {
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
    bar.addEventListener("click", toggleNav);
    window.addEventListener("resize", checkScreenWidth);
    window.addEventListener("load", checkScreenWidth);

    

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Month'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    };

    const myLineChart = new Chart(
        document.getElementById('myLineChart'),
        config
    );
</script>


<?php require 'layout/foot.php'; ?>
