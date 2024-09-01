import React, { act } from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Header from "../header"
// eslint-disable-next-line jest/no-mocks-import
import wrapper from "../../../__mocks__/provider-wrapper"

jest.useFakeTimers()

describe("Header", () => {
  it("should render", () => {
    const { container } = render(<Header />, { wrapper })
    expect(container).toBeInTheDocument()
    expect(screen.getByTestId("movie-db-header")).toBeInTheDocument()
  })

  it("should clear the query params after search is cleared", () => {
    render(<Header />, { wrapper })
    const searchInput = screen.getByTestId("search-movies")
    expect(searchInput.value).toBe("")
    fireEvent.change(searchInput, { target: { value: "test" } })
    act(() => {
      jest.advanceTimersByTime(600)
    })
    fireEvent.change(searchInput, { target: { value: "" } })
    act(() => {
      jest.advanceTimersByTime(600)
    })
    expect(searchInput.value).toBe("")
  })

  it("should updated search in query params", () => {
    render(<Header />, { wrapper })
    const searchInput = screen.getByTestId("search-movies")
    expect(searchInput.value).toBe("")
    fireEvent.change(searchInput, { target: { value: "test" } })
    act(() => {
      jest.advanceTimersByTime(600)
    })
    expect(searchInput.value).toBe("test")
  })
})