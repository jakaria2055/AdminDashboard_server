import EmployeeModel from "../model/employeeModel.js";
import cloudinary from "../utility/cloudinary.js";

//CREATE EMPLOYEE
export const createEmployeeService = async (body, file) => {
  const {
    employeeID,
    name,
    department,
    role,
    status,
    joiningDate,
    performanceScore,
  } = body;

  if (!employeeID || !name || !department || !role || !status || !joiningDate) {
    throw new Error("Required fields are missing");
  }

  if (new Date(joiningDate) > new Date()) {
    throw new Error("Joining date cannot be in the future");
  }

  if (performanceScore < 1 || performanceScore > 100) {
    throw new Error("Performance score must be between 1 and 100");
  }

  const exists = await EmployeeModel.findOne({ employeeID });
  if (exists) throw new Error("Employee already exists");

  const upload = await cloudinary.uploader.upload(file.path, {
    folder: "employees",
  });

  return await EmployeeModel.create({
    employeeID,
    name,
    department,
    role,
    image: upload.secure_url,
    status,
    joiningDate,
    performanceScore,
    isArchived: false,
  });
};

//GET EMPLOYEES (FILTER)
export const getEmployeesService = async (queryParams) => {
  const {
    search,
    department,
    status,
    archived,
    sortBy = "createdAt",
    order = "desc",
    page = 1,
    limit = 10,
  } = queryParams;

  const andConditions = [];

  if (archived === "true") andConditions.push({ isArchived: true });
  if (archived === "false") andConditions.push({ isArchived: false });

  if (department) andConditions.push({ department });
  if (status) andConditions.push({ status });

  if (search) {
    andConditions.push({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { department: { $regex: search, $options: "i" } },
        { role: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ],
    });
  }

  const query =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const data = await EmployeeModel.find(query)
    .sort({ [sortBy]: order === "asc" ? 1 : -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await EmployeeModel.countDocuments(query);

  return { data, total };
};

//UPDATE EMPLOYEE
export const updateEmployeeService = async (id, body) => {
  return await EmployeeModel.findByIdAndUpdate(id, body, { new: true });
};

//ARCHIVE EMPLOYEE
export const archiveEmployeeService = async (id) => {
  return await EmployeeModel.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );
};

//RECENT EMPLOYEES
export const getRecentEmployeesService = async (limit = 10) => {
  return await EmployeeModel.find({ isArchived: false })
    .sort({ joiningDate: -1 })
    .limit(limit);
};

//PERFORMANCE STATS
export const getPerformanceStatsService = async () => {
  const employees = await EmployeeModel.find({ isArchived: false });

  return {
    excellent: employees.filter(e => e.performanceScore >= 85).length,
    good: employees.filter(e => e.performanceScore >= 70 && e.performanceScore < 85).length,
    average: employees.filter(e => e.performanceScore >= 50 && e.performanceScore < 70).length,
    poor: employees.filter(e => e.performanceScore < 50).length,
  };
};
