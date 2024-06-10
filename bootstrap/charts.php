<?php require 'layout/head.php'; ?>

<style>
    #page-container {
        height: 100vh;
        /* overflow: hidden; */
        color: white;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    #side-nav {
        height: 100vh;
        min-width: 250px;
        display: flex;
        align-items: flex-start;
        padding: 0 2rem;
        justify-content: space-evenly;
        flex-direction: column;
        transition: transform 250ms ease-in-out;
        z-index: 1000;
        background-color: #343a40;
        position: fixed;
        top: 0;
        left: 0;
        transform: translateX(0);
    }

    #side-nav.hidden {
        transform: translateX(-100%);
    }

    #side-nav .items {
        list-style-type: none;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 2rem;
        flex-direction: column;
        color: #6e787d;
        width: 100%;
    }

    #side-nav .dashboard {
        color: white;
    }

    #side-nav .items .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        cursor: pointer;
        transition: 250ms all linear;
    }

    #side-nav .items .item:hover {
        color: white;
    }

    #side-nav .logout {
        color: #6e787d;
        cursor: pointer;
    }

    #side-nav .logout:hover {
        transition: 250ms all linear;
        color: white;
    }

    #bar {
        position: fixed;
        top: 2rem;
        left: 1rem;
        cursor: pointer;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 50px;
        width: 50px;
        transition: 250ms all linear;
        z-index: 1001;
        background-color: #343a40;
    }

    #bar:hover {
        background-color: #63656f;
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
</style>

<div id="page-container">
    <div id="side-nav" class="bg-dark">
        <!-- Sidebar content -->
        <ul class="items">
            <li class="item dashboard"><i class="fa-solid fa-table-columns"></i> <span>Dashboard</span></li>
            <li class="item product"><i class="fa-solid fa-shop"></i> <span>Product</span></li>
            <li class="item orders"><i class="fa-brands fa-jedi-order"></i> <span>Orders</span></li>
            <li class="item customers"><i class="fa-solid fa-user"></i> <span>Customers</span></li>
            <li class="item revenue"><i class="fa-solid fa-chart-simple"></i> <span>Revenue</span></li>
            <li class="item settings"><i class="fa-solid fa-gear"></i> <span>Settings</span></li>
        </ul>
        <p class="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
    </div>
    <div id="bar" class="bg-dark">
        <i class="fa-solid fa-bars"></i>
    </div>
    <div id="mid-section" class="content">
        <div class="container-fluid">
            <div class="row">
                <div id="mid-section" class="col-12 col-md-8">
                    <div id="mid-header" class="container-fluid">
                        <div class="card shadow bg-success text-light mb-2" style="width: 18rem;">
                            <div class="card-body">
                                <h5 class="card-title">Daily Visitors</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1"><i class="fa-solid text-light fa-building-columns"></i></h6>
                                <p class="card-text text-light fw-bolder">4,560</p>
                            </div>
                        </div>

                        <div class="card shadow bg-primary text-light mb-2" style="width: 18rem;">
                        <div class="card-body">
                                <h5 class="card-title">Total Orders</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1"><i class="fa-brands text-light fa-first-order"></i></h6>
                                <p class="card-text text-light fw-bolder">4,560</p>
                            </div>
                        </div>

                        <div class="card shadow bg-warning text-light mb-2" style="width: 18rem;">
                        <div class="card-body">
                                <h5 class="card-title">Total Sales</h5>
                                <h6 class="card-subtitle mb-2 text-muted fs-1"><i class="fa-solid text-light fa-cart-shopping"></i></i></h6>
                                <p class="card-text text-light fw-bolder">$7,592</p>
                            </div>
                        </div>
                    </div>
                    <div id="mid-mid">
                        <canvas id="myLineChart"></canvas>
                    </div>
                </div>
                <div id="last-section" class="mt-2 col-12 col-md-4 text-dark">
                    <h1 class="fs-6 fw-bolder" >Recent Orders</h1>
                   <table cellpadding="5" style="width:100%;"  >
                    <tr  style="background-color:black; color:white;" >
                        <th>ID</th>
                        <th>Name</th>
                        <th>Date</th> 
                    </tr>
                    <tr style="background-color:white;" >
                        <td>1</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;" >
                        <td>2</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;" >
                        <td>3</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;" >
                        <td>4</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;" >
                        <td>5</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;" >
                        <td>6</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;" >
                        <td>7</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;" >
                        <td>8</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:white;" >
                        <td>9</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
                        <td>2024-05-06</td>
                    </tr>
                    <tr style="background-color:#F5F5F5;" >
                        <td>10</td>
                        <td><img style="border-radius:100%; object-fit:cover;"  width="20px" height="20px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTf7ZifwIhPZ-WBlWTpTb4MnUQY_1IELLZfw&s" alt="photo">Steven Gerrad</td>
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
    const bar = document.getElementById('bar');
    const sideNav = document.getElementById('side-nav');
    const content = document.querySelector('.content');

    function toggle() {
        sideNav.classList.toggle('hidden');
        content.classList.toggle('shifted');
    }

    bar.addEventListener('click', toggle);

    // Data for the line chart
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

    // Configuration for the line chart
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

    // Render the line chart
    const myLineChart = new Chart(
        document.getElementById('myLineChart'),
        config
    );
</script>

<?php require 'layout/foot.php'; ?>
