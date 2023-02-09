import React from 'react'
import moment from 'moment'

function TimeFormater(props: any) {
    const { date } = props;
    const [curDate, setCurDate] = React.useState(0);

    const daysDifference = (date1: any, date2: any) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const firstDate: any = new Date(date1);
        const secondDate: any = new Date(date2);

        return Math.round(Math.abs((firstDate - secondDate) / oneDay));
    }

    React.useEffect(() => {
        setCurDate(date)
    }, [date])

  return (
      <p>{new Date().toDateString() === new Date(curDate).toDateString()
          ? moment(curDate).format('LT') :
          daysDifference(new Date(), curDate) === 1 ? 
          moment().subtract(daysDifference(new Date(), curDate), 'days').calendar()
              : daysDifference(new Date(), curDate) < 7 ? moment(curDate).format('dddd') 
              : moment(curDate).format('L')
      }</p>
  )
}

export default TimeFormater