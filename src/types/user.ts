export type Student = {
	id: string; // 學生 ID
	name: string; // 學生姓名
	role: string; // 學生身分
	code: string; // 學生學號
	dept: string; // 學生部別
	session: string; // 學生 session
};

export type User = {
	id: string; // 使用者 ID
	password: string; // 使用者密碼
	cRole: string; // 使用者目前身分
	wRole: string[]; // 使用者所有身分
	name: string; // 使用者姓名
	stuCode: string; // 使用者學號
	stuDept: string; // 使用者部別
	stuSession: string; // 使用者學生 session
	parSession: string; // 使用者家長 session
	empSession: string; // 使用者教職員 session
	aluSession: string; // 使用者校友 session
	cStuSession: string; // 使用者綁定之學生 session
	cStu: Student | null; // 綁定學生資訊
	wStu: Student[]; // 所有學生資訊
};
