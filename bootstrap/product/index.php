<?php require '../layout/head.php'; ?>
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" rel="stylesheet" />
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

    }
</style>

<div id="page-container">
    <?php include "../components/sidenav.php" ?>
    <div id="mid-section" class="content">
        <div class="container-fluid">
            <div class="row" style="margin-top:90px; margin-left:30px">
                <div class="col-12">
                    <h1 class="text-dark fs-5 fw-bold">Product</h1>
                    <input type="text" style="margin-bottom:2rem;width:300px" class="form-control"
                        aria-describedby="emailHelp" placeholder="Enter the title">
                    <h1 class="text-dark fs-5 fw-bold">Product Description</h1>
                    <div id="editor" class="text-dark" style="height:200px; margin-bottom:2rem;">
                    </div>
                    <h1 class="text-dark fs-5 fw-bold">Product Image</h1>
                        <label class="text-danger" for="exampleFormControlFile1">Click To Upload</label>
                        <input type="file" class="form-control-file" id="exampleFormControlFile1">
                </div>
            </div>
        </div>

        <!-- Include the Quill library -->
        <script src="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.js"></script>

        <!-- Initialize Quill editor -->
        <script>

            const sideNav = document.getElementById("side-nav")
            const bar = document.getElementById("bar")
            const content = document.querySelector('.content');

            bar.addEventListener("click", function () {
                content.classList.toggle("shifted")
                sideNav.classList.toggle("hidden")
            })

            const quill = new Quill('#editor', {
                theme: 'snow'
            });
        </script>
    </div>
</div>




<?php require '../layout/foot.php'; ?>