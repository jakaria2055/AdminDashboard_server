import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({

  name: { type: String, required: true },
  department: { type: String, required: true },
  role: { type: String, required: true },
  status: {
    type: String,
    enum: ["Active", "Inactive", "On Leave"],
    required: true
  },
  joiningDate: {
    type: Date,
    required: true
  },
  performanceScore: {
    type: Number,
    min: 1,
    max: 100,
    default: 50
  },
  isArchived: {
    type: Boolean,
    default: false
  },

}, { timestamps: true });


const EmployeeModel = mongoose.model("Employee", employeeSchema);
export default EmployeeModel;

