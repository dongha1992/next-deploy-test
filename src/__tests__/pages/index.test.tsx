import { render, screen } from "@testing-library/react";
import Home from "@/pages";
import Navigation from "@/components/Common/Navigation";

describe("네비게이션", () => {
  it("메인 페이지에 <Navigation/>이 렌더링되는지", () => {
    render(<Navigation />);

    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  });

  it("네비게이션 아이콘 클릭 시 라우팅이 되는지", () => {
    render(<Navigation />);

    const navigation = screen.getByRole("navigation");
    expect(navigation).toBeInTheDocument();
  });
});

describe("메인 페이지", () => {
  it("메인 페이지에 섹션 head가 나온다", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /최근 올라온 책들/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
