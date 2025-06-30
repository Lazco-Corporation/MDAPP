import type { User } from "@/types/user";

export function getEmpLaunchPad(userData: User) {
	return [
		{
			name: "即時刻表",
			image: "/icons/MD-timetable.webp",
			url: `https://s44.mingdao.edu.tw/AACourses/Web/qWTTM.php?lang=CH&rMode=APP&session=${userData.empSession}&wRole=${userData.cRole === "STU" ? "STD" : userData.cRole}`,
			target: "_blank",
		},
		{
			name: "行事曆",
			image: "/icons/MD-Calendar.png",
			url: `https://s44.mingdao.edu.tw/AACourses/Web/eCalendar_view.php?rMode=APP&session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "線上點名",
			image: "/icons/MD-online-check.png",
			url: `https://s44.mingdao.edu.tw/AACourses/Web/uOrderM.php?wRole=EMP&lang=CH&session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "個人差勤",
			image: "/icons/MD-LE.png",
			url: `https://s44.mingdao.edu.tw/empLeave/AdminUnit/M_fillleave/fillleave_admin_rwd.php?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "校安中心",
			image: "/icons/MD-safety.webp",
			url: `https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/學生群聚與衝突處理`,
			target: "_blank",
		},
		{
			name: "明道首頁",
			image: "/icons/MD-web.png",
			url: `https://www3.mingdao.edu.tw/`,
			target: "_blank",
		},
		{
			name: "認識明道",
			image: "/icons/MD-mdhs.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/mdhs50/`,
			target: "_blank",
		},
		{
			name: "招生",
			image: "/icons/MD-recruit.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/admissions/首頁/`,
			target: "_blank",
		},
		{
			name: "學生生活規範",
			image: "/icons/MD-rule.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/guidance-and-counseling/首頁`,
			target: "_blank",
		},
		{
			name: "線上朝會",
			image: "/icons/MD-assembly.png",
			url: `https://crm.mingdao.edu.tw/m/assembly.asp`,
			target: "_blank",
		},
		{
			name: "校務週報",
			image: "/icons/MD-Weekly.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/mdnewsletter/home`,
			target: "_blank",
		},
		{
			name: "會議簽到",
			image: "/icons/MD-sign.png",
			url: `https://s93.mingdao.edu.tw/ORDER/SubSystem/sign/signData_fill_list.php?rMode=APP&session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "訊息通知",
			image: "/icons/MD-message.png",
			url: `https://app.mingdao.edu.tw/MDAPP/msgList.php?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "問卷調查",
			image: "/icons/MD-form.png",
			url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/WebApply_rwd/act_list.php?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "社團管理",
			image: "/icons/MD-club-manage.png",
			url: `https://s11.mingdao.edu.tw/mderp/society/inclass_record_edit?session=${userData.empSession}`,
			target: "_blank",
		},
		{
			name: "修繕填報",
			image: "/icons/MD-fix.png",
			url: `https://app3.mingdao.edu.tw/apply/stu_fix.php?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "精緻巡堂",
			image: "/icons/MD-RFT.png",
			openMenu: true,
			menuName: "RFT",
		},
		{
			name: "個人研修",
			image: "/icons/MD-TS.png",
			url: `https://s5.mingdao.edu.tw/MD_ERP/KN/my_list.asp?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "IDOS",
			image: "/icons/MD-IDOS.png",
			url: `https://s44.mingdao.edu.tw/IDOS/SloginX.php?rMode=APP&session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "Podcast",
			image: "/icons/MD-PODCAST.png",
			url: `https://podcasts.apple.com/tw/podcast/發現明道-discover-mingdao/id1562621437`,
			target: "_blank",
		},
		{
			name: "共讀共享",
			image: "/icons/MD-Keep-Doing.png",
			url: `https://crm.mingdao.edu.tw/m/read_tog.asp?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "線上捐款",
			image: "/icons/MD-donate.png",
			url: `https://www2.mingdao.edu.tw/parent/fundraising_platform9/index.php`,
			target: "_blank",
		},
		{
			name: "學生共學社群",
			image: "/icons/MD-SIG.png",
			url: `https://sig.mingdao.edu.tw?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "通勤便捷",
			image: "/icons/MD-school-bus.png",
			url: `http://sa9.mingdao.edu.tw/host1/exercise/traffic_jump.php?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "明道嚴選",
			image: "/icons/MD-AL-mdex.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/mdex`,
			target: "_blank",
		},
		{
			name: "電子名片",
			image: "/icons/MD-ECard.png",
			url: `https://s11.mingdao.edu.tw/mderp/ECard/userCheck?session=${userData.empSession}&wRole=${userData.cRole}`,
			target: "_blank",
		},
	];
}
