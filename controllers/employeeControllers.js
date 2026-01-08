import {
  createEmployeeService,
  getEmployeesService,
  updateEmployeeService,
  archiveEmployeeService,
  getRecentEmployeesService,
  getPerformanceStatsService,
  getDashboardSummaryService,
  getDepartmentWiseCountService,
  getTopPerformersService
} from "../services/employeeServices.js";

//CREATE EMPLOYEE
export const createEmployee = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Employee image is required",
      });
    }

    const employee = await createEmployeeService(req.body, req.file);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//GET LIST
export const getEmployees = async (req, res) => {
  try {
    const result = await getEmployeesService(req.query);

    res.status(200).json({
      success: true,
      message: "Employee list fetched",
      data: result.data,
      total: result.total,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//UPDATE
export const updateEmployee = async (req, res) => {
  try {
    const employee = await updateEmployeeService(
      req.params.id,
      req.body
    );

    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//ARCHIVE
export const archiveEmployee = async (req, res) => {
  try {
    const employee = await archiveEmployeeService(req.params.id);
    res.status(200).json({ success: true, employee });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//RECENT
export const getRecentEmployees = async (req, res) => {
  try {
    const employees = await getRecentEmployeesService(
      Number(req.query.limit) || 10
    );
    res.status(200).json({ success: true, employees });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//PERFORMANCE
export const getPerformanceStats = async (req, res) => {
  try {
    const stats = await getPerformanceStatsService();
    res.status(200).json({ success: true, stats });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

//DASHBOARD SUMMARY
export const getDashboardSummary = async (req, res) => {
  try {
    const summary = await getDashboardSummaryService();

    res.status(200).json({
      success: true,
      message: "Dashboard summary fetched successfully",
      data: summary,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//DEPARTMENT PIE CHART
export const getDepartmentWiseCount = async (req, res) => {
  try {
    const data = await getDepartmentWiseCountService();

    res.status(200).json({
      success: true,
      message: "Department-wise employee count fetched",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//TOP PERFORMERS
export const getTopPerformers = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 5;

    const performers = await getTopPerformersService(limit);

    res.status(200).json({
      success: true,
      message: "Top performers fetched successfully",
      data: performers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



