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

    /* #side-nav .dashboard {
        color: white;
    } */

    #side-nav .items .item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 1rem;
        cursor: pointer;
        transition: 250ms all linear;
    }

    #side-nav .items a {
        color: inherit;
        text-decoration: none;
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
    #dropDown{
        display: block;
    }
    #dropDown.active{
        display: none;
    }
    #dropDown .drop-links{
        transition: 0.5s all linear;
        /* transition: 250ms linear; */
    }
    #dropDown .drop-links:hover{
        color: #fff;
    }
  
</style>

<div id="side-nav" class="bg-dark">
    <ul class="items">
        <a href="http://localhost:5500/dashboard.php">
            <li class="item dashboard"><i class="fa-solid fa-table-columns"></i> <span>Dashboard</span></li>
        </a>
        <a  href="http://localhost:5500/product.php">
            <li class="item product"><i class="fa-solid fa-shop"></i> <span>Product</span><i class="fa-solid fa-angle-down"></i></li>
            <div style="position:relative; bottom:10px; left:35px;" id="dropDown" class="active">
            <div class="mb-3 d-flex justify-content-center">
               <a class="drop-links" href="http://localhost:5500/product/index.php">
               Add
               </a> 
            </div>
                <div class="mt-2 d-flex justify-content-center">
                    <a class="drop-links" href="http://localhost:5500/product/index.php">
                        Edit
                    </a>
                </div>
            </div>
        </a>
        <a href="http://localhost:5500/order.php">
            <li class="item orders"><i class="fa-brands fa-jedi-order"></i> <span>Orders</span></li>
        </a>
        <a href="http://localhost:5500/customers.php">
            <li class="item customers"><i class="fa-solid fa-user"></i> <span>Customers</span></li>
        </a>
        <a href="http://localhost:5500/revenue.php">
            <li class="item revenue"><i class="fa-solid fa-chart-simple"></i> <span>Revenue</span></li>
        </a>
        <a href="http://localhost:5500/settings.php">

            <li class="item settings"><i class="fa-solid fa-gear"></i> <span>Settings</span></li>
        </a>
    </ul>
    <p class="logout"><i class="fa-solid fa-right-from-bracket"></i> Logout</p>
</div>
<div id="bar" class="bg-dark">
    <i class="fa-solid fa-bars"></i>
</div>


<script>
    const activeLink = window.location.toString()
    console.log(activeLink);
    const product = document.querySelector(".product")
    const dropdown = document.querySelector(".fa-angle-down")
    const childItems=document.querySelector("#dropDown")
    console.log(childItems);
    dropdown.addEventListener('click', (event) => {
        event.preventDefault()
        console.log("toggled");
        childItems.classList.toggle('active');
    })
    switch (activeLink) {
        case "http://localhost:5500/dashboard.php":
            const dashboard = document.querySelector(".dashboard")
            dashboard.style.color = "white"
            break;
        case "http://localhost:5500/product.php":
            product.style.color = "white"
            break;
        case "http://localhost:5500/order.php":
            const order = document.querySelector(".orders")
            order.style.color = "white"
            break;
        case "http://localhost:5500/customers.php":
            const customers = document.querySelector(".customers")
            customers.style.color = "white"
            break;
        case "http://localhost:5500/revenue.php":
            const revenue = document.querySelector(".revenue")
            revenue.style.color = "white"
            break;
        case "http://localhost:5500/settings.php":
            const settings = document.querySelector(".settings")
            settings.style.color = "white"
            break;
        case "http://localhost:5500/product/index.php":
            product.style.color = "white"
            childItems.classList.toggle('active');
            break;

        default:
            break;
    }



    function toggle() {
        // sideNav.classList.toggle('hidden');
        // content.classList.toggle('shifted');
    }

    bar.addEventListener('click', toggle);
</script>