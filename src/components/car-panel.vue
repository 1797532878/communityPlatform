<template>
  <!--active-->
  <li class="nav-cart" @mouseenter="showCarHandle" @mouseleave="hideCarHandle">
    <a href="javascript:;" class="ball-rect"></a>
    <!--根据class改变颜色-->
    <span class="cart-empty-num" :class="{'cart-num':count > 0}">
								<i>{{ count }}</i>
							</span>
    <div class="nav-cart-wrapper" v-if="carShow">
      <div class="nav-cart-list">
        <div class="empty" v-if="count <= 0">
          <h3>购物车为空</h3>
          <p>您还没有选购任何商品，现在前往商城选购吧!</p>
        </div>
        <div class="full" v-else>
          <div class="nav-cart-items">
            <ul>
              <li class="clear" v-for="(item,index) in carPanelData">
                <div class="cart-item js-cart-item cart-item-sell">
                  <div class="cart-item-inner">
                    <div class="item-thumb">
                      <img :src="item.ali_image">
                    </div>
                    <div class="item-desc">
                      <div class="cart-cell">
                        <h4>
                          <a href="#/item/100027401">{{item.title}}</a>
                        </h4>
                        <p class="attrs">
                          <span>{{ item.spec_json.show_name }}</span>
                        </p>
                        <h6>
                          <span class="price-icon">¥</span><span class="price-num">{{ item.price }}</span><span class="item-num"> x {{item.count}}</span>
                        </h6>
                      </div>
                    </div>
                    <div class="del-btn" @click="delCarPanelHandle(item.sku_id)">删除</div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="nav-cart-total">
            <p>共 <strong class="ng-binding">{{ count }}</strong> 件商品</p>
            <h5>合计：<span class="price-icon">¥</span><span class="price-num ng-binding" ng-bind="cartMenu.totalPrice">{{ price }}</span></h5>
            <h6>
              <router-link class="nav-cart-btn" to="/cart">去购物车</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  computed: {
    //获取vuex里面的数据
    carPanelData () {
      return this.$store.state.carPanelData
    },
    count () {
      return this.$store.getters.totalCount
    },
    price () {
      return this.$store.getters.totalPrice
    },
    carShow () {
      return this.$store.state.carShow
    },
    // //小球
    // ball () {
    //   return this.$store.state.ball
    // }
  },
  methods: {
    // 删除商品
    delCarPanelHandle (id) {
      this.$store.commit('delCarPanelData',id)
    },
    // 展示购物车
    showCarHandle () {
      this.$store.commit('showCar')
    },
    hideCarHandle () {
      this.$store.commit('hideCar')
    },
  }
}
</script>

<style scoped>
@import "../assets/css/reset.css";
.nav-cart-btn {
  display: block;
  height: 38px;
  background: #688fe8;
  background: linear-gradient(#688fe8, #5079e1);
  border: 1px solid #5c81e3;
  border-radius: 6px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, .2), 0 1px 3px rgba(0, 0, 0, .2);
  line-height: 38px;
  text-align: center;
  color: #FFF;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, .15)
}
</style>
