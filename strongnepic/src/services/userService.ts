import { User } from "../types/User";
import { GymClass } from "../types/GymClass";
import { classes, users } from "./dataService";

// Helper function to find a user by their ID
export function getUserById(id: number): User | undefined {
  const foundUser: User | undefined = users.find((user) => user.id === id);
  return foundUser;
}

// Helper function to find a class by its ID.
export function getClassById(id: number): GymClass | undefined {
  const foundClass: GymClass | undefined = classes.find((cls) => cls.id === id);
  return foundClass;
}

