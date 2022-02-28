import React from "react";
import { Provider } from "react-redux";
import { fireEvent, render, waitFor } from "@testing-library/react-native";

import ProductCard from "../ProductCard";
import store from "../../store";

const productMock = {
  code: "1024613_group_002",
  name: "Oversized Hooded Jacket",
  quantity: 1,
  stock: {
    stockLevel: 1,
  },
  price: {
    currencyIso: "USD",
    value: 29.99,
    priceType: "BUY",
    formattedValue: "$ 29.99",
    type: "WHITE",
  },
  images: [
    {
      url: "https://lp2.hm.com/hmgoepprod?set=source[/83/b3/83b356d257923dc276fc2138e29370e7bf22b7c1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]",
    },
  ],
  categories: [],
  pk: "9335892869121",
  whitePrice: {
    currencyIso: "USD",
    value: 29.99,
    priceType: "BUY",
    formattedValue: "$ 29.99",
    type: "WHITE",
  },
  articles: [
    {
      code: "1024613002",
      name: "Oversized Hooded Jacket",
      images: [
        {
          url: "https://lp2.hm.com/hmgoepprod?set=source[/83/b3/83b356d257923dc276fc2138e29370e7bf22b7c1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]",
        },
      ],
      pk: "9320789278721",
      whitePrice: {
        currencyIso: "USD",
        value: 29.99,
        priceType: "BUY",
        formattedValue: "$ 29.99",
        type: "WHITE",
      },
      logoPicture: [
        {
          url: "https://lp2.hm.com/hmgoepprod?set=source[/5b/60/5b606c83bd1d914f6d339db831c7f60481b8fdc2.jpg],origin[dam],category[],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
        },
      ],
      normalPicture: [
        {
          url: "https://lp2.hm.com/hmgoepprod?set=source[/5b/60/5b606c83bd1d914f6d339db831c7f60481b8fdc2.jpg],origin[dam],category[],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
        },
      ],
      markers: [
        {
          text: "Conscious choice  ",
          type: "ENVIRONMENT",
        },
      ],
      visible: false,
      numbersOfPieces: 0,
      ticket:
        "Oy9wbHAvcHJvZHVjdC1saXN0LXdpdGgtY291bnQvcHJvZHVjdC1saXN0OyM7cHJvZHVjdF9rZXk7MTAyNDYxM19ncm91cF8wMDJfZW5fdXM7MTAyNDYxMzAwMl9lbl91cztPQkpFQ1RJVkUkO05PTkU6Tk9ORTs0MDs",
      dummy: false,
      ecoTaxValue: 0,
      redirectToPdp: false,
      comingSoon: false,
      color: {
        code: "000000",
        text: "Black",
        filterName: "Black_000000",
        hybrisCode: "09",
      },
      rgbColor: "#272628",
      genArticle: "024613002225",
      environmentalMarkers: ["Conscious choice  "],
    },
  ],
  markers: [
    {
      text: "Conscious choice  ",
      type: "ENVIRONMENT",
    },
  ],
  visible: false,
  concept: ["BASICS ,DIVIDED"],
  numbersOfPieces: 0,
  defaultArticle: {
    code: "1024613002",
    name: "Oversized Hooded Jacket",
    images: [
      {
        url: "https://lp2.hm.com/hmgoepprod?set=source[/83/b3/83b356d257923dc276fc2138e29370e7bf22b7c1.jpg],origin[dam],category[],type[DESCRIPTIVESTILLLIFE],res[m],hmver[2]&call=url[file:/product/style]",
      },
    ],
    pk: "9320789278721",
    whitePrice: {
      currencyIso: "USD",
      value: 29.99,
      priceType: "BUY",
      formattedValue: "$ 29.99",
      type: "WHITE",
    },
    logoPicture: [
      {
        url: "https://lp2.hm.com/hmgoepprod?set=source[/5b/60/5b606c83bd1d914f6d339db831c7f60481b8fdc2.jpg],origin[dam],category[],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
      },
    ],
    normalPicture: [
      {
        url: "https://lp2.hm.com/hmgoepprod?set=source[/5b/60/5b606c83bd1d914f6d339db831c7f60481b8fdc2.jpg],origin[dam],category[],type[LOOKBOOK],res[m],hmver[1]&call=url[file:/product/main]",
      },
    ],
    markers: [
      {
        text: "Conscious choice  ",
        type: "ENVIRONMENT",
      },
    ],
    visible: false,
    numbersOfPieces: 0,
    ticket:
      "Oy9wbHAvcHJvZHVjdC1saXN0LXdpdGgtY291bnQvcHJvZHVjdC1saXN0OyM7cHJvZHVjdF9rZXk7MTAyNDYxM19ncm91cF8wMDJfZW5fdXM7MTAyNDYxMzAwMl9lbl91cztPQkpFQ1RJVkUkO05PTkU6Tk9ORTs0MDs",
    dummy: false,
    ecoTaxValue: 0,
    redirectToPdp: false,
    comingSoon: false,
    color: {
      code: "000000",
      text: "Black",
      filterName: "Black_000000",
      hybrisCode: "09",
    },
    rgbColor: "#272628",
    genArticle: "024613002225",
    environmentalMarkers: ["Conscious choice  "],
  },
  sale: false,
  variantSizes: [
    {
      orderFilter: 369,
      filterCode: "M",
    },
    {
      orderFilter: 366,
      filterCode: "S",
    },
    {
      orderFilter: 357,
      filterCode: "XXS",
    },
    {
      orderFilter: 372,
      filterCode: "XL",
    },
    {
      orderFilter: 363,
      filterCode: "XS",
    },
    {
      orderFilter: 375,
      filterCode: "XXL",
    },
    {
      orderFilter: 370,
      filterCode: "L",
    },
  ],
  swatches: [],
  articleCodes: ["1024613002", "1024613001", "1024613006", "1024613007"],
  ticket:
    "Oy9wbHAvcHJvZHVjdC1saXN0LXdpdGgtY291bnQvcHJvZHVjdC1saXN0OyM7cHJvZHVjdF9rZXk7MTAyNDYxM19ncm91cF8wMDJfZW5fdXM7MTAyNDYxMzAwMl9lbl91cztPQkpFQ1RJVkUkO05PTkU6Tk9ORTs0MDs",
  searchEngineProductId: "1024613_group_002_en_us",
  dummy: false,
  linkPdp: "/en_us/productpage.1024613002.html",
  categoryName: "Ladies",
  rgbColors: ["#272628", "#EEEDE1", "#3C2A2B", "#515359"],
  articleColorNames: ["Black", "White", "Dark brown", "Dark gray"],
  ecoTaxValue: 0,
  swatchesTotal: 5,
  showPriceMarker: false,
  redirectToPdp: false,
  mainCategoryCode: "ladies_basics_tops_longsleeve",
  comingSoon: false,
  brandName: "H&M",
};

const ProductCardWithWrapper = (props) => {
  return (
    <Provider store={store}>
      <ProductCard {...props} />
    </Provider>
  );
};

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
    }),
  };
});

// jest.mock("../../store/cart/cartSlice.tsx", () => ({
//   addProductToCart: jest.fn(),
// }));

describe("ProductCard", () => {
  it("should render correctly", () => {
    const { toJSON } = render(<ProductCardWithWrapper product={productMock} />);

    expect(toJSON()).toMatchSnapshot();
  });

  it("should render product name correctly", () => {
    const { getByText } = render(
      <ProductCardWithWrapper product={productMock} />
    );

    expect(getByText(productMock.name)).toBeDefined();
  });

  it("should increase quantity when button clicked", () => {
    const { getByText, findByTestId } = render(
      <ProductCardWithWrapper product={productMock} showCartControls />
    );

    const button = getByText("+");

    fireEvent.press(button);

    waitFor(() => {
      const quantityEl = findByTestId("quantity");
      expect(store.getState().cart.products[productMock.code].quantity).toBe(
        productMock.quantity + 1
      );
    });
  });
});
