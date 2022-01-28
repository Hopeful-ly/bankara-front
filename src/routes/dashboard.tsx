import { useAppSelector } from "@app/hooks";
import React from "react";
import styled, { createGlobalStyle, css, useTheme } from "styled-components";
import { LeftPadWrapper, TabWrapper } from ".";
import Chart from "react-apexcharts";
import { useSize, useWindowSize } from "react-use";
import { ApexOptions } from "apexcharts";

const DashboardWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
`;

const DashboardOverviewWrapper = styled.div`
  width: 100%;
  padding-top: 30px;
`;
const DashboardOverviewTitle = styled.h2`
  font-size: 2rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 2rem;
`;
const DashboardOverviewDescryption = styled.p`
  font-size: 1rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textSecondary};
`;
const DashboardOverview: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  return (
    <DashboardOverviewWrapper>
      <DashboardOverviewTitle>Overview</DashboardOverviewTitle>
      <DashboardOverviewDescryption>
        Hi{" "}
        {user ? user.name.at(0)?.toUpperCase() + user.name.slice(1) : "There"},
        get the summary of your weekly transactions here!
      </DashboardOverviewDescryption>
    </DashboardOverviewWrapper>
  );
};
const DashboardSectionsWrapper = styled.div`
  margin-top: 50px;
  height: max-content;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: start;
`;
const DashboardSection = styled.div<{ $width: number; $height: number }>`
  ${({ $height, $width }) => `
    height: ${$height - 4}%;
    width: ${$width - 4}%;
  `}
`;
const DashboardSectionTitle = styled.div`
  width: 100%;
  font-weight: 700;
  font-size: 1.5rem;
  font-family: Poppins;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.5rem;
`;
const ChartStyles = createGlobalStyle`
  .apexcharts-tooltip {
    justify-content: center;
    align-items: center;
    background: #fff!important;
    color:${({ theme }) => theme.colors.textPrimary}!important;
    padding: 10px;
    font-weight: 500;
    border:none!important;
    box-shadow:0px 0px 10px -6px black !important;
    border-radius: 50px;
    font-family: Poppins;
    font-size: 1.2rem !important;
    display: inline-block!important;
   .dollars::before {
        content:'$';
    } 
  }
  .apexcharts-xcrosshairs {
      width:5px;
      height:5px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.primary};
  }
`;
const DashboardSections = () => {
  const theme = useTheme();
  return (
    <DashboardSectionsWrapper>
      <ChartStyles />
      <DashboardSection $width={40} $height={100}>
        <DashboardSection $width={100} $height={50}>
          <DashboardSectionTitle>Activities</DashboardSectionTitle>
          <Chart
            height="100%"
            width="100%"
            type="line"
            series={[
              fakeSeriesGenerator("Recieved"),
              fakeSeriesGenerator("Sent"),
            ]}
            options={{
              ...chartOptions,
              colors: [theme.colors.primary, theme.colors.danger],
            }}
          />
        </DashboardSection>
        <DashboardSection $width={100} $height={50}>
          <DashboardSectionTitle>Statistics</DashboardSectionTitle>
          <Chart
            type="pie"
            height="100%"
            width="100%"
            // @ts-ignore
            options={{
              ...chartOptions,
              labels: ["Sent", "Recieved"],
              tooltip: {
                custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
                  const data = series[seriesIndex];
                  return "<div style='display:inline;'>" + data + "</div>";
                },
                followCursor: true,
              },
              colors: [theme.colors.primary, theme.colors.danger],
              chart: {
                ...chartOptions.chart,
              },

              plotOptions: {
                pie: {
                  donut: {
                    background: theme.colors.bgSecondary,
                    size: "30px",
                  },
                  expandOnClick: true,
                  dataLabels: {
                    offset: -20,
                  },

                  // customScale: 10,
                },
              },
              dataLabels: {
                style: {
                  fontFamily: "Poppins",
                  colors: [theme.colors.bgSecondary],
                  fontSize: "1rem",
                },
                dropShadow: { enabled: false },
                enabled: false,
              },
            }}
            series={[20, 30]}
          />
        </DashboardSection>
      </DashboardSection>
      <DashboardSection $width={50} $height={100}>
        <DashboardSectionTitle>Utilities</DashboardSectionTitle>
        <DashboardUtilities>Work In Progress...</DashboardUtilities>
      </DashboardSection>
    </DashboardSectionsWrapper>
  );
};
const DashboardUtilities = styled.div`
  background-color: ${({ theme }) => theme.colors.bgPrimary};
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 40px;
  border-radius: 20px;
  display: inline-flex;
  justify-content: center;
  font-family: Poppins;
  font-weight: 500;
  font-size: 3rem;
  align-items: center;
  width: 90%;
  height: 80%;
  /* box-shadow: 0px 0px 20px -14px black !important; */
`;
const Dashboard: React.FC = () => {
  return (
    <TabWrapper>
      <LeftPadWrapper>
        <DashboardWrapper>
          <DashboardOverview />
          <DashboardSections />
        </DashboardWrapper>
      </LeftPadWrapper>
    </TabWrapper>
  );
};
export default Dashboard;

const fakeSeriesGenerator = (name: string) => {
  return {
    name: name,
    data: Array.from({ length: 7 }, () =>
      Math.floor(Math.floor((Math.random() / 3) * 10))
    ),
  };
};

const chartOptions: ApexOptions = {
  stroke: {
    curve: "smooth",
  },
  tooltip: {
    custom: ({ series, seriesIndex, dataPointIndex, w }: any) => {
      const data = series[seriesIndex][dataPointIndex];
      return "<div class='dollars' style='display:inline;'>" + data + "</div>";
    },
    followCursor: true,
  },
  chart: {
    toolbar: {
      show: false,
      export: {
        csv: { filename: "Activities.csv" },
      },
    },
    zoom: {
      enabled: false,
    },
    type: "line",
    animations: {
      enabled: true,
      easing: "easeinout",
      dynamicAnimation: {
        enabled: true,
        speed: 0.1,
      },
    },
  },
  legend: {
    fontFamily: "Poppins",
    fontWeight: 500,
    position: "top",
  },
  grid: {
    show: false,
  },
};
