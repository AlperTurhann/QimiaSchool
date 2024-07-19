import fs from "fs";
import path from "path";
import { CourseProps } from "@/types/CourseTypes";
import { IFileUtils } from "@/utils/fileUtils/IFileUtils";

const filePath = path.join(process.cwd(), "public", "data", "courses.json");

const readData = () => {
  const jsonData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(jsonData);
};

const writeData = (data: CourseProps[]) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const coursesUtils: IFileUtils<CourseProps> = {
  readData,
  writeData,
};

export default coursesUtils;
