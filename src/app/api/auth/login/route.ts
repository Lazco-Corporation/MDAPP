import { type NextRequest, NextResponse } from "next/server";
import UnitedEffects from "./userAgent.json";
import type { User, Student } from "@/types/user";

function getRandomUserAgent(): string {
	const randomIndex = Math.floor(Math.random() * UnitedEffects.length);
	return UnitedEffects[randomIndex].useragent;
}

export async function POST(request: NextRequest) {
	const randomUserAgent = getRandomUserAgent();
	const body = await request.json();
	const { id, password } = body;

	var myHeaders = new Headers();
	myHeaders.append("User-Agent", randomUserAgent);
	myHeaders.append("Cookie", "PHPSESSID=mdapp");
	myHeaders.append("Accept", "*/*");
	myHeaders.append("Host", "140.128.156.106");
	myHeaders.append("Connection", "keep-alive");
	myHeaders.append("Referer", "http://140.128.156.106/MDAPP/SloginX.php");

	var formdata = new FormData();
	formdata.append("Uname", id);
	formdata.append("Upwd", password);
	formdata.append("sure_login", "yes");

	var requestOptions: any = {
		method: "POST",
		headers: myHeaders,
		body: formdata,
		redirect: "follow",
		Credentials: "include",
	};

	// 使用者目前身分以及所有身分
	let cRole: string = "";
	let wRole: Array<string> = [];

	// 使用者資訊
	let name: string = ""; // 使用者姓名
	let stuCode: string = ""; // 使用者學號
	let stuDept: string = ""; // 使用者部別

	// 使用者 session
	let stuSession: string = "";
	let parSession: string = "";
	let empSession: string = "";
	let aluSession: string = "";

	// 使用者綁定之學生 sessoion 與使用者帳號
	let cStuSession: string = "";
	let cStu: Student | null = null;
	let wStu: Array<Student> = [];

	let firstRole: string = "";

	async function getUserData(result: any) {
		// Find wRole
		const roleMatches = result.match(/wRole=([A-Z]+)/g);
		if (roleMatches) {
			let roleTMP: any = [];
			roleTMP = [...new Set(roleMatches)];
			cRole = roleTMP[0].replace("wRole=", "");
		}

		const wRoleSelectMatch = result.match(
			/<select[^>]*cRole[^>]*>(.*?)<\/select>/s,
		);
		if (wRoleSelectMatch) {
			const optionDetailMatches = wRoleSelectMatch[1].match(
				/<option[^>]*value\s*=\s*["']([^"']*)["'][^>]*>/g,
			);
			if (optionDetailMatches) {
				const wRoleTMP: string[] = [];
				optionDetailMatches.map((option: any) => {
					const valueMatch = option.match(/value\s*=\s*["']([^"']*)["']/);
					if (valueMatch) {
						wRoleTMP.push(valueMatch[1]);
					}
				});
				wRole = wRoleTMP;
			}
		}

		const sessionMatches = result.match(/session=([A-Z0-9]+)/g);
		if (sessionMatches) {
			let sessionTMP: any = [];
			sessionTMP = [...new Set(sessionMatches)];
			switch (cRole) {
				case "STU": {
					stuSession = sessionTMP[0].replace("session=", "");

					const formdata = new FormData();
					formdata.append("sess", stuSession);

					const requestOptions = {
						method: "POST",
						body: formdata,
					};

					await fetch(
						"https://mdsrl.mingdao.edu.tw/mdpp/Sig20Login/sessUserCheck",
						requestOptions,
					)
						.then((response) => response.json())
						.then((result) => {
							stuCode = result.code;
							name = result.user_name;
							stuDept = result.dept;
							cStuSession = result.session;
						})
						.catch((error) => console.log("error", error));
					break;
				}
				case "PAR": {
					parSession = sessionTMP[0].replace("session=", "");

					const userNameMatch = result.match(/usrName">([^<]+)/);
					if (userNameMatch) {
						name = userNameMatch[1];
					}

					await fetch(
						`http://140.128.156.106/MDAPP/menuList.php?qFID=F11&session=${parSession}&wRole=${cRole}`,
						requestOptions,
					)
						.then((response) => response.text())
						.then((result) => {
							const studentData = extractStudentData(result);
							wStu = studentData.students;
							cStu = studentData.currentStudent;
							cStuSession = studentData.currentStudentSession;
						})
						.catch((error) => console.log("error", error));
					break;
				}
				case "EMP":
					empSession = sessionTMP[0].replace("session=", "");
					break;
				case "ALU":
					aluSession = sessionTMP[0].replace("session=", "");
					break;
			}
		}

		const deptMatches = result.match(/dept=([^&'"]+)/g);
		if (deptMatches) {
			let deptTMP: any = [];
			deptTMP = [...new Set(deptMatches)];
			stuDept = deptTMP[0].replace("dept=", "");
		}
	}

	await fetch("http://140.128.156.106/MDAPP/SloginX.php", requestOptions)
		.then((response) => response.text())
		.then(async (result) => {
			await getUserData(result);
			firstRole = cRole;
			if (wRole.length > 1) {
				for (const role of wRole.filter((role) => role !== cRole)) {
					try {
						const response = await fetch(
							`http://140.128.156.106/MDAPP/setRole.php?cRole=${role}`,
							requestOptions,
						);
						const result = await response.text();
						await getUserData(result);
					} catch (error) {
						console.log(`Error switching to role ${role}:`, error);
					}
				}
			}
		})
		.catch((error: any) => console.log("error", error));

	const user: User = {
		id: id,
		password: password,
		cRole: firstRole || cRole,
		wRole: wRole || [],
		name: name || "",
		stuCode: stuCode || "",
		stuDept: stuDept || "",
		stuSession: stuSession,
		parSession: parSession,
		empSession: empSession,
		aluSession: aluSession,
		cStuSession: cStuSession || "",
		cStu: cStu || null,
		wStu: wStu || [],
	};

	return NextResponse.json(
		{
			user,
		},
		{ status: 200 },
	);
}

function extractStudentData(result: any) {
	let students = [];
	let currentStudent = null;

	// 1. 找到部別資訊（從 dept 參數中提取）
	let studentDept: any = "";
	const deptMatches = result.match(/dept=([^&'"]+)/g);
	if (deptMatches) {
		// 取得部別代碼（去重後取第一個）
		const uniqueDepts = [
			...new Set(deptMatches.map((d: any) => d.replace("dept=", ""))),
		];
		studentDept = uniqueDepts[0];
	}

	// 2. 找到所有關聯學生
	const studentSelectors = result.match(
		/csSelStd\('([^']+)','([^']*)'\)[^>]*>([^<]+)</g,
	);

	if (studentSelectors) {
		students = studentSelectors
			.map((selector: any) => {
				const match = selector.match(
					/csSelStd\('([^']+)','([^']*)'\)[^>]*>([^<]+)/,
				);
				if (match) {
					const studentId = match[1];
					const _extraParam = match[2];
					const displayInfo = match[3].trim();

					// 解析姓名和學號
					const nameCodeMatch = displayInfo.match(/^([^\s]+)\s+(.+)$/);
					const studentName = nameCodeMatch ? nameCodeMatch[1] : displayInfo;
					const studentCode = nameCodeMatch ? nameCodeMatch[2] : "";

					return {
						id: studentId,
						name: studentName,
						role: "STU",
						code: studentCode,
						dept: studentDept,
						session: "",
					};
				}
				return null;
			})
			.filter((student: any) => student !== null);
	}

	// 3. 從URL中提取所有學生session
	const allStudentSessions: string[] = [];

	// 3.1 找到所有可能的學生session（包含STU和STD角色）
	const studentSessionMatches = result.match(
		/session=([A-Z0-9]+)(?=&.*?wRole=STU|&.*?wRole=STD)/g,
	);

	if (studentSessionMatches) {
		// 去重並收集所有學生session
		const uniqueStudentSessions: any = [
			...new Set(
				studentSessionMatches.map((s: any) => s.replace("session=", "")),
			),
		];
		allStudentSessions.push(...uniqueStudentSessions);

		// 為學生分配session（如果有多個學生，按順序分配）
		students.forEach((student: any, index: number) => {
			if (index < uniqueStudentSessions.length) {
				student.session = uniqueStudentSessions[index];
			} else {
				// 如果學生數量多於session數量，使用第一個session
				student.session = uniqueStudentSessions[0] || "";
			}
		});
	}

	// 3.2 也嘗試從PAR_session參數中提取（備用方案）
	const parSessionMatches = result.match(/PAR_session=([A-Z0-9]+)/g);
	if (parSessionMatches) {
		const parSessions = parSessionMatches.map((s: any) =>
			s.replace("PAR_session=", ""),
		);
		allStudentSessions.push(...parSessions);
	}

	// 4. 找到目前查看的學生（從選中的邊框標記）
	let currentStudentSession = "";
	const selectedStudentMatch = result.match(
		/border:2px solid #FF6633[^>]*csSelStd\('([^']+)'/,
	);

	if (selectedStudentMatch) {
		const selectedStudentId = selectedStudentMatch[1];
		currentStudent = students.find(
			(student: any) => student.id === selectedStudentId,
		);
		if (currentStudent) {
			currentStudentSession = currentStudent.session;
		}
	} else if (students.length > 0) {
		currentStudent = students[0];
		currentStudentSession = currentStudent.session;
	}

	return {
		students: students,
		currentStudent: currentStudent,
		currentStudentSession: currentStudentSession,
	};
}
