import type { User } from "@/types/user";

export function getExtraMenu(userData: User, extraMenuName: string) {
	if (!userData || !extraMenuName) {
		return [];
	}

	if (extraMenuName === "leave") {
		return [
			{
				name: "學生請假",
				image: "/icons/MD-leave.webp",
				url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/stdLeave/leave_login.php?rMode=APP&session=${userData.cStu?.session}&wRole=${userData.cStu?.role}&PAR_session=${userData.parSession}`,
				target: "_blank",
			},
			{
				name: "假單審核",
				image: "/icons/MD-leave-chk2.png",
				url: `https://s44.mingdao.edu.tw/ORDER/auth/?ref=Parent&gp=m/SL/stdleavePchk.php&session=${userData.parSession}&wRole=${userData.cRole}`,
				target: "_blank",
			},
		];
	} else if (extraMenuName === "CA") {
		return [
			{
				name: "銷過申請",
				image: "/icons/MD-CA-apply.webp",
				url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/cancelPunish/cp_data_std_query.php?session=${userData.cStu?.session}&wRole=${userData.cStu?.role}&PAR_session=${userData.parSession}`,
				target: "_blank",
			},
			{
				name: "銷過申請",
				image: "/icons/MD-CA-chk.png",
				url: `https://s44.mingdao.edu.tw/order/auth/?ref=Parent&gp=m%2FCP%2FcpapplyPchk.php&session=${userData.parSession}&wRole=${userData.cRole}`,
				target: "_blank",
			},
		];
	} else if (extraMenuName === "RFT") {
		return [
			{
				name: "教務巡堂",
				image: "/icons/MD-RFT.png",
				url: `https://s93.mingdao.edu.tw/ORDER/login_emp.php?rMode=APP&AID=registry&goPage=SubSystem/RFTeach/RFT_fill.php&session=${userData.empSession}&wRole=${userData.cRole}`,
				target: "_blank",
			},
			{
				name: "學務巡堂",
				image: "/icons/MD-RFT.png",
				url: `https://s93.mingdao.edu.tw/ORDER/login_emp.php?rMode=APP&AID=ofsa&goPage=SubSystem/RFTeachS/RFT_fill.php&session=${userData.empSession}&wRole=${userData.cRole}`,
				target: "_blank",
			},
		];
	}
}
