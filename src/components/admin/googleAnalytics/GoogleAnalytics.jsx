/*Component Name: GoogleAnalytics
Component Functional Details: User can create or update GoogleAnalytics master details from here.
Created By: Shrey Patel
Created Date: 03/15/2023
Modified By: <Modified By Name>
Modified Date: <Modified Date> */

import React from "react";
import { TitleNameHelper } from "services/common/helper/Helper";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";

const GoogleAnalytics = () => {
  return (
    <>
      <title>{TitleNameHelper({ defaultTitleName: `Google Analytics` })}</title>
      {/* <div className="text-center mt-10">Coming Soon...</div> */}
      <div className="justify-center">
        <iframe
          title="PK DI Summary - Team"
          width="100%"
          height="1000"
          src="https://app.powerbi.com/reportEmbed?reportId=b7893a4b-b167-499e-89cc-81f010a15583&autoAuth=true&ctid=c93df08a-282d-4d69-b189-3b021ad6218e"
          frameborder="0"
          allowFullScreen="true"
        ></iframe>
        {/* <PowerBIEmbed
          embedConfig={{
            type: "report", // Supported types: report, dashboard, tile, visual, qna, paginated report and create
            id: "5b218778-e7a5-4d73-8187-f10824047715",
            embedUrl:
              "https://app.powerbi.com/reportEmbed?reportId=5b218778-e7a5-4d73-8187-f10824047715&groupId=f089354e-8366-4e18-aea3-4cb4a3a50b48",
            accessToken:
              "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyIsImtpZCI6Ii1LSTNROW5OUjdiUm9meG1lWm9YcWJIWkdldyJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvYzYxNGVmNmMtZGI1Yy00YjFiLWJhNDktYjRlNTk4MDdjODNjLyIsImlhdCI6MTY4Mzg4NDUyNSwibmJmIjoxNjgzODg0NTI1LCJleHAiOjE2ODM4ODk0OTQsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUF3M1BCUktvL1RjcThXSklLUGx2VWZwKzhRdEhIWmZPRkhPeGJxa1h2cjJONk4wbFJKRHdCT1ZabWJRaC8yaVVBb1NwbDl1eS80MXExVSsrVE04L015YnorSTJKeUdxYzNlVlJNaG94M1d4VT0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiMThmYmNhMTYtMjIyNC00NWY2LTg1YjAtZjdiZjJiMzliM2YzIiwiYXBwaWRhY3IiOiIwIiwiZmFtaWx5X25hbWUiOiJZYWRhdiIsImdpdmVuX25hbWUiOiJCaGFyZ2F2a3VtYXIiLCJpcGFkZHIiOiIxMjAuNzIuOTAuMTU1IiwibmFtZSI6IkJoYXJnYXZrdW1hciBZYWRhdiIsIm9pZCI6IjI4Yjk4ZjY4LTM0OTgtNGY4Ny04ZGVhLTE5MWM3YTE2NTE1NCIsInB1aWQiOiIxMDAzMjAwMjM2NjA1QzFDIiwicmgiOiIwLkFWTUFiTzhVeGx6YkcwdTZTYlRsbUFmSVBBa0FBQUFBQUFBQXdBQUFBQUFBQUFCVEFBVS4iLCJzY3AiOiJBcHAuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZC5BbGwgQ2FwYWNpdHkuUmVhZFdyaXRlLkFsbCBDb250ZW50LkNyZWF0ZSBEYXNoYm9hcmQuUmVhZC5BbGwgRGFzaGJvYXJkLlJlYWRXcml0ZS5BbGwgRGF0YWZsb3cuUmVhZC5BbGwgRGF0YWZsb3cuUmVhZFdyaXRlLkFsbCBEYXRhc2V0LlJlYWQuQWxsIERhdGFzZXQuUmVhZFdyaXRlLkFsbCBHYXRld2F5LlJlYWQuQWxsIEdhdGV3YXkuUmVhZFdyaXRlLkFsbCBQaXBlbGluZS5EZXBsb3kgUGlwZWxpbmUuUmVhZC5BbGwgUGlwZWxpbmUuUmVhZFdyaXRlLkFsbCBSZXBvcnQuUmVhZC5BbGwgUmVwb3J0LlJlYWRXcml0ZS5BbGwgU3RvcmFnZUFjY291bnQuUmVhZC5BbGwgU3RvcmFnZUFjY291bnQuUmVhZFdyaXRlLkFsbCBUZW5hbnQuUmVhZC5BbGwgVGVuYW50LlJlYWRXcml0ZS5BbGwgVXNlclN0YXRlLlJlYWRXcml0ZS5BbGwgV29ya3NwYWNlLlJlYWQuQWxsIFdvcmtzcGFjZS5SZWFkV3JpdGUuQWxsIiwic2lnbmluX3N0YXRlIjpbImttc2kiXSwic3ViIjoiblFyOTFKSnNXMDJYLXZOc09EVmR6SlJqTUkxX051N3hKS3FPbGpCcjRnYyIsInRpZCI6ImM2MTRlZjZjLWRiNWMtNGIxYi1iYTQ5LWI0ZTU5ODA3YzgzYyIsInVuaXF1ZV9uYW1lIjoiYmhhcmdhdkBSRURFRklORUNPTU1FUkNFLkNPTSIsInVwbiI6ImJoYXJnYXZAUkVERUZJTkVDT01NRVJDRS5DT00iLCJ1dGkiOiJtX1F3MG9zalhFcTNPMEJIUFI4bUFBIiwidmVyIjoiMS4wIiwid2lkcyI6WyJiNzlmYmY0ZC0zZWY5LTQ2ODktODE0My03NmIxOTRlODU1MDkiXX0.gkDWysVwqFYg5_uvtlZMIgMMSR7wpqTUyfAfD5p0mqELBARP1PcB2CSIwbNTAiGG-aMrgkQAp1toDcWue82zaGXY2TOvbrMgoBwK9x4_r_4mO77NIsI8Vjr56cZHiUPuRg0jdUKJJkIaFpQPQ1N1HMC-cVgKuGBj23zAdvl2UEDD4mVJFPZe3Cf-4M5zbe1-VpqtBPJ3GZraA6-cCHvJkDI-UzUvWl8de8ydwhdl40jQK226t0X-DhHTgpVdOXOwvCkSXrjZJyUo1xRwZ7-lKvH2WKpS6ETE6-O0I83tKOVmjXWLzNvolz6nQ3CvQ4hLxQ33quguaGAJTNjd7ZhMnw",
            tokenType: models.TokenType.Aad, // Use models.TokenType.Aad for SaaS embed
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: true,
                },
              },
            },
          }}
          eventHandlers={
            new Map([
              [
                "loaded",
                function () {
                  console.log("Report loaded");
                },
              ],
              [
                "rendered",
                function () {
                  console.log("Report rendered");
                },
              ],
              [
                "error",
                function (event) {
                  console.log(event.detail);
                },
              ],
              ["visualClicked", () => console.log("visual clicked")],
              ["pageChanged", (event) => console.log(event)],
            ])
          }
          cssClassName={"Embed-container"}
          getEmbeddedComponent={(embeddedReport) => {
            window.report = embeddedReport;
          }}
        /> */}
      </div>
    </>
  );
};

export default GoogleAnalytics;
