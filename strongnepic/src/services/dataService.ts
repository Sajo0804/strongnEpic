import jsonData from "../mockData.json";
import { User } from "../types/User";
import { GymClass } from "../types/GymClass";

// Define the JsonData type
type JsonData = {
  users: User[];
  classes: GymClass[];
};

// Destructure the imported JSON data
const { users, classes } = jsonData as JsonData;

export { users, classes };

