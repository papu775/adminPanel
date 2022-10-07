import StatusCard from "components/StatusCard";
import { useEffect, useState } from "react";
import { countUser } from '../api/dashboard';

export default function Dashboard() {
  const [customerType,setCustomerType] = useState("");
  const [contributorType,setContributorType] = useState("");
  const [countContributor,setCountContributor] = useState("");
  const [countCustomer,setCountCustomer] = useState("");
   useEffect(async ()=>{

     const res = await countUser();
      setCustomerType(res.data.data[0]._id);
      setCountCustomer(res.data.data[0].count)
      setContributorType(res.data.data[1]._id);
      setCountContributor(res.data.data[1].count)
   },[])

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
              {/* {res.length }
             
                <StatusCard
                  color="orange"
                  icon="groups"
                  title="Customer"
                  amount="2,356"
                  percentage={res.data.data[1]._id}
                  percentageIcon="arrow_downward"
                  percentageColor="red"
                  date={res.data.data[1].count}
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
                /> */}
                {/* <StatusCard
                        color="blue"
                        icon="groups"
                        amount={87}
                        percentageColor="green"
                        date="No. of Contributor"
                    /> */}
                    <StatusCard
                        color="orange"
                        icon="groups"
                        percentage={countCustomer}
                        percentageColor="green"
                        date={customerType}
                    />
                    <StatusCard
                        color="green"
                        icon="groups"
                        percentage={countContributor}
                        percentageColor="green"
                        date={contributorType}
                    />
                    <StatusCard
                        color="blue"
                        icon="groups"
                        percentage="1"
                        percentageColor="green"
                        date="Subscriber"
                    />
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
}
