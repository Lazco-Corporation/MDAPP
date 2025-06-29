import { type NextRequest, NextResponse } from "next/server";
import UnitedEffects from "./userAgent.json";

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
	};

	let session: string | null = null;
	let wRole: string | null = null;
	const userID: string | null = id;
	const userPassword: string | null = password;
	let name: string | null = null;
	let stuDept: string | null = null;
	let cRole: Array<string> | null = null;

	await fetch("http://140.128.156.106/MDAPP/SloginX.php", requestOptions)
		.then((response) => response.text())
		.then((result) => {
			// Find session
			const sessionMatches = result.match(/session=([A-Z0-9]+)/g);
			if (sessionMatches) {
				let sessionTMP: string[] = [];
				sessionTMP = [...new Set(sessionMatches)];
				session = sessionTMP[0].replace("session=", "");
			} else {
				session = null;
			}

			// Find wRole
			const roleMatches = result.match(/wRole=([A-Z]+)/g);
			if (roleMatches) {
				let roleTMP: string[] = [];
				roleTMP = [...new Set(roleMatches)];
				wRole = roleTMP[0].replace("wRole=", "");
			} else {
				wRole = null;
			}

			// Find department
			const deptMatches = result.match(/dept=([^&'"]+)/g);
			if (deptMatches) {
				let deptTMP: string[] = [];
				deptTMP = [...new Set(deptMatches)];
				stuDept = deptTMP[0].replace("dept=", "");
			} else {
				stuDept = null;
			}

			// Find user name
			const userNameMatches1 = result.match(/usrName">([^<]+)/);
			if (userNameMatches1) {
				let userNameTMP: string[] = [];
				userNameTMP = [...new Set(userNameMatches1)];
				name = userNameTMP[0].replace('usrName">', "");
			}

			if (!name) {
				const userNameMatches2 = result.match(/Name:([^'"\n]+)/g);
				if (userNameMatches2) {
					let userNameTMP: string[] = [];
					userNameTMP = [...new Set(userNameMatches2)];
					name = userNameTMP[0].replace("Name:", "");
				}
			}

			if (!name) {
				name = null;
			}

			// Find cRole options count
			const cRoleSelectMatch = result.match(
				/<select[^>]*cRole[^>]*>(.*?)<\/select>/s,
			);
			if (cRoleSelectMatch) {
				const optionDetailMatches = cRoleSelectMatch[1].match(
					/<option[^>]*value\s*=\s*["']([^"']*)["'][^>]*>/g,
				);
				if (optionDetailMatches) {
					const cRoleTMP: string[] = [];
					optionDetailMatches.map((option) => {
						const valueMatch = option.match(/value\s*=\s*["']([^"']*)["']/);
						if (valueMatch) {
							cRoleTMP.push(valueMatch[1]);
						}
					});
					cRole = cRoleTMP;
				} else {
					cRole = [];
				}
			} else {
				cRole = [];
			}
		})
		.catch((error: any) => console.log("error", error));

	let code: string | null = null;
	let mail: string | null = null;
	let className: string | null = null;
	let userIdentity: string | null = null;

	if (session) {
		const formdata = new FormData();
		formdata.append("sess", session);

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
				code = result.code;
				mail = result.mail;
				className = result.class_name;
				userIdentity = result.user_identity;
			})
			.catch((error) => console.log("error", error));
	}

	return NextResponse.json(
		{
			name,
			userID,
			userPassword,
			session,
			wRole,
			cRole,
			code,
			mail,
			className,
			userIdentity,
			stuDept,
		},
		{ status: 200 },
	);
}
