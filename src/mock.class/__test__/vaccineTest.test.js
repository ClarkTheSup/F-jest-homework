// eslint-disable-next-line no-unused-vars
import VaccineTest from "../vaccineTest";
import Recipient from "../recipient";
import Covid19Vaccine from "../covid19Vaccine";

jest.mock("../recipient", () => {
  // mock class实现
  return jest.fn().mockImplementation(() => {
    return {
      acceptInjection: jest.fn((vaccine) => {
        if (vaccine.composition.includes("Virus Proteins")) {
          return true;
        }
        return false;
      }),
      getHasAntibodies: jest.fn((hasAntibodies) => hasAntibodies),
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
    const result = recipient.acceptInjection(new Covid19Vaccine());
    expect(result).toBe(true);
  });
});

describe("test", () => {
  test("should get Success if recipient has antibodies", () => {
    // TODO 15: add test here
    const recipient = new Recipient();
    const hasAntibodies = true;
    expect(recipient.getHasAntibodies(hasAntibodies)).toBe(true);
  });

  test("should get Failed if recipient has no antibodies", () => {
    // TODO 16: add test here
    const recipient = new Recipient();
    const hasAntibodies = false;
    expect(recipient.getHasAntibodies(hasAntibodies)).toBe(false);
  });
});
