import axios from "axios";
import { register } from "../user";
import { verifyUsername } from "../verify";

jest.mock("../verify");
jest.mock("axios");

describe("register", () => {
  test("should post user when validated", async () => {
    // TODO 19: add test here
    axios.post.mockResolvedValue({ data: "success" });
    await expect(register()).resolves.toEqual("success");
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test("should reject with Error when username is invalid", async () => {
    // TODO 20: add test here
    verifyUsername.mockReturnValue(false);
    await expect(() => register()).rejects.toThrowError(
      "wrong username or password"
    );
  });
});
