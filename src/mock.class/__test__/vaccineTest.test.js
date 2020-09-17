import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

jest.mock("../recipient", () => {
  // mock class实现
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: jest.fn(),
      getHasAntibodies: jest.fn(),
    };
  });
});

beforeEach(() => {
  // clear mock here
  jest.resetModules();
});

describe("inject", () => {
  test("should recipient accept injection with vaccine", () => {
    // TODO 14: add test here
    const recipient = new Recipient();
    recipient.acceptInjection(new Covid19Vaccine());
    expect(recipient.acceptInjection).toHaveBeenCalledTimes(1);
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    // TODO 15: add test here
    const recipient = new Recipient();
    recipient.getHasAntibodies.mockReturnValueOnce(true);
    const vaccineTest = new VaccineTest();
    vaccineTest.recipient = recipient;
    expect(vaccineTest.test()).toBe("Vaccine Test Success");
  });

  test("should get Failed if recipient has no antibodies", () => {
    // TODO 16: add test here
    const recipient = new Recipient();
    recipient.getHasAntibodies.mockReturnValueOnce(false);
    const vaccineTest = new VaccineTest();
    vaccineTest.recipient = recipient;
    expect(vaccineTest.test()).toBe("Vaccine Test Failed");
  });
});
