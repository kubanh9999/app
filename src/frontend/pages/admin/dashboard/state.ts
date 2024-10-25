import { DashBoardService } from "api/services/dashboard.service";
import { atom, selector } from "recoil";
import { productsState } from "state";

export const getYearReveneState = selector<any>({
  key: "getYearReveneState",
  get: async () => await DashBoardService.getYearRevenue(),
});

export const getYearReveneTotalState = selector<number>({
  key: "getYearReveneTotalState",
  get: ({ get }) => {
    return get(getYearReveneState).reduce((sum, re) => {
      if (re.totalRevenue) {
        return sum + re.totalRevenue;
      }
      return sum;
    }, 0);
  },
});

export const getYearOrderTotalState = selector<number>({
  key: "getYearOrderTotalState",
  get: ({ get }) => {
    return get(getYearReveneState).reduce((sum, re) => {
      if (re.totalOrders) {
        return sum + re.totalOrders;
      }
      return sum;
    }, 0);
  },
});

export const getYearDiscountsAppliedTotalState = selector<number>({
  key: "getYearDiscountsAppliedTotalState",
  get: ({ get }) => {
    return get(getYearReveneState).reduce((sum, re) => {
      if (re.totalDiscountsApplied) {
        return sum + re.totalDiscountsApplied;
      }
      return sum;
    }, 0);
  },
});

export const getYearDiscountAmountTotalState = selector<number>({
  key: "getYearDiscountAmountTotalState",
  get: ({ get }) => {
    return get(getYearReveneState).reduce((sum, re) => {
      if (re.totalDiscountAmount) {
        return sum + re.totalDiscountAmount;
      }
      return sum;
    }, 0);
  },
});

export const getMonthRevenueTotalState = selector<any>({
  key: "getMonthRevenueTotalState",
  get: ({ get }) => {
    var result = [];
    get(getYearReveneState)
      .map((re) => {
        return {
          month: new Date(re.date).getMonth() + 1,
          totalRevenue: re.totalRevenue || 0,
        };
      })
      .reduce(function (res, value) {
        if (!res[value.month]) {
          res[value.month] = { month: value.month, totalRevenue: 0 };
          result.push(res[value.month]);
        }
        res[value.month].totalRevenue += value.totalRevenue;
        return res;
      }, {});
    return result;
  },
});

export const getTopSellingProductState = selector<any>({
  key: "getTopSellingProductState",
  get: ({ get }) => {
    var result = [];
    var lastResult = [];
    get(getYearReveneState).map((val) => {
      return { ...val.topSellingProducts };
    });
    // .reduce(function (res, value) {
    //   if (!res[value.product_id]) {
    //     res[value.product_id] = {
    //       product_id: value.product_id,
    //       totalRevenue: 0,
    //       totalSold: 0,
    //     };
    //     result.push(res[value.product_id]);
    //   }
    //   res[value.product_id].totalRevenue += value.totalRevenue;
    //   res[value.product_id].totalSold += value.totalSold * 1;
    //   return res;
    // }, {});d
    get(getYearReveneState).map((val) =>
      val.topSellingProducts.reduce(function (res, value) {
        if (!res[value.product_id]) {
          res[value.product_id] = {
            product_id: value.product_id,
            totalRevenue: 0,
            totalSold: 0,
          };
          result.push(res[value.product_id]);
        }
        res[value.product_id].totalRevenue += value.totalRevenue;
        res[value.product_id].totalSold += value.totalSold * 1;
        return res;
      }, {})
    );
    result.reduce(function (res, value) {
      if (!res[value.product_id]) {
        res[value.product_id] = {
          product_id: value.product_id,
          totalRevenue: 0,
          totalSold: 0,
        };
        lastResult.push(res[value.product_id]);
      }
      res[value.product_id].totalRevenue += value.totalRevenue;
      res[value.product_id].totalSold += value.totalSold * 1;
      return res;
    }, {});

    lastResult.sort((a, b) => b.totalSold - a.totalSold);

    return lastResult.map((val) => {
      return {
        product: get(productsState).find((pro) => pro.id === val.product_id),
        totalRevenue: val.totalRevenue,
        totalSold: val.totalSold,
      };
    });
  },
});
