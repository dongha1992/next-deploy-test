import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import Home from "@/pages";
import Navigation from "@/components/Common/Navigation";

import MockAdapter from "axios-mock-adapter";
import { apiClient } from "@/utils/api/apiClient";
import { MOCK_RECENT_BOOKS } from "../../mock";

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
  it("메인 페이지에 섹션 head가 나오는지", () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /최근 올라온 책들/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("메인 페이지에서 api 호출이 되는지", async () => {
    render(<Home />);

    const mockApiClient = new MockAdapter(apiClient);
    mockApiClient.onGet("/api/books/recent").reply(200, MOCK_RECENT_BOOKS);
    // const useQueryMock = jest
    //   .spyOn(ReactQuery, "useQuery")
    //   .mockImplementation();

    // await waitForElementToBeRemoved(screen.getByTestId("loading"));
    screen.debug();
  });
});
