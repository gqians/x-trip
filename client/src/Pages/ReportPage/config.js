import Layout from './layout_tourist_gender';
import TouristVip from './layout_tourist_vip';
import ProductType from './layout_product_type';
export default [
	{
		name: 'tourist_gender_proportion',
		component: Layout,
		query: `
			manCount:TouristPagination(filter:{
				sex:"女"
			}){
				count
			}
			womanCount:TouristPagination(filter:{
				sex:"男"
			}){
				count
			}`,
		data: ['manCount', 'womanCount']
	}, {
		name: 'tourist_vip_proportion',
		component: TouristVip,
		query: `
		normalVipCount:TouristPagination(filter:{
			vipLevel: 1
		}){
			count
		}
		vipCount:TouristPagination(filter:{
			vipLevel: 2
		}){
			count
		}
		superVipCount:TouristPagination(filter:{
			vipLevel: 3
		}){
			count
		}
		`
	}, {
		name: 'product_type',
		component: ProductType,
		query: `
		touristCount:TouristSpotsPagination(filter:{

		}){
		  count
		}
		hotelCount:HotelPagination(filter:{

		}){
		  count
		}
		type1Count:HotelPagination(filter:{
			hotelType:"客栈旅舍"
		  }){
			count
		}
		type2Count:HotelPagination(filter:{
			hotelType:"三星级酒店"
		}){
		count
		}
		  type3Count:HotelPagination(filter:{
			hotelType:"青年旅舍"
		  }){
			count
		  }
		  type4Count:HotelPagination(filter:{
			hotelType:"五星级酒店"
		  }){
			count
		  }
		  type5Count:HotelPagination(filter:{
			hotelType:"度假村"
		  }){
			count
		  }
		  type6Count:HotelPagination(filter:{
			hotelType:"公寓式酒店"
		  }){
			count
		  }
		  type7Count:HotelPagination(filter:{
			hotelType:"四星级酒店"
		  }){
			count
		  }
		  type8Count:HotelPagination(filter:{
			hotelType:"豪华型"
		  }){
			count
		  }
		`
	}
];
