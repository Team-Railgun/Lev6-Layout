// TODO search school : spr_ccm_cm01_100.ws POST kraOrgNm="schoolName" 
/* Template search response:
{
	"result":{
		"status":"success","message":"서비스 처리에 성공했습니다."
	},
	"action_title":"학교찾기",
	"resultSVO":{
		...,
		"orgDVOList":[{
			"atptOfcdcNm":"대전광역시교육청",
			"atptOfcdcOrgCode":"G100000001",
			"data":{
				"sqlAction":"",
				"orgCode":"G100000167",
				"kraOrgNm":"대덕고등학교",
				"zipAdres":"대전광역시 유성구 도룡동",
				"schulKndScCode":"04",
				"atptOfcdcNm":"대전광역시교육청",
				"atptOfcdcOrgCode":"G100000001",
				"schulCrseScCode":"4",
				"schulCrseScCodeNm":"고등학교"
			},
			...
		}]
	}
} */

// TODO get school page: sts_sci_si00_001.ws POST insttNm="schoolName" schulCode="schoolCode" schulCrseScCode="schoolType" schulKndScCode="schoolSection"
/* schoolSection
	1 : 병설유치원
	2 : 초등학교
	3 : 중학교
	4 : 고등학교

schoolType
	01: 유치원
	02: 초등학교
	03: 중학교
	04: 고등학교
*/
/* Template response:
{
	"result": {
		"status": "success",
		"message": "서비스 처리에 성공했습니다."
	},
	"action_title": "학교기본정보",
	"resultSVO": {
		...,
		"swcSciSi00M00List": [{
			"sqlAction": null,
			"orgCode": "G100000167",
			"kraOrgNm": "대덕고등학교",
			"engOrgNm": "Daedeok High School",
			"gan": "대전광역시교육청",
			"fondYmd": "1980.11.26",
			"foasMemrd": "1981.03.11",
			"zipCode": "305340",
			"zipAdres": "대전광역시 유성구 대덕대로 556번길, 158 (도룡동)",
			"zipCode2": "305-340",
			"zipAdres2": "대전광역시 유성구 대덕대로 556번길, 158 (도룡동)",
			"zipDtlad": "384번지",
			"orgTelno": "042-860-0300",
			"orgFaxno": "042-861-1413",
			"homepage": "http://www.taedok.hs.kr",
			"dghtScCode": "1",
			"dghtCrseScNm": "주간",
			"coeduScNm": "남여공학",
			"fondScNm": "공립",
			"schulCrseScNm": "일반고",
			"schulKndScNm": "고등학교",
			"hsGnrlBusnsScNm": "일반계",
			...
		}],
		...
	}
} */
