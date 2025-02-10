import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Movie from "../movie";
// eslint-disable-next-line jest/no-mocks-import
import { movie } from "../../../constants/jest-helpers";
// eslint-disable-next-line jest/no-mocks-import
import wrapper from "../../../__mocks__/provider-wrapper";

describe("Movies", () => {
  const mockViewTrailer = jest.fn();
  const mockToggleWatchLater = jest.fn();
  const mockToggleStarred = jest.fn();
  it("should render", () => {
    const { container } = render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    expect(container).toBeDefined();
  });

  it("should add to watch list", () => {
    render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const watchLater = screen.getByTestId("watch-later");
    fireEvent.click(watchLater);
    expect(mockToggleWatchLater).toHaveBeenCalled();
  });

  it("should remove from watch list", () => {
    render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        watchLater={true}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const removeWatchLater = screen.getByTestId("remove-watch-later");
    fireEvent.click(removeWatchLater);
    expect(mockToggleWatchLater).toHaveBeenCalled();
  });

  it("should add to starred list", () => {
    render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const star = screen.getByTestId("starred-link");
    fireEvent.click(star);
    expect(mockToggleStarred).toHaveBeenCalled();
  });

  it("should remove from starred list", () => {
    render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        isStarred={true}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const unstar = screen.getByTestId("unstar-link");
    fireEvent.click(unstar);
    expect(mockToggleStarred).toHaveBeenCalled();
  });

  it("should call the view trailer function", () => {
    render(
      <Movie
        movie={movie}
        viewTrailer={mockViewTrailer}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const viewTrailer = screen.getByTestId("view-trailer");
    fireEvent.click(viewTrailer);
    expect(mockViewTrailer).toHaveBeenCalled();
  });

  it("should load placeholder image if the poster path is not available", () => {
    render(
      <Movie
        movie={{ ...movie, poster_path: undefined }}
        viewTrailer={mockViewTrailer}
        toggleWatchLater={mockToggleWatchLater}
        toggleStarred={mockToggleStarred}
      />,
      { wrapper }
    );
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "/images/not-found-500X750.jpeg");
  });
});
