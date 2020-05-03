<template>
    <div class="custom-pag clearfix">
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center pg-blue">
                <li v-if="pagination.current_page > 1" class="page-item" @click="changePage(1)"><a class="page-link">First</a></li>
                <li v-if="pagination.current_page > 1" class="page-item" @click="changePage(pagination.current_page - 1)">
                    <a class="page-link" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>

                <li v-for="(page,i) in pagesNumber" :key="i" :class="{'active': page == pagination.current_page}" class="page-item">
                    <a class="page-link" @click="changePage(page)">{{ page }}</a>
                </li>

                <li v-if="pagination.current_page < pagination.last_page" class="page-item" @click="changePage(pagination.current_page + 1)">
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
                <li v-if="pagination.current_page < pagination.last_page" class="page-item" @click="changePage(pagination.last_page)"><a class="page-link">Last</a></li>
            </ul>
        </nav>
    </div>
</template>


<script>

    export default {
        name: "Pagination",
        components:{

        },
        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },
        computed: {
            pagesNumber() {
                if (!this.pagination.to) {
                    return [];
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        },
        methods : {
            changePage(page) {
                this.pagination.current_page = page;
                this.$emit('paginate');
            }
    }
    }
</script>