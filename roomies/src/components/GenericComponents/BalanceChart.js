import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis } from "victory";

export default function BalanceChart({ data }) {
  const colorSwitcher = {
    fill: data => {
      let color = "blue";
      if (data.datum.balance < 0) {
        color = "red";
      } else {
        color = "green";
      }

      return color;
    },
    strokeWidth: 0,
    fillOpacity: 0.65
  };

  return (
    <VictoryChart
      padding={{ top: 5, bottom: 5, left: 50, right: 50 }}
      domainPadding={50}
      animate={{ duration: 750 }}
    >
      <VictoryAxis tickFormat={y => y} />
      <VictoryAxis
        dependentAxis
        // tickFormat specifies how ticks should be displayed
        tickFormat={x => `${x > 0 ? "+" : "-"}$${Math.abs(x)}`}
      />
      <VictoryBar
        style={{ data: { ...colorSwitcher } }}
        data={data.roomiesBalance}
        barRatio={1.25}
        labels={({ datum }) => `${datum.balance}`}
        // data accessor for x values
        x="roomieName"
        // data accessor for y values
        y="balance"
      />
    </VictoryChart>
  );
}
