import React, { useEffect, useState } from "react";
import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import Input from "@material-tailwind/react/Input";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import { createSubscription } from "../api/subscription";

toast.configure();

const AddSubscription = () => {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [day, setDay] = useState("");
  // const [validity,setValidity] = useState("");
  // const [validitys,setValiditys] = useState([]);
  const [cost, setCost] = useState("");
  const [feature, setFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const [category, setCategory] = useState("");
  const [upperText, setUpperText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [subscriptionTypeText, setSubscriptionTypeText] = useState("");
  const [TypesOfSubscription, setTypesOfSubscription] = useState([]);

  useEffect(() => {
    setFeatures([]);
    setCost("");
    setSubscriptionTypeText("");
    setDay("");
    setType("");
  }, [TypesOfSubscription]);
  // const [TypesOfSubscriptionObj,setTypesOfSubscriptionObj] = useState({});
  // const _SET_COST = ()=>{
  //    if(type==='Free'){
  //       setCost(0);
  //       // setValidity("1 month (30 days)");
  //    }else if(type==='Paid'){
  //       setCost(29);

  //    }
  // }

  // useEffect(()=>{
  //   _SET_COST();
  // },[type])

  // useEffect(()=>{

  // },[TypesOfSubscription])

  const ADD_FEATURE = (e) => {
    e.preventDefault();
    setFeatures([...features, feature]);
    setFeature("");
    // setDay("");
  };

  const DELETE_FEATURE = (e, indexNumber) => {
    e.preventDefault();
    setFeatures(features.filter((ele) => ele !== features[indexNumber]));
  };

  // const ADD_VALIDIY = (e)=>{
  //   e.preventDefault();
  //   // setValiditys([...validitys,`${subscriptionTypeText}-US$ ${cost}/${validity}`]);
  //   setValiditys([...validitys,{subscriptionTypeText,cost,day}])
  //   setValidity("");
  // }

  const TYPES_OF_SUBSCRIPTION = (e) => {
    e.preventDefault();
    setTypesOfSubscription([
      ...TypesOfSubscription,
      { features, day, subscriptionTypeText, type, cost },
    ]);
    setFeature([]);
    //  setFeatures([]);
    //  setCost("");
    //  setValidity("");
    //  setDay("");
    //  setType("");
  };

  const DELETE_TYPES_OF_SUBSCRIPTION = (e, indexNumber) => {
    e.preventDefault();
    setTypesOfSubscription(
      TypesOfSubscription.filter(
        (ele) => ele !== TypesOfSubscription[indexNumber]
      )
    );
  };

  const ADD_SUBSCRIPTION = async (e) => {
    e.preventDefault();
    try {
      const res = await createSubscription({
        subscriptionTypeText,
        title,
        category,
        upperText,
        bottomText,
        TypesOfSubscription,
      });
      console.log(res);
      if (res.ok) {
        toast.success(res.data.msg);
        history.push("/manage-subscription");
      } else {
        toast.error(res.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   checkLoginStatus(setIsLoggedIn, setStartCheck);
  // }, [location]);

  return (
    <>
      {/* {startCheck && <CheckLogin isLoggedIn={isLoggedIn} />} */}
      <div className="bg-white px-3 md:px-8 h-40" />
      <div className="px-3 md:px-8 h-auto -mt-24">
        <Card>
          <CardHeader contentPosition="none" className="bg-blue">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-white text-2xl">Add Subscription</h2>
            </div>
          </CardHeader>
          <CardBody>
            <form id="edit-profile-form" onSubmit={ADD_SUBSCRIPTION}>
              <div className="row reset-margin-padding">
                <div className="profile-details reset-margin-padding flex flex-wrap mt-10 mr-25">
                  <div className="w-full lg:w-12/12 pr-4 mb-10 font-light ">
                    <select
                      className="w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-0 false mt-input-purple-500 mt-input bg-transparent border-none undefined undefined border-1"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option selected>Subscription Category</option>
                      <option value="PHOTO">PHOTO</option>
                      <option value="EDITORIAL">EDITORIAL</option>
                      <option value="PRINTS">PRINTS</option>
                    </select>
                  </div>
                  <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                    <Input
                      type="text"
                      color="purple"
                      placeholder={"Subscription Title"}
                      name="title"
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                    <Input
                      type="text"
                      color="purple"
                      placeholder={"Subscription Upper Text"}
                      name="upperText"
                      onChange={(e) => setUpperText(e.target.value)}
                    />
                  </div>
                  <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                    <Input
                      type="text"
                      color="purple"
                      placeholder={"Subscription Bottom Text"}
                      name="bottomText"
                      onChange={(e) => setBottomText(e.target.value)}
                    />
                  </div>
                  <div className="w-full lg:w-6/12 ">
                    <div className="pr-4 mb-10 font-light">
                      <div className="flex">
                        <Input
                          type="text"
                          color="purple"
                          placeholder={"Subscription Features"}
                          name="title"
                          onChange={(e) => setFeature(e.target.value)}
                          value={feature}
                        />
                        <Button
                          color="green"
                          buttonType="outline"
                          size="small"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          ripple="dark"
                          className="mr-2 float-right"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => ADD_FEATURE(e)}
                        >
                          <Icon name="add" size="2xl" />
                        </Button>
                      </div>
                      {features.length > 0 &&
                        features.map((ele, index) => {
                          return (
                            <div
                              key={index}
                              className="bg-blue text-white mt-1 flex"
                            >
                              <p>{ele}</p>
                              <button>
                                <Icon
                                  name="delete"
                                  size="2xl"
                                  onClick={(e) => DELETE_FEATURE(e, index)}
                                />
                              </button>
                            </div>
                          );
                        })}
                    </div>
                    <div className="pr-4 mb-10 font-light">
                      <select
                        className="w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-0 false mt-input-purple-500 mt-input bg-transparent border-none undefined undefined border-1"
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option selected value="">Subscription Type</option>
                        <option value="Free">Free</option>
                        <option value="Paid">Paid</option>
                      </select>
                    </div>
                    <div className="pr-4 mb-10 font-light">
                      <Input
                        type="text"
                        color="purple"
                        placeholder={"Subscription Type Text"}
                        name="subscriptionTypeText"
                        value={subscriptionTypeText}
                        onChange={(e) =>
                          setSubscriptionTypeText(e.target.value)
                        }
                      />
                    </div>
                    <div className="pr-4 mb-10 font-light">
                      <Input
                        type="number"
                        color="purple"
                        placeholder={"Subscription Cost"}
                        name="title"
                        onChange={(e) => setCost(e.target.value)}
                        value={cost}
                      />
                    </div>
                    <div className="pr-4 mb-10 font-light">
                      <div className="flex">
                        <select
                          className="w-full h-full text-gray-800 leading-normal shadow-none outline-none focus:outline-none focus:ring-0 focus:text-gray-800 px-0 false mt-input-purple-500 mt-input bg-transparent border-none undefined undefined border-1"
                          onChange={(e) => setDay(e.target.value)}
                        >
                          <option selected value="">
                            Subscription Validity
                          </option>
                          <option value="1 month (30 days)" selected="false">
                            1 month (30 days)
                          </option>
                          <option value="2 month (60 days)">
                            2 month (60 days)
                          </option>
                          <option value="3 month (90 days)">
                            3 month (90 days)
                          </option>
                          <option value="6 month (180 days)">
                            6 month (180 days)
                          </option>
                          <option value="1 year (360 days)">
                            1 year (360 days)
                          </option>
                          <option value="2 year (720days)">
                            2 year (720days)
                          </option>
                        </select>
                        <Button
                          color="green"
                          buttonType="outline"
                          size="small"
                          rounded={false}
                          block={false}
                          iconOnly={false}
                          ripple="dark"
                          className="mr-2 float-right"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => TYPES_OF_SUBSCRIPTION(e)}
                        >
                          <Icon name="add" size="2xl" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full lg:w-12/12 pr-4 mb-10 font-light">
                    {TypesOfSubscription.length > 0 &&
                      TypesOfSubscription.map((ele, index) => {
                        return (
                          <div
                            key={index}
                            className="bg-blue text-white mt-1 flex space-beteeen"
                          >
                            <p>{`${ele.subscriptionTypeText}-US$ ${ele.cost}/${ele.day}`}</p>

                            <button>
                              <Icon
                                name="delete"
                                size="2xl"
                                onClick={(e) =>
                                  DELETE_TYPES_OF_SUBSCRIPTION(e, index)
                                }
                              />
                            </button>
                          </div>
                        );
                      })}
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="w-full lg:w-4/12 pl-4 mb-10 font-light forsubmit">
                    <Input
                      type="submit"
                      value="submit"
                      style={{
                        height: 40,
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: "orange",
                        color: "#000",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>
    </>
  );
};

export default AddSubscription;
