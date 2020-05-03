<template>
  <div>
    <!-- قائمة التصفح العليا -->
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item "><a href="#">لوحة التحكم</a></li>
      <li class="breadcrumb-item active"><a href="#">المنتجات</a></li>
    </ul>
    <!-- نهاية قائمة التصفح العليا -->
    <div class="content-block">
      <div class="card">
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 col-sm-12">
              <div class="product-view">
                <div class="proimage-wrap">
                  <div class="pro-image" id="pro_popup">
                    <a href="/images/product-01.jpg">
                      <img
                        class="img-fluid"
                        src="/images/product-01.jpg"
                        alt="Product Image"
                      />
                    </a>
                  </div>
                  <ul class="proimage-thumb">
                    <li>
                      <a href="/images/product-01.jpg"
                        ><img src="/images/product-01.jpg" alt="Product Image"
                      /></a>
                    </li>
                    <li>
                      <a href="/images/product-01.jpg"
                        ><img src="/images/product-01.jpg" alt="Product Image"
                      /></a>
                    </li>
                    <li>
                      <a href="/images/product-01.jpg"
                        ><img src="/images/product-01.jpg" alt="Product Image"
                      /></a>
                    </li>
                    <li>
                      <a href="/images/product-01.jpg"
                        ><img src="/images/product-01.jpg" alt="Product Image"
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-12">
              <div class="product-info">
                <h2>ماك بوك برو</h2>
                <p class="mb-0">الشركة المصنعة : ابل</p>
                <p class="mb-0">فرع المزة</p>
                <p class="product_price">$5528</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Product"
};
</script>
