<template>
  <div>
    <ul class="breadcrumb custom-breadcrumb">
      <li class="breadcrumb-item"><a href="#">لوحتي</a></li>
      <li class="breadcrumb-item active"><a href="#">لوحة التحكم</a></li>
    </ul>
    <!-- الاحصائيات السريعة-->
    <div class="row text-center quick-statics">
      <div class="col-lg-3 col-sm-6">
        <div class="content-block">
          <div>
            <i class="fa fa-users block-icon" aria-hidden="true"></i>المسجلين
            لهذا اليوم
          </div>
          <div class="number">548</div>
          <div class="note">
            <span style="color: #27ae60">33%</span> ارتفاع عن نتيجة الأمس
          </div>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="content-block green-background text-white">
          <div>
            <i class="fa fa-dollar block-icon" aria-hidden="true"></i> أرباح
            اليوم
          </div>
          <div class="number">9,480$</div>
          <div class="note text-white">3% زيادة</div>
          <i class="fa fa-dollar block-back-icon" aria-hidden="true"></i>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="content-block red-background text-white">
          <div>
            <i class="fa fa-truck block-icon" aria-hidden="true"></i>منتجات نفذ
            مخزونها
          </div>
          <div class="number">3</div>
          <div class="note">
            <a
              class="text-white font-italic"
              style="text-decoration: underline"
              href="#"
              >تصفح المنتجات</a
            >
          </div>
          <i class="fa fa-close block-back-icon" aria-hidden="true"></i>
        </div>
      </div>
      <div class="col-lg-3 col-sm-6">
        <div class="content-block">
          <div>
            <i class="fa fa-users block-icon" aria-hidden="true"></i>المسجلين في
            الموقع
          </div>
          <div class="number">72,742</div>
          <div class="note"><span style="color: #27ae60">33%</span> زيادة</div>
        </div>
      </div>
    </div>
    <!-- نهاية الاحصائيات السريعة-->

    <!--صف يحتوي العمود الأيمن والأيسر-->
    <div class="row">
      <!--العمود الأيمن-->
      <div class="col-lg-9">
        <!--عنصر احصائيات الزوار والطلبات-->
        <div class="content-block">
          <div class="block-head clearfix">
            <div class="float-right">
              <i class="fa fa-line-chart block-icon" aria-hidden="true"></i
              >احصائيات الزوار والطلبات
            </div>
            <button class="btn float-left calender-button">
              <i class="fa fa-calendar block-icon" aria-hidden="true"></i>
              <span class="hidden-xs-down">
                20 ديسمبر، 2016 - 31 ديسمبر، 2016
                <i class="fa fa-caret-down " aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <canvas id="visitorsVsSales"></canvas>
        </div>
        <!--نهاية عنصر احصائيات الزوار والطلبات-->

        <div class="row">
          <!--<div class="col-md-6">
            <div class="content-block">
              <div class="title">
                <i class="fa fa-bar-chart block-icon" aria-hidden="true"></i
                >احصائيات المنتجات
              </div>


              <ul class="nav p-0 mt-3 justify-content-center" role="tablist">
                <li class="nav-item">
                  <a
                    class="nav-link active"
                    data-toggle="tab"
                    href="#most-wanted"
                    role="tab"
                    >الأكثر طلباً</a
                  >
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    data-toggle="tab"
                    href="#most-watched"
                    role="tab"
                    >الأكثر مشاهدة</a
                  >
                </li>
              </ul>


              <div class="tab-content products-statics">
                <div class="tab-pane active" id="most-wanted" role="tabpanel">
                  <div class="tab-head">
                    <i class="fa fa-dollar"></i>
                    <i class="fa fa-shopping-cart"></i>
                  </div>
                  <ul class="last-orders list-unstyled m-0 p-0">
                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div class="tab-pane" id="most-watched" role="tabpanel">
                  <div class="tab-head">
                    <i class="fa fa-dollar"></i>
                    <i class="fa fa-eye"></i>
                  </div>
                  <ul class="list-unstyled m-0 p-0 last-orders">
                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>

                    <li class="clearfix">
                      <img
                        alt=""
                        class="rounded-circle float-right order-thumb"
                        src="assets/images/shirt.png"
                      />
                      <div class="order-product ">
                        <a href="#">قميص تك فت بيز</a>

                        <span class="float-left">
                          <span>35$</span>
                          <span>130</span>
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>-->
          <!--نهاية عنصر احصائيات المنتجات-->

          <!--عنصر آخر الطلبات-->
          <!--<div class="col-md-6">
            <div id="last-orders-block" class="content-block">
              <div class="title">
                <i class="fa fa-bar-chart block-icon" aria-hidden="true"></i>آخر
                الطلبات
              </div>

              <div id="last-orders" class="products-statics m-0">
                <ul class="list-unstyled p-0 last-orders">
                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>

                  <li>
                    <img
                      alt=""
                      class="rounded-circle float-right order-thumb"
                      src="assets/images/shirt.png"
                    />
                    <div class="order-product">
                      <a href="#">قميص تك فت بيز</a>

                      <span class="float-left">
                        <span>1</span>
                        <span
                          ><a class="fa fa-eye" href="#" aria-hidden="true"></a
                        ></span>
                      </span>

                      <div class="order-buyer">
                        <span
                          >قسم :
                          <a href="#">رجالي</a>
                        </span>
                        <span
                          >الزبون :
                          <a href="#">مصطفى محمد</a>
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>-->
          <!--نهاية عنصر آخر الطلبات-->
        </div>
      </div>
      <!--نهاية العمود الأيمن-->

      <!--العمود الايسر-->
      <div class="col-lg-3 text-center quick-statics">
        <div class="row">
          <div class="col-lg-12 col-md-6">
            <div class="content-block">
              <div class="title">
                <i class="fa fa-shopping-cart block-icon" aria-hidden="true"></i
                >طلبات اليوم
              </div>
              <div class="number">548</div>
              <div class="note">
                <span style="color: #27ae60">33%</span> ارتفاع عن نتيجة الأمس
              </div>
              <canvas id="dailySalesChart"></canvas>
            </div>
          </div>

          <div class="col-lg-12 col-md-6">
            <div class="row">
              <!--<div class="col-12">
                <div class="content-block comments">
                  <div class="title">
                    <i class="fa fa-comment block-icon" aria-hidden="true"></i
                    >تعليقات جديدة
                  </div>

                  <div class="number">663</div>
                  <a class="btn custom-btn" href="#">مشاهدة التعليقات</a>
                </div>
              </div>-->

              <!--<div class="col-12">
                <div class="content-block tasks-block">
                  <div class="title">
                    <i class="fa fa-comment block-icon" aria-hidden="true"></i
                    >قائمة المهام
                  </div>

                  <form class="form-group">
                    <div class="input-group">
                      <input
                        id="new-task"
                        class="form-control"
                        title="task"
                        type="text"
                        required="required"
                      />
                      <button
                        type="submit"
                        id="add-new-task"
                        class="btn custom-btn"
                      >
                        <i class="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                  </form>

                  <ul
                    id="tasks-list"
                    class="text-right list-unstyled p-0 custom-checkbox"
                  >
                    <li>
                      <input id="task1" type="checkbox" />
                      <label for="task1">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task7" type="checkbox" />
                      <label for="task7">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task2" type="checkbox" />
                      <label for="task2">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task3" type="checkbox" />
                      <label for="task3">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task4" type="checkbox" />
                      <label for="task4">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task5" type="checkbox" />
                      <label for="task5">شحن بضائع القسم النسائي</label>
                    </li>

                    <li>
                      <input id="task6" type="checkbox" />
                      <label for="task6">شحن بضائع القسم النسائي</label>
                    </li>
                  </ul>
                </div>
              </div>-->
            </div>
          </div>
        </div>
      </div>
      <!--نهاية العمود الايسر-->
    </div>
    <!--نهاية صف يحتوي العمود الأيمن والأيسر-->
  </div>
</template>

<script>
export default {
  name: "AppDashboard",
  components: {}
};
</script>
