import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userId: '',
    click_postId: 0,
    blankPageTo: '',
    //购物车
    //数组存放购物车数据
    carPanelData: [],
    //是否达到商品最大购买数量
    maxOff: false,
    //默认不显示购物车  一加入商品则显示购物车
    carShow: false,
    //购物车显示时间定时器
    carTimer: null,

    orderData: [],
    // ball: {
    //   show: false,
    //   el: null,
    //   img: ''
    // }
    // 收货地址信息
    receiveInfo: [{
      'name': '陈熙',
      'phone': '18911111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 400000,
      'province': '重庆市',
      'cityId': 400000,
      'city': '市辖区',
      'countyId': 400000,
      'county': '南岸区',
      'add': '重庆邮电大学23B',
      'default': true
    },{
      'name': '陈熙',
      'phone': '18911111111',
      'areaCode': '010',
      'landLine': '64627856',
      'provinceId': 400000,
      'province': '重庆市',
      'cityId': 400000,
      'city': '市辖区',
      'countyId': 400000,
      'county': '南岸区',
      'add': '重庆邮电大学6栋',
      'default': false
    }]
  },

  mutations: {
    //将state和商品信息传入  根据sku_id判断是否已经存在购物车，如果存在 则数量加1 不存在 则添加到购物车
    addCarPanelData(state,data){
      //默认没加入过购物车
      let bOff = true
      state.carShow = true
      state.carPanelData.forEach((goods) => {
        if (goods.sku_id === data.info.sku_id){
          //根据用户选择 加多少
          goods.count += data.count
          //加入了购物车 令其为false
          bOff = false
          if (goods.count > goods.limit_num) {
            goods.count -= data.count
            state.maxOff = true
            state.carShow = false
          }
        }
      })
      //如果没有加入过购物车
      if (bOff){
        let goodsData = data.info
        //为商品新增属性
        Vue.set(goodsData,'count',data.count)
        Vue.set(goodsData,'checked',true)
        state.carPanelData.push(goodsData)
      }
      // state.ball.show = true
      // state.ball.img = data.ali_image
      // state.ball.el = event.path[0]
      // console.log(event.path[0])
      // console.log(event)
      // console.log(state.carPanelData)
    },
    // 删除
    delCarPanelData(state,id){
      state.carPanelData.forEach((goods,index) => {
        if (goods.sku_id === id){
          state.carPanelData.splice(index,1)
          return
        }
      })
    },

    //关闭数量达到最大的弹出框
    closePrompt (state) {
      state.maxOff = false
    },

    // 显示购物车
    showCar (state) {
      clearTimeout(state.carTimer)
      state.carShow = true
    },
    //隐藏购物车
    hideCar (state) {
      state.carTimer = setTimeout(() => {
        state.carShow = false
      },500)
    },
    //增加商品数量
    plusCarPanelData(state,id){
      state.carPanelData.forEach((goods,index) => {
        if (goods.sku_id === id){
          if (goods.count >= goods.limit_num)
            return
          goods.count++
          return
        }
      })
    },
    //删除商品
    subCarPanelData(state,id){
      state.carPanelData.forEach((goods,index) => {
        if (goods.sku_id === id){
          if (goods.count <= 1)
            return
          goods.count--
          return
        }
      })
    },
    //检查商品是否选中
    checkGoods (state,id) {
      state.carPanelData.forEach((goods,index) => {
        if (goods.sku_id === id){
          goods.checked = !goods.checked
          return
        }
      })
    },
    //点击全选
    allCheckGoods (state,allChecked) {
      state.carPanelData.forEach((goods,index) => {
        goods.checked = !allChecked
      })
    },
    //删除选中商品
    delCheckedGoods (state) {
      //倒着删除  正着删除 会导致 后面的数据向前移位
      let i = state.carPanelData.length
      while (i--){
        if (state.carPanelData[i].checked){
          state.carPanelData.splice(i,1)
        }
      }
    },
    // 提交地址信息
    submitReceive (state,data) {
      if (data.default) {
        state.receiveInfo.forEach((receive) => {
          receive.default = false
        })
      }
      state.receiveInfo.push(data)
    },
    // 获取提交的订单
    submitOrder (state,data) {
      // 新的订单插入到最前面
      state.orderData.unshift(data)
      let i = state.carPanelData.length
      while (i--) {
        // 如果选中 则删掉
        if (state.carPanelData[i].checked) {
          state.carPanelData.splice(i,1)
        }
      }
    },
    // 订单支付
    payNow (state,id) {
      state.orderData.forEach((order) => {
        if (order.orderId === id) {
          order.isPay = true
          return
        }
      })
    }
  },

  actions: {

  },

  getters: {
    //计算购物车总数
    totalCount (state) {
      let count = 0
      state.carPanelData.forEach((goods) => {
        count += goods.count
      })
      return count
    },
    //计算购物车总价格
    totalPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods) => {
        price += goods.price * goods.count
      })
      return price
    },
    //计算 是否全选
    allChecked (state) {
      let allCheck = true
      state.carPanelData.forEach((goods,index) => {
        if (!goods.checked){
          allCheck = false
          return
        }
      })
      return allCheck
    },
    //计算已选择数量
    checkedCount (state) {
      let count = 0
      state.carPanelData.forEach((goods,index) => {
        if (goods.checked){
          count += goods.count
        }
      })
      return count
    },
    //计算已选数量金额
    checkedTotalPrice (state) {
      let price = 0
      state.carPanelData.forEach((goods,index) => {
        if (goods.checked){
          price += goods.count * goods.price
        }
      })
      return price
    },
    //筛选已选中的商品
    checkedGoods (state) {
      let checkedGoods = []
      state.carPanelData.forEach((goods,index) => {
        if (goods.checked) {
          checkedGoods.push(goods)
        }
      })
      return checkedGoods
    }
  }
})
