import { useEffect, useState } from "react";

const RewardsPoints = () => {
  const [cusData, setCusData] = useState([])
  const [rewardsData, setRewardsData] = useState([])

  useEffect(() => {
    fetch("./customerData.json").then((res) => res.json()).then((result) => {
        setCusData(result.customers)
      });
  }, []);

  useEffect(()=> {
    const resArray = []
    if (cusData?.length > 0) {
      cusData.forEach((data) => {
        resArray[data.name] = []
        data.transactions?.length > 0 && data.transactions.forEach((trans) => {
          resArray[data.name].push(getRewardPoints(trans.amount))
        })
      })
    }
    setRewardsData(resArray)
  }, [cusData])

  const getRewardPoints = (amount) => {
    if(amount > 100) {
      return 50 + ((amount - 100) * 2)
    } else if (amount < 100) {
      return amount - 50
    } else {
      return 0
    }
  }

  return <>
  {
    Object.keys(rewardsData)?.length > 0 && 
    Object.keys(rewardsData).map((customer)=> {
      return <div key={customer}>
              {`Reward Points of ${customer} : `}
              <div>{`1st Month: ${rewardsData[customer][0]}`}</div>
              <div>{`2nd Month: ${rewardsData[customer][1]}`}</div>
              <div>{`3rd Month: ${rewardsData[customer][2]}`}</div>
              <div>{`Total: ${rewardsData[customer].reduce((val1, val2) => val1 + val2, 0)}`}</div>
            </div>
    })
  }
  </>
}
export default RewardsPoints;
