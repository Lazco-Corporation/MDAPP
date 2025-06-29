/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> **/
"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function MenuPage() {
	const { data: session } = useSession();
	const userData: any = session?.user;

	const menus = [
		{
			name: "定期評量 / 期中考",
			url: `https://crm.mingdao.edu.tw/CRM/m/search_setup1_op.asp?score_select=S1&session=${userData?.session}&wRole=${userData?.wRole}&stu_key=${userData?.code}&stu_id=${userData?.userID}&stu_dept=${userData?.stuDept}`,
			target: "_blank",
		},
		{
			name: "學習成績與素養表現",
			url: `https://s11.mingdao.edu.tw/mderp/AcademicGuide/stuSemwScore/?session=${userData?.session}&wRole=${userData?.wRole}`,
			target: "_blank",
		},
		{
			name: "模擬考",
			url: `https://crm.mingdao.edu.tw/CRM/m/search_setup1_op.asp?score_select=S3&session=${userData?.session}&wRole=${userData?.wRole}&stu_key=${userData?.code}&stu_id=${userData?.userID}&stu_dept=${userData?.stuDept}`,
			target: "_blank",
		},
		{
			name: "缺曠獎懲明細",
			url: `https://crm.mingdao.edu.tw/CRM/m/search_setup1_op.asp?score_select=S2&session=${userData?.session}&wRole=${userData?.wRole}&stu_key=${userData?.code}&stu_id=${userData?.userID}&stu_dept=${userData?.stuDept}`,
			target: "_blank",
		},
		{
			name: "門禁系統查詢",
			url: `https://crm.mingdao.edu.tw/CRM/m/search_setup1_op.asp?score_select=S9&session=${userData?.session}&wRole=${userData?.wRole}&stu_key=${userData?.code}&stu_id=${userData?.userID}&stu_dept=${userData?.stuDept}`,
			target: "_blank",
		},
		{
			name: "週成績、生活常規",
			url: `https://crm.mingdao.edu.tw/CRM/m/search_S10.asp?session=${userData?.session}&wRole=${userData?.wRole}&stu_id=${userData?.userID}`,
			target: "_blank",
		},
		{
			name: "課外社團填報與查詢",
			url: `https://s44.mingdao.edu.tw/ReLearn/Web/index.php?session=${userData?.session}&wRole=${userData?.wRole === "STU" ? "STD" : userData?.wRole}`,
			target: "_blank",
		},
		{
			name: "學生服儀與行為違規",
			url: `https://s44.mingdao.edu.tw/ORDER/SubSystem/RKrecord/stdRKrecord_query.php?session=${userData?.session}&wRole=${userData?.wRole === "STU" ? "STD" : userData?.wRole}`,
			target: "_blank",
		},
		{
			name: "學涯導航系統",
			url: `https://crm.mingdao.edu.tw/CRM/m/JU.asp?func=ju&session=${userData?.session}&wRole=${userData?.wRole}&stu_id=${userData?.userID}`,
			target: "_blank",
		},
		{
			name: "學習歷程檔案",
			url: `https://crm.mingdao.edu.tw/CRM/m/JU.asp?func=ep&session=${userData?.session}&wRole=${userData?.wRole}&stu_id=${userData?.userID}`,
			target: "_blank",
		},
		{
			name: "課業輔導系統-缺席查詢",
			url: `https://s44.mingdao.edu.tw/ReLearn/AdminUnit/M_rlabslog/rlabslog_query.php?rMode=APP&session=${userData?.session}&wRole=${userData?.wRole}`,
			target: "_blank",
		},
	];

	return (
		<div className="flex flex-col items-center justify-center h-full w-full relative bg-[#1c1c1e]">
			<div className="h-[calc(100dvh-3.5rem)] w-full flex flex-col items-center p-4 overflow-hidden">
				<div className="overflow-auto w-full gap-4 justify-start items-center flex flex-col">
					{menus.map((menu, index) => (
						<Link
							href={menu.url ? menu.url : "#"}
							target={menu.target}
							key={index}
							className="p-2 h-[3rem] w-full flex items-center justify-center bg-[#272d38] border-2 border-white/30 rounded-lg shadow-white/20 shadow-md text-white mx-auto "
						>
							<p className="font-bold font-[PingFang_SC]">{menu.name}</p>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
