import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";
import "../GenericComponents/general.scss";

export default function BalanceChart({ data }) {
  const colorSwitcher = {
    fill: data => {
      let color = "blue";
      if (data.datum.balance < 0) {
        color = "#c60402"; //accent-red
      } else {
        color = "#5d993a"; //accent-green
      }

      return color;
    },
    strokeWidth: 0,
    fillOpacity: 0.65
  };

  return (
    <VictoryChart
      padding={{ top: 5, bottom: 5, left: 70, right: 50 }}
      domainPadding={50}
      animate={{ duration: 750 }}
    >
      <VictoryAxis tickFormat={y => y} />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x =>
          `${new Intl.NumberFormat("en-CA", {
            style: "currency",
            currencyDisplay: "symbol",
            currency: "CAD"
          }).format(x)}`
        }
      />
      <VictoryBar
        style={{ data: { ...colorSwitcher } }}
        data={data.roomiesBalance}
        barRatio={1.25}
        labels={({ datum }) =>
          `${new Intl.NumberFormat("en-CA", {
            style: "currency",
            currencyDisplay: "symbol",
            currency: "CAD"
          }).format(datum.balance)}`
        }
        // data accessor for x values
        x="roomieName"
        // data accessor for y values
        y="balance"
      />
    </VictoryChart>
  );
}
