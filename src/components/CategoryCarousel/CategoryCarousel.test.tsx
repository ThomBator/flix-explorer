import { describe, it, expect, vi } from "vitest";
import { render, screen } from "../../test-utils/index";
import CategoryCarousel from "./CategoryCarousel";

// Mock ContentCard
vi.mock("../ContentCard/ContentCard", () => ({
  __esModule: true,
  default: ({
    content,
  }: {
    content: { id: string | number; title: string };
  }) => (
    <div data-testid="card" data-id={content.id}>
      {content.title}
    </div>
  ),
}));

const sampleData = [
  { id: 1, title: "Heat" },
  { id: 2, title: "Dune" },
  { id: 3, title: "Alien" },
];

describe("CategoryCarousel", () => {
  it("renders the title", () => {
    render(
      <CategoryCarousel
        title="Trending"
        url="/trending"
        categoryData={sampleData}
      />
    );
    expect(
      screen.getByRole("heading", { name: /trending/i })
    ).toBeInTheDocument();
  });

  it("renders the see more link with correct href", () => {
    render(
      <CategoryCarousel
        title="Trending"
        url="/trending"
        categoryData={sampleData}
      />
    );
    // pick one:
    // const link = screen.getByRole('link', { name: /see more/i, hidden: true });
    const link = screen.getByText(/see more/i, { selector: "a" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/trending");
  });
});
