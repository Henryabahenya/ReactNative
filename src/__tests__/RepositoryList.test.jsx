import { render, screen, within } from "@testing-library/react-native";
import RepositoryList from "../components/RepositoryList";

const repositories = [
  {
    id: "jaredpalmer.formik",
    fullName: "jaredpalmer/formik",
    description: "Build forms in React, without the tears",
    language: "TypeScript",
    stargazersCount: 218000,
    forksCount: 2200,
    reviewCount: 880,
    ratingAverage: 88,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/1930?v=4",
  },
  {
    id: "rails.rails",
    fullName: "rails/rails",
    description: "Ruby on Rails",
    language: "Ruby",
    stargazersCount: 520000,
    forksCount: 21000,
    reviewCount: 1200,
    ratingAverage: 92,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4223?v=4",
  },
  {
    id: "facebook.react",
    fullName: "facebook/react",
    description:
      "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
    language: "JavaScript",
    stargazersCount: 2100000,
    forksCount: 440000,
    reviewCount: 1500,
    ratingAverage: 95,
    ownerAvatarUrl: "https://avatars.githubusercontent.com/u/69631?v=4",
  },
];

describe("RepositoryList", () => {
  describe("should render repository items", () => {
    beforeEach(() => {
      render(<RepositoryList />);
    });

    it("should render the correct number of repository items", () => {
      const items = screen.getAllByTestId("repositoryItem");
      expect(items).toHaveLength(repositories.length);
    });

    describe("First repository", () => {
      it("should display the fullName", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[0]).getByText(repositories[0].fullName),
        ).toBeTruthy();
      });

      it("should display the description", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[0]).getByText(repositories[0].description),
        ).toBeTruthy();
      });

      it("should display the language", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[0]).getByText(repositories[0].language),
        ).toBeTruthy();
      });

      it("should display the stargazers count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[0]).getByText("218.0k")).toBeTruthy();
      });

      it("should display the forks count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[0]).getByText("2.2k")).toBeTruthy();
      });

      it("should display the review count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[0]).getByText("880")).toBeTruthy();
      });

      it("should display the rating average", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[0]).getByText("88")).toBeTruthy();
      });
    });

    describe("Second repository", () => {
      it("should display the fullName", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[1]).getByText(repositories[1].fullName),
        ).toBeTruthy();
      });

      it("should display the description", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[1]).getByText(repositories[1].description),
        ).toBeTruthy();
      });

      it("should display the language", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(
          within(items[1]).getByText(repositories[1].language),
        ).toBeTruthy();
      });

      it("should display the stargazers count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[1]).getByText("520.0k")).toBeTruthy();
      });

      it("should display the forks count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[1]).getByText("21.0k")).toBeTruthy();
      });

      it("should display the review count formatted", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[1]).getByText("1.2k")).toBeTruthy();
      });

      it("should display the rating average", () => {
        const items = screen.getAllByTestId("repositoryItem");
        expect(within(items[1]).getByText("92")).toBeTruthy();
      });
    });
  });
});
