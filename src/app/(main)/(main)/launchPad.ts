import type { User } from "@/types/user";
import { getStuLaunchPad } from "./stuLaunchPad";
import { getEmpLaunchPad } from "./empLaunchPad";
import { getParLaunchPad } from "./parLaunchPad";
import { getAluLaunchPad } from "./aluLaunchPad";

export function getLaunchPad(userData: User) {
	if (!userData) {
		return [];
	}

	if (userData.cRole === "STU") {
		return getStuLaunchPad(userData);
	} else if (userData.cRole === "EMP") {
		return getEmpLaunchPad(userData);
	} else if (userData.cRole === "PAR") {
		return getParLaunchPad(userData);
	} else if (userData.cRole === "ALU") {
		return getAluLaunchPad(userData);
	} else {
		return false;
	}
}
