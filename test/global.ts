jest.mock("../src/config", () => ({
    getTodoAPI: () => "http://mock/api",
    isDevelopment: () => true
}))