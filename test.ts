type Address = {
  houseNo: number;
  city: string;
  state: string;
};

type Person = {
  name: string;
  age: number;
  married: boolean;
  address?: Address;
};

const user1: Person = {
  name: "Arnold",
  age: 25,
  married: false,
};

let ages: number[] = [100, 1]; // must be an array of only numbers

type userRole = "Admin" | "user" | "member";

const userName: userRole = "user";

let test: any = 1;
test = "one";
test = false;
