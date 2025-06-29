export function getLaunchPad(userData: any) {
	if (!userData) {
		return [];
	}

	if (userData.wRole === "${userData?.wRole}") {
		return [
			{
				name: "校安中心",
				image: "/icons/MD-safety.webp",
				url: "https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/學生群聚與衝突處理",
				target: "_blank",
			},
			{
				name: "即時刻表",
				image: "/icons/MD-timetable.webp",
				url: `https://s44.mingdao.edu.tw/AACourses/Web/qWTTM.php?lang=CH&rMode=APP&session=${userData?.session}&wRole=${userData?.wRole === "${userData?.wRole}" ? "STD" : userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "即時資訊",
				image: "/icons/MD-info.webp",
				url: `/menu`,
				// url: `https://app.mingdao.edu.tw/MDAPP/menuList.php?qFID=F11&session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_self",
			},
			{
				name: "線上請假",
				image: "/icons/MD-leave.webp",
				url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/stdLeave/leave_login.php?rMode=APP&session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "課程諮詢",
				image: "/icons/MD-course.webp",
				url: `https://crm.mingdao.edu.tw/m/online_ask.asp?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "銷過申請",
				image: "/icons/MD-CA-apply.webp",
				url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/cancelPunish/cp_data_std_query.php?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "自學平台",
				image: "/icons/MDSRL.webp",
				url: `https://crm.mingdao.edu.tw/m/MDSRL.asp?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "晨光英聽",
				image: "/icons/MD-english.webp",
				url: `https://sites.google.com/ms.mingdao.edu.tw/englisten/`,
				target: "_blank",
			},
			{
				name: "英文檢定",
				image: "/icons/ENG_certificate.png",
				url: `https://sites.google.com/ms.mingdao.edu.tw/english-test-schedule/`,
				target: "_blank",
			},
			{
				name: "學生生活規範",
				image: "/icons/MD-rule.png",
				url: `https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/首頁`,
				target: "_blank",
			},
			{
				name: "通勤便捷",
				image: "/icons/MD-school-bus.png",
				url: `http://sa9.mingdao.edu.tw/host1/exercise/traffic_jump.php?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "修繕填報",
				image: "/icons/MD-fix.png",
				url: `https://app3.mingdao.edu.tw/apply/stu_fix.php?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "繳款領款資訊",
				image: "/icons/MD-payment.png",
				url: `https://crm.mingdao.edu.tw/crm/m/stu_acc.asp?session=${userData?.session}&wRole=${userData?.wRole}&stu_id=${userData?.userID}`,
				target: "_blank",
			},
			{
				name: "明道雲城",
				image: "/icons/MD-estore.png",
				url: `https://crm.mingdao.edu.tw/EStore_new/session_decode.asp?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "行事曆",
				image: "/icons/MD-Calendar.png",
				url: `https://s44.mingdao.edu.tw/AACourses/Web/eCalendar_view.php?rMode=APP&session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
			{
				name: "學生社團",
				image: "/icons/MD-stu-societies.png",
				url: `https://sites.google.com/ms.mingdao.edu.tw/studentclubs/`,
				target: "_blank",
			},
			{
				name: "明道首頁",
				image: "/icons/MD-web.png",
				url: `https://www3.mingdao.edu.tw/`,
				target: "_blank",
			},
			{
				name: "明道粉專",
				image: "/icons/MD-fb.png",
				url: `https://www.facebook.com/mdhsstories`,
				target: "_blank",
			},
			{
				name: "校務週報",
				image: "/icons/MD-Weekly.png",
				url: `https://sites.google.com/ms.mingdao.edu.tw/mdnewsletter/home`,
				target: "_blank",
			},
			{
				name: "共讀共享共表達",
				image: "/icons/MD-Keep-Doing.png",
				url: `https://crm.mingdao.edu.tw/m/read_tog.asp?session=${userData?.session}&wRole=${userData?.wRole}`,
				target: "_blank",
			},
		];
	} else {
		return [];
	}
}
