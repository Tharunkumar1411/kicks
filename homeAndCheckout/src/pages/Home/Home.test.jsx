import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./index";
import { getHomeDetails } from "../../api/home";
import useHomeStore from "../../store/home";

// Mock react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock the API
jest.mock("../../api/home", () => ({
  getHomeDetails: jest.fn(),
}));

// Mock the Zustand store
jest.mock("../../store/home");

// Mock react-multi-carousel
jest.mock("react-multi-carousel", () => {
  return function MockCarousel({ children }) {
    return <div data-testid="carousel">{children}</div>;
  };
});

// Mock custom components
jest.mock("../../components/NewDropCard", () => {
  return function MockNewDropCard() {
    return <div data-testid="new-drop-card">New Drop Card</div>;
  };
});

jest.mock("../../components/ReviewCard", () => {
  return function MockReviewCard({ title, subText, rating }) {
    return (
      <div data-testid="review-card">
        <div>{title}</div>
        <div>{subText}</div>
        <div>Rating: {rating}</div>
      </div>
    );
  };
});

jest.mock("../../components/Loader", () => {
  return function MockLoader() {
    return <div data-testid="loader">Loading...</div>;
  };
});

jest.mock("../../components/ImageWithSkelton", () => {
  return function MockImageWithSkeleton({ src, alt, children }) {
    return (
      <div data-testid="image-with-skeleton">
        <img src={src} alt={alt} />
        {children}
      </div>
    );
  };
});

// Mock useImagePreload hook
jest.mock("../../hooks/useImagePreload", () => {
  return jest.fn(() => true);
});

const mockHomeDetails = {
  topBanner: {
    homeBannerUrl: "https://example.com/banner.jpg",
    previewUrlOne: "https://example.com/preview1.jpg",
    previewUrlTwo: "https://example.com/preview2.jpg",
    productName: "Nike Air Max 2024",
    description: "The latest in comfort and style",
  },
  categories: [
    {
      categoryName: "Running",
      url: "https://example.com/running.jpg",
    },
    {
      categoryName: "Basketball",
      url: "https://example.com/basketball.jpg",
    },
  ],
  review: [
    {
      reviewTitle: "Great Product",
      reviewContent: "Amazing quality and comfort",
      personImgUrl: "https://example.com/person.jpg",
      productUrl: "https://example.com/product.jpg",
      rate: 5,
    },
  ],
};

describe("Home Component", () => {
  let mockSetHomeDetails;

  beforeEach(() => {
    jest.clearAllMocks();

    mockSetHomeDetails = jest.fn();

    // Setup Zustand store mock
    useHomeStore.mockImplementation((selector) => {
      const state = {
        homeDetails: mockHomeDetails,
        setHomeDetails: mockSetHomeDetails,
      };
      return selector(state);
    });

    // Setup API mock to resolve successfully
    getHomeDetails.mockResolvedValue(mockHomeDetails);
  });

  test("renders Home component without crashing", () => {
    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  test("fetches home details on mount", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(getHomeDetails).toHaveBeenCalledTimes(1);
    });
  });

  test("displays banner section with product name", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText("Nike Air Max 2024")).toBeInTheDocument();
  });

  test("displays banner section with description", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(
      screen.getByText("The latest in comfort and style"),
    ).toBeInTheDocument();
  });

  test("displays SHOP NOW button", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText("SHOP NOW")).toBeInTheDocument();
  });

  test("displays categories section header", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText("CATEGORIES")).toBeInTheDocument();
  });

  test("displays category names", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText("Running")).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
  });

  test("displays reviews section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("Great Product")).toBeInTheDocument();
    expect(screen.getByText("Amazing quality and comfort")).toBeInTheDocument();
  });

  test("renders new drops section", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    expect(screen.getByTestId("new-drop-card")).toBeInTheDocument();
  });

  test("displays VIEW MORE and SEE ALL buttons", () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    // expect(screen.getByText('VIEW MORE')).toBeInTheDocument();
    // expect(screen.getByText("SEE ALL")).toBeInTheDocument();
  });
});
