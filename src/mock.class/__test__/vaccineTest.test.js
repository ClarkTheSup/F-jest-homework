import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

// jest.mock("../recipient", () => {
//   // mock class实现
//   return jest.fn().mockImplementation(() => {
//     return {
//       acceptInjection: jest.fn((vaccine) => {
//         if (vaccine.composition.includes("Virus Proteins")) {
//           return true;
//         }
//         return false;
//       }),
//       getHasAntibodies: jest.fn((hasAntibodies) => hasAntibodies),
//     };
//   });
// });

// TODO feedback: 我们应该定义一个需要mock的方法的变量，这样后面再test()里面就都可以使用这个变量了
const mockAcceptInjection = jest.fn();
const mockGetHasAntibodies = jest.fn(() => false);

jest.mock("../recipient", () => {
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: mockAcceptInjection,
      getHasAntibodies: mockGetHasAntibodies,
    };
  });
});

beforeEach(() => {
  // clear mock here
  // jest.resetModules();
  Recipient.mockClear();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    // TODO 14: add test here
    //   const recipient = new Recipient();
    //   const result = recipient.acceptInjection(new Covid19Vaccine());
    //   expect(result).toBe(true);
    // });
    //  TODO feedback: 这整个测试文件测的是VaccineTest这个类，所以应该测试这个类上面的方法，而不是Recipient
    const vaccineTest = new VaccineTest();
    vaccineTest.inject();

    expect(mockAcceptInjection).toHaveBeenCalledWith(
      expect.any(Covid19Vaccine)
    );
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    // TODO 15: add test here
    // const recipient = new Recipient();
    // const hasAntibodies = true;
    // expect(recipient.getHasAntibodies(hasAntibodies)).toBe(true);
    //  TODO feedback: 这整个测试文件测的是VaccineTest这个类，所以应该测试这个类上面的方法，而不是Recipient
    const vaccineTest = new VaccineTest();
    mockGetHasAntibodies.mockImplementation(() => true);
    expect(vaccineTest.test()).toBe("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    // TODO 16: add test here
    // const recipient = new Recipient();
    // const hasAntibodies = false;
    // expect(recipient.getHasAntibodies(hasAntibodies)).toBe(false);
    //  TODO feedback: 这整个测试文件测的是VaccineTest这个类，所以应该测试这个类上面的方法，而不是Recipient
    mockGetHasAntibodies.mockImplementation(() => false);
    const vaccineTest = new VaccineTest();
    expect(vaccineTest.test()).toBe("Vaccine Test Failed");
  });
});
