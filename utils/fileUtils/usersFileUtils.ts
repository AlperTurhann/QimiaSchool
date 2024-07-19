import fs from "fs";
import path from "path";
import { UserProps } from "@/types/UserTypes";
import { IFileUtils } from "@/utils/fileUtils/IFileUtils";

const filePath = path.join(process.cwd(), "public", "data", "users.json");

const readData = () => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const writeData = (data: UserProps[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const usersUtils: IFileUtils<UserProps> = {
  readData,
  writeData,
};

export default usersUtils;
