import StatusCard from "components/StatusCard";

export default function Dashboard() {
  return (
    <>
      {/* <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            color="red"
                            icon="groups"
                            title="Contributor"
                            amount="350,897"
                            percentage="3.48"
                            percentageIcon="arrow_upward"
                            percentageColor="green"
                            date="No. of Contributor"
                        />
                        <StatusCard
                            color="orange"
                            icon="groups"
                            title="Customer"
                            amount="2,356"
                            percentage="3.48"
                            percentageIcon="arrow_downward"
                            percentageColor="red"
                            date="No. of Customer"
                        />
                        <StatusCard
                            color="green"
                            icon="groups"
                            title="Subscriber"
                            amount="924"
                            percentage="1.10"
                            percentageIcon="arrow_downward"
                            percentageColor="orange"
                            date="No. of Subscriber"
                        />
                    </div>
                </div>
        </div> */}
      <div className="bg-white px-3 md:px-8 h-40" />

      <div className="px-3 md:px-8 -mt-24">
        <div className="container mx-auto max-w-full dashboard-card">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 mb-4">
            {
              <>
                <StatusCard
                  color="red"
                  icon="groups"
                  title="Contributor"
                  amount="350,897"
                  percentage="3.48"
                  percentageIcon="arrow_upward"
                  percentageColor="green"
                  date="No. of Contributor"
                />
                <StatusCard
                  color="orange"
                  icon="groups"
                  title="Customer"
                  amount="2,356"
                  percentage="3.48"
                  percentageIcon="arrow_downward"
                  percentageColor="red"
                  date="No. of Customer"
                />
                <StatusCard
                  color="green"
                  icon="groups"
                  title="Subscriber"
                  amount="924"
                  percentage="1.10"
                  percentageIcon="arrow_downward"
                  percentageColor="orange"
                  date="No. of Subscriber"
                />
                {/* <StatusCard
                        color="blue"
                        icon="groups"
                        amount={87}
                        percentageColor="green"
                        date="No. of Contributor"
                    />
                    <StatusCard
                        color="orange"
                        icon="groups"
                        amount={98}
                        percentageColor="green"
                        date="No. of Customer"
                    />
                    <StatusCard
                        color="green"
                        icon="groups"
                        amount={98}
                        percentageColor="green"
                        date="No. of Subscriber"
                    /> */}
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}
