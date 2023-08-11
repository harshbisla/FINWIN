import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "assets/css/MiniCalendar.css";
import { Text, Icon } from "@chakra-ui/react";
import CalendarHeatmap from 'react-calendar-heatmap';
// import 'react-calendar-heatmap/dist/styles.css';
import './CalendarHeatmap.css';
// Chakra imports
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
// Custom components
import Card from "components/card/Card.js";

export default function MiniCalendar(props) {
  const { selectRange, ...rest } = props;
  const [value, onChange] = useState(new Date());
  return (
    <Card
      align='center'
      direction='column'
      w='100%'
      maxW='max-content'
      p='20px 15px'
      h='max-content'
      {...rest}>
      {/* <Calendar */}
      {/* <Calendar
        onChange={onChange}
        value={value}
        selectRange={selectRange}
        view={"month"}
        tileContent={<Text color='brand.500'></Text>}
        prevLabel={<Icon as={MdChevronLeft} w='24px' h='24px' mt='4px' />}
        nextLabel={<Icon as={MdChevronRight} w='24px' h='24px' mt='4px' />}
      />
      /> */}

<CalendarHeatmap
  startDate={new Date('2016-08-01')}
  endDate={new Date('2016-10-01')}
  values={[
    { date: '2016-08-02', count: 1223 },
    { date: '2016-08-22', count: 122 },
    { date: '2016-08-30', count: 38 },
    { date: '2016-08-12', count: 12 },
    { date: '2016-08-21', count: 12243 },
    { date: '2016-08-25', count: 38 },
    { date: '2016-08-09', count: 12 },
    { date: '2016-09-05', count: 122 },
    { date: '2016-09-25', count: 380 },
    { date: '2016-09-17', count: 120 },
    { date: '2016-09-22', count: 1150 },
    { date: '2016-09-30', count: 950 },
    { date: '2016-09-02', count: 12 },
    { date: '2016-09-22', count: 122 },
    { date: '2016-08-30', count: 38 },
    { date: '2016-09-02', count: 12 },
    { date: '2016-09-07', count: 122 },
    { date: '2016-09-07', count: 122 },
    { date: '2016-08-03', count: 38 },
    // ...and so on
  ]}

  // Apply inline style to customize color based on count
  classForValue={(value) => {
    if (!value) {
      return 'color-empty'; // CSS class for empty cells
    }
    if (value.count <= 500) {
      return 'color-low'; // CSS class for low count cells
    }
    if (value.count <= 1000) {
      return 'color-medium'; // CSS class for medium count cells
    }
    return 'color-high'; // CSS class for high count cells
  }}
/>
    </Card>
  );
}