// 양평군 면 
var ypMyeon = ["강상면", "강하면",	"개군면",	"단월면",	"서종면",	"양동면",	"양서면",	"양평읍",	"옥천면",	"용문면",	"지평면",	"청운면"];

// 드론영상 양평군 면별 리 리스트
var ypLiLod = [
	// 강상면
	[
		"byeongsanri",
		"songhakri",
		"gyopyeongri",
		"shinhwari",
		"hwayangri",
		"daeseokri"
	],
	// 강하면
	[
		"unsimri",
		"wangchangri",
		"jeonsuli"
	],
	// 개군면
	[
		"gumiri",
		"gongseli",
		"jayeonli",
		"hyangri",
		"jueupri",
		"sangjapori"
	],
	// 단월면
	[
		"buanri"
	],
	// 서종면
	[
		"seohuri",
		"jeongbaeli"
	],
	// 양동면
	[
		"ssanghakri",
		"seokgokri",
		"maewolli",
		"gosongli"
	],
	// 양서면
	[
		"yangsuri",
		"daesimri",
		"bokpori",
		"cheonggyeri"
	],
	// 양평읍
	[
		"yanggeunri",
		"gongheungri",
		"baekanri",
		"dogokri",
		"daeheungri",
		"bongseongri",
		"wondeokri",
		"hoehyeonli",
		"changdaeri"
	],
	// 옥천면
	[
		"okcheonri",
		"yongcheonri",
		"sinbogli",
		"asinli"
	],
	// 용문면
	[
		"maryongri",
		"hwajeonri",
		"samseongri",
		"damunri",
		"yeonsuri",
		"geumgokri",
		"gwangtanri",
		"mangneungri",
		"jungwonri",
		"chohyunri",
		"deokchonri",
		"ohchonri",
		"sinjeomri"
	],
	// 지평면
	[
		"songhyeonri",
		"wolsanri",
		"mangmili",
		"muwangri",
		"ilsinli",
		"sugokri"
	],
	// 청운면
	[
		"yongduri",
		"yeomulri",
		"biryongri",
		"gahyunri",
		"galunli",
		"dowonri",
		"dadaeri"
	]
]

// 정사영상 양평군 면별 리 리스트
var ypLiImg = [
	// 강상면
	[
		"byeongsanri",
		"daeseokri",
		"gyopyeongri",
		"hwayangri",
		"sewolri",
		"shinhwari",
		"songhakri"
	],
	// 강하면
	[
		"dongori",
		"hanggeumri",
		"jeonsuli",
		"seongdeokri",
		"unsimri",
		"wangchangri"
	],
	// 개군면
	[
		"andeokri",
		"bulgokri",
		"buri",
		"gongseli",
		"gumiri",
		"gyejeonri",
		"hajapori",
		"hyangri",
		"jayeonli",
		"jueupri",
		"naeri",
		"sangjapori",
		"seokjangri"
	],
	// 단월면 
	[
		"buanri",
		"hyangsori",
		"myeongseongri",
		"saneumri"
	],
	// 서종면
	[
		"jeongbaeli",
		"seohuri"
	],
	// 양동면
	[
		"danseokri",
		"geumwangri",
		"gosongli",
		"gyejeongri",
		"maewolli",
		"samsanri",
		"seokgokri",
		"ssanghakri"
	],
	// 양서면
	[
		"bokpori",
		"cheonggyeri",
		"daesimri",
		"jeungdongri",
		"yangsuri",
		"yongdamri"
	],
	// 양평읍
	[
		"yanggeunri",
		"obinlee",
		"shinaeri",
		"deokpyeongri",
		"gongheungri",
		"baekanri",
		"dogokri",
		"daeheungri",
		"bongseongri",
		"wondeokri",
		"hoehyeonli",
		"changdaeri"
	],
	// 옥천면
	[
		"asinli",
		"okcheonri",
		"sinbogli",
		"yongcheonri"
	],
	// 용문면
	[
		"chohyunri",
		"damunri",
		"deokchonri",
		"geumgokri",
		"gwangtanri",
		"hwajeonri",
		"jungwonri",
		"mangneungri",
		"maryongri",
		"samsungri",
		"sinjeomri",
		"yeonsuri"
	],
	// 지평면
	[
		"daepyeongri",
		"goksuri",
		"ilsinli",
		"mangmili",
		"muwangri",
		"okhyeonri",
		"songhyeonri",
		"sugokri",
		"wolsanri"
	],
	// 청운면
	[
		"biryongri",
		"dadaeri",
		"dowonri",
		"gahyunri",
		"galunli",
		"samseongri",
		"yeomulri",
		"yongduri"
	]
];


var ypLiLodNm = [
	// 강상면
	[
		"병산리",
		"송학리",
		"교평리",
		"신화리",
		"화양리",
		"대석리"
	],
	// 강하면
	[
		"운심리",
		"왕창리",
		"전수리"
	],
	// 개군면
	[
		"구미리",
		"공세리",
		"자연리",
		"향리",
		"주읍리",
		"상자포리"
	],
	// 단월면
	[
		"부안리"
	],
	// 서종면
	[
		"서후리",
		"정배리"
	],
	// 양동면
	[
		"쌍학리",
		"석곡리",
		"매월리",
		"고송리"
	],
	// 양서면
	[
		"양수리",
		"대심리",
		"복포리",
		"청계리"
	],
	// 양평읍
	[
		"양근리",
		"공흥리",
		"백안리",
		"도곡리",
		"대흥리",
		"봉성리",
		"원덕리",
		"회현리",
		"창대리"
	],
	// 옥천면
	[
		"옥천리",
		"용천리",
		"신복리",
		"아신리"
	],
	// 용문면
	[
		"마룡리",
		"화전리",
		"삼성리",
		"다문리",
		"연수리",
		"금곡리",
		"광탄리",
		"망능리",
		"중원리",
		"조현리",
		"덕촌리",
		"오촌리",
		"신점리"
	],
	// 지평면
	[
		"송현리",
		"월산리",
		"망미리",
		"무왕리",
		"일신리",
		"수곡리"
	],
	// 청운면
	[
		"용두리",
		"여물리",
		"비룡리",
		"가현리",
		"갈운리",
		"도원리",
		"다대리"
	]
]