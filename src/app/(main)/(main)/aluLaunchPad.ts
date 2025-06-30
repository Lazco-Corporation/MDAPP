import type { User } from "@/types/user";

export function getAluLaunchPad(userData: User) {
	return [
		{
			name: "個人資料維護",
			image: "/icons/MD-info-edit.png",
			url: `https://app3.mingdao.edu.tw/apply/mapply.php?session=${userData.aluSession}wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "線上校友證",
			image: "/icons/MD-AL-ecard.png",
			url: `https://app3.mingdao.edu.tw/apply/student_card.php?session=${userData.aluSession}wRole=${userData.cRole}`,
			target: "_blank",
		},
		{
			name: "校友會連結",
			image: "/icons/MD-AL-linktree.png",
			url: `https://linktr.ee/mdhsaa`,
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
			name: "校園地圖",
			image: "/icons/MD-map.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/mdgeneralaffairsoffice/校園地圖`,
			target: "_blank",
		},
		{
			name: "Podcast",
			image: "/icons/MD-PODCAST.png",
			url: `https://podcasts.apple.com/tw/podcast/發現明道-discover-mingdao/id1562621437`,
			target: "_blank",
		},
		{
			name: "各項申請",
			image: "/icons/MD-AL-apply.png",
			url: `https://reurl.cc/MjOAKW`,
			target: "_blank",
		},
		{
			name: "明道嚴選",
			image: "/icons/MD-AL-mdex.png",
			url: `https://sites.google.com/ms.mingdao.edu.tw/mdex`,
			target: "_blank",
		},
		{
			name: "回饋與參與",
			image: "/icons/MD-AL-joinus.png",
			url: `https://donation.sinopac.com/OnlineSinoPac/OnlineSinopac/ProjList?orgid=O087`,
			target: "_blank",
		},
	];
}
