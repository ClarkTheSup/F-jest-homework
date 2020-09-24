import axios from "axios";
import { register } from "../user";
import { verifyPassword, verifyUsername } from "../verify";

// jest.mock("../verify", () => ({
//   ...jest.requireActual("../verify"),
// }));

// TODO feedback: 因为是单元测试，所以需要mock依赖，不然就变成了集成测试
jest.mock("../verify");
jest.mock("axios");

describe("register", () => {
  test("should post user when validated", async () => {
    // TODO 19: add test here
    axios.post.mockResolvedValue({ data: "success" });
    await expect(register("lkn", "123")).resolves.toEqual("success");
    expect(axios.post).toHaveBeenCalledTimes(1);
  });

  test("should reject with Error when username is invalid", async () => {
    // TODO 20: add test here
    verifyUsername.mockReturnValue(true);
    verifyPassword.mockReturnValue(false);
    await expect(() => register(null, null)).rejects.toThrowError(
      "wrong username or password"
    );
  });
});
