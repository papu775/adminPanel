import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import { getLicenseInformation } from "../api/licenseInformation";
import Image from "@material-tailwind/react/Image";

const style = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 60,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    width: "100%",
  },
  placeInput: {
    display: "flex",
    flexDirection: "column",
    gap: 7,
    width: "100%",
    padding: 15,
  },
  labels: {
    fontWeight: "bold",
  },
  flexRow: {
    display: "flex",
  },
};

const LicenseInformation = () => {
  const [licenseInformation, setLicenseInformation] = useState([]);
  useEffect(() => {
    FETCH_DATA();
  }, []);

  const FETCH_DATA = async () => {
    try {
      const res = await getLicenseInformation();
      setLicenseInformation(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">License Information</h2>
            </div>
          </CardHeader>
          <CardBody>
            <table className="items-center w-full bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    No
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Owner Name
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Item
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                     Buying Quantity
                  </th>
                  <th className="px-2 text-teal-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                    Buying Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {licenseInformation.length > 0 &&
                  licenseInformation.map((ele, i) => {
                    return (
                      <tr key={i}>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {i + 1}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.ownerId?ele.ownerId.fullName:'-'}
                        </td>
                        <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                              <div style={style.inputs}>
                                <div className="w-40">
                                  <Image src={ele.itemId.itemFile?ele.itemId.itemFile.uri:'#'} />
                                </div>
                              </div>
                            </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {ele.buyingQuantity}
                        </td>
                            <td className="border-b border-gray-200 align-middle font-light text-sm whitespace-nowrap px-2 py-4 text-left">
                          {
                            ele.createdAt?
                            `${new Date(ele.createdAt).getDay().toString()}/${new Date(ele.createdAt).getMonth().toString()}/${new Date(ele.createdAt).getFullYear().toString()},${new Date(ele.createdAt).getHours().toString()}:${new Date(ele.createdAt).getMinutes().toString()}`
                            :'-'}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default LicenseInformation;
