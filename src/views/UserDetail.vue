<template>
  <div class="d-flex align-items-center mb-3">
    <div>
      <ul class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item active">User List</li>
      </ul>
      <h1 class="page-header mb-0">User List</h1>
    </div>
    <div class="ms-auto">
      <a href="#" class="btn btn-success btn-rounded px-4 rounded-pill"><i class="fa fa-plus fa-lg me-2 ms-n2 text-success-900"></i> Create Portfolio</a>
    </div>
  </div>

  <div class="mb-3 d-md-flex fw-bold">
<!--    <div class="mt-md-0 mt-2"><a href="#" class="text-dark text-decoration-none"><i class="fa fa-download fa-fw me-1 text-dark text-opacity-50"></i> Export</a></div>
    <div class="ms-md-4 mt-md-0 mt-2 dropdown-toggle">
      <a href="#" data-bs-toggle="dropdown" class="text-dark text-decoration-none">More Actions <b class="caret"></b></a>
      <div class="dropdown-menu">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <div role="separator" class="dropdown-divider"></div>
        <a class="dropdown-item" href="#">Separated link</a>
      </div>
    </div>-->
  </div>

  <div class="card border-0">
    <ul class="nav nav-tabs nav-tabs-v2 px-3">
      <li class="nav-item me-2">
        <a class="nav-link px-2 active"
                                   data-bs-toggle="tab"
                                   @click="changeTab('All')">
        All
      </a></li>
      <li class="nav-item me-2"><a href="#publishedTab" class="nav-link px-2" data-bs-toggle="tab">Unfulfilled</a></li>
      <li class="nav-item me-2"><a href="#expiredTab" class="nav-link px-2" data-bs-toggle="tab">Unpaid</a></li>
      <li class="nav-item me-2"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Open</a></li>
      <li class="nav-item me-2"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Closed</a></li>
      <li class="nav-item me-2"><a href="#deletedTab" class="nav-link px-2" data-bs-toggle="tab">Local delivery</a></li>
    </ul>
    <div class="tab-content p-3">
      <div class="tab-pane fade show active" id="allTab">
        <!-- BEGIN input-group -->
        <div class="input-group mb-3">
          <button class="btn btn-white dropdown-toggle" type="button" data-bs-toggle="dropdown">
            <span class="d-none d-md-inline">{{ selectedFilter }}</span>
            <span class="d-inline d-md-none"><i class="fa fa-credit-card"></i></span>
            <b class="caret"></b>
          </button>

          <div class="dropdown-menu">
            <a class="dropdown-item" href="#" @click.prevent="selectFilter('Action')">Action</a>
            <a class="dropdown-item" href="#" @click.prevent="selectFilter('Another action')">Another action</a>
            <a class="dropdown-item" href="#" @click.prevent="selectFilter('Something else here')">Something else here</a>
            <div role="separator" class="dropdown-divider"></div>
            <a class="dropdown-item" href="#" @click.prevent="selectFilter('Separated link')">Separated link</a>
          </div>
          <div class="flex-fill position-relative">
            <div class="input-group">
              <div class="input-group-text position-absolute top-0 bottom-0 bg-none border-0 start-0" style="z-index: 1;">
                <i class="fa fa-search opacity-5"></i>
              </div>
              <input
                  type="text"
                  class="form-control px-35px bg-light"
                  placeholder="Search orders..."
                  v-model="search"
              />
            </div>
          </div>
        </div>
        <!-- END input-group -->

        <!-- BEGIN table -->
        <div class="table-responsive mb-3">
          <table class="table table-hover table-panel text-nowrap align-middle mb-0">
            <thead>
            <tr>
              <th>
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" @change="toggleAll" :checked="isAllSelected">
                </div>
              </th>
              <th>Order</th>
              <th>Date</th>
              <th></th>
              <th>Total</th>
              <th>Payment status</th>
              <th>Fulfillment status</th>
              <th>Items</th>
              <th>Delivery method</th>
            </tr>
            </thead>
            <tbody>
              <tr v-for="order in paginatedOrders" :key="order.id">
                <td class="w-10px align-middle">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input"
                           :value="order.id"
                           v-model="selected">
                  </div>
                </td>

                <td><router-link :to="`/extra/order-details/${order.id}`" class="fw-bold">{{ order.code }}</router-link></td>
                <td>{{ order.date }}</td>
                <td>{{ order.customer }}</td>
                <td>${{ order.total }}</td>
                <td>{{ order.payment }}</td>
                <td>{{ order.fulfillment }}</td>
                <td>{{ order.items }} items</td>
                <td>{{ order.delivery }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- END table -->
        <div class="d-md-flex align-items-center">
          <div class="me-md-auto text-md-left text-center mb-2 mb-md-0">
            Showing 1 to 10 of 57 entries
          </div>
          <ul class="pagination mb-0 justify-content-center">
            <li
                class="page-item"
                :class="{ disabled: currentPage === 1 }"
                @click="goPage(currentPage - 1)">
              <a class="page-link">Previous</a>
            </li>

            <li
                class="page-item"
                v-for="n in totalPages"
                :key="n"
                :class="{ active: currentPage === n }"
                @click="goPage(n)">
              <a class="page-link">{{ n }}</a>
            </li>

            <li
                class="page-item"
                :class="{ disabled: currentPage === totalPages }"
                @click="goPage(currentPage + 1)">
              <a class="page-link">Next</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';


const selectedFilter = ref('Filter orders')

function selectFilter(value) {
  selectedFilter.value = value
}

/* -----------------------------
   더미 데이터 (API 교체 가능)
------------------------------*/
interface Order {
  id: number;
  code: string;
  date: string;
  customer: string;
  total: number;
  payment: string;
  fulfillment: string;
  items: number;
  delivery: string;
}

const rawOrders = ref<Order[]>([
  { id: 1, code: '#1950', date: 'Thu 26 Nov, 12:23pm', customer: 'Amanda Lee', total: 398, payment: 'Paid', fulfillment: 'Fulfilled', items: 3, delivery: 'Free shipping' },
  { id: 2, code: '#1949', date: 'Thu 26 Nov, 11:54am', customer: 'Leonard Oii', total: 496, payment: 'Paid', fulfillment: 'Fulfilled', items: 1, delivery: 'Local pickup' },
  { id: 3, code: '#1948', date: 'Thu 25 Nov, 11:54pm', customer: 'John Doe', total: 195, payment: 'Pending', fulfillment: 'Unfulfilled', items: 2, delivery: 'Express' },
  // ... 실제로는 API에서 가져오면 됨!
]);

/* -----------------------------
   검색
------------------------------*/
const search = ref("");

/* -----------------------------
   필터
------------------------------*/
const filterType = ref("All");
/*
 All / Unfulfilled / Unpaid / Open / Closed / Local delivery
*/

/* -----------------------------
   체크박스 전체 선택
------------------------------*/
const selected = ref<number[]>([]);
const toggleAll = () => {
  if (isAllSelected.value) {
    selected.value = [];
  } else {
    selected.value = filteredOrders.value.map(o => o.id);
  }
};
const isAllSelected = computed(() =>
    filteredOrders.value.length > 0 &&
    selected.value.length === filteredOrders.value.length
);

/* -----------------------------
   페이징
------------------------------*/
const currentPage = ref(1);
const perPage = 10;

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * perPage;
  return filteredOrders.value.slice(start, start + perPage);
});
const totalPages = computed(() =>
    Math.ceil(filteredOrders.value.length / perPage)
);

/* -----------------------------
   필터 + 검색 적용된 데이터
------------------------------*/
const filteredOrders = computed(() => {
  let list = [...rawOrders.value];

  // 필터
  if (filterType.value !== "All") {
    if (filterType.value === "Unfulfilled") {
      list = list.filter(o => o.fulfillment === "Unfulfilled");
    }
    if (filterType.value === "Unpaid") {
      list = list.filter(o => o.payment !== "Paid");
    }
    if (filterType.value === "Closed") {
      list = list.filter(o => o.fulfillment === "Fulfilled");
    }
    if (filterType.value === "Local delivery") {
      list = list.filter(o => o.delivery.includes("Local"));
    }
  }

  // 검색
  if (search.value.trim() !== "") {
    list = list.filter(o =>
        o.code.toLowerCase().includes(search.value.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.value.toLowerCase())
    );
  }

  return list;
});

/* -----------------------------
   탭 클릭 함수
------------------------------*/
const changeTab = (type: string) => {
  filterType.value = type;
  currentPage.value = 1;
};

/* -----------------------------
   페이지 이동
------------------------------*/
const goPage = (p: number) => {
  if (p < 1 || p > totalPages.value) return;
  currentPage.value = p;
};
</script>
