<?php require 'layout/head.php'; ?>
<?php include 'components/navbar.php'; ?>


<style>

.products-img-container{
overflow: hidden;
}

    .product-image:hover{
        transition: 1s ease-in-out;
        cursor: zoom-in;
        transform: scale(1.3);
    }
</style>

<div id="product-container" class="container mt-4">
    <div class="row gy-5">
        <div class="col-lg-6 col-12 col-sm-12 w-50 mx-auto">
            <div id="product-splide" class="splide" role="group" aria-label="Splide Basic HTML Example">
                <div class="splide__track ">
                    <ul class="splide__list">
                        <li class="splide__slide products-img-container h-100 w-100">
                            <!-- <div class="products-img-container h-100 w-100"> -->
                            <img class="h-100 w-100 product-image object-fit-cover"
                                src="https://cdn.pixabay.com/photo/2013/07/13/12/17/headphone-159569_640.png"
                                alt="Beats Studio3 Wireless Noise Cancelling Headphones">
                            <!-- </div> -->
                        </li>
                        <li class="splide__slide products-img-container h-100 w-100">
                            <!-- <div class="products-img-container h-100 w-100"> -->
                            <img class="h-100 w-100 product-image object-fit-cover"
                                src="https://cdn.pixabay.com/photo/2016/01/09/07/44/headphone-1129896_640.png"
                                alt="Beats Studio3 Wireless Noise Cancelling Headphones">
                            <!-- </div> -->
                        </li>
                        <li class="splide__slide products-img-container h-100 w-100">
                            <!-- <div class="products-img-container h-100 w-100"> -->
                            <img class="h-100 w-100 product-image object-fit-cover"
                                src="https://cdn.pixabay.com/photo/2012/04/12/20/12/headphones-30468_640.png"
                                alt="Beats Studio3 Wireless Noise Cancelling Headphones">
                            <!-- </div> -->
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-12 col-sm-12">
            <div class="row mb-3">
                <div class="col-12">
                    <h1 id="product-title" class="fw-bolder">Beats Studio3 Wireless Noise Cancelling Headphones</h1>
                </div>
            </div>
            <div class="row mb-2 pb-3 border-bottom">
                <div class="col-12">
                    <h1>$299.99</h1>
                </div>
            </div>
            <div class="row mb-3">
                <div class="col-12">
                    <p>Experience the ultimate in wireless audio with Beats Studio3 Wireless Noise Cancelling
                        Headphones. Enjoy premium sound quality, noise cancellation, and seamless connectivity.</p>
                </div>
            </div>
            <div class="row mb-2">
                <div class="col-12">
                    <button class="btn btn-primary me-2">Add to Cart</button>
                    <button class="btn btn-success">Buy Now</button>
                </div>
            </div>
        </div>
    </div>
</div>
<div id="fullpage" style="display:none;">
    <img id="fullpage-image" src="" style="max-width:100%; max-height:100vh; margin:auto; display:block;">
</div>

</script> 
<?php include 'components/footer.php'; ?>
<?php require 'layout/foot.php'; ?>
<script>

    new Splide("#product-splide", {
        type: "loop",
        perPage: 1
    }).mount();

    const productImage = document.querySelectorAll(".product-image");
    const fullpageImage = document.querySelector("#fullpage-image");
    productImage.forEach(image => {
        image.addEventListener('click', () => {
            console.log(image.src);
            fullpageImage.src = image.src;
            document.getElementById("fullpage").style.display = "block";
        });
    });
    fullpageImage.addEventListener('click', () => {
        document.getElementById("fullpage").style.display = "none";
    });
</script>