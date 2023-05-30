import "./App.css";
import { useState, useEffect } from "react";
import {
    Calendar,
    DatePicker,
    DatePickerInput,
    MonthPicker,
    MonthPickerInput,
} from "@mantine/dates";
import {
    Radio,
    Center,
    Box,
    Group,
    Container,
    Divider,
    createStyles,
} from "@mantine/core";
import { EventBody, ViewType } from "./utils/types";
import EventCard from "./components/EventCard";
import getAllEvents from "./utils/api";
import moment from "moment";

const useStyles = createStyles((theme) => ({
    root: {
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
        // display: "flex",
        // alignItems: "center",
    },
    datePicker: {
        position: "fixed",
    },
    list: {
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        overflow: "hidden",
        backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
        padding: theme.spacing.lg,
    },
}));

function App() {
    const { classes } = useStyles();

    const [events, setEvents] = useState<EventBody[]>();
    const [date, setDate] = useState<string>();
    const [view, setView] = useState("week");
    // const [week, setWeek] = useState<Date>(new Date());
    useEffect(() => {
        try {
            getAllEvents().then((res) => {
                res.data.forEach((event: EventBody) => {
                    event.date = moment(event.date).format("DD/MM/YYYY");
                });
                setEvents(res.data);
                console.log(res.data);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);

    const filteredEvents = events?.filter((event: EventBody) => {
        if (view === ViewType.DAY) {
            // return event.date === moment(date).format("DD/MM/YYYY");
            return event.date === date;
        }
        if (view === ViewType.WEEK) {
            const weekLocal = new Date(week);
            const weekEnd = new Date(week);

            weekEnd.setDate(weekLocal.getDate() + 7);

            const eventDate = new Date(event.date);
            console.log(eventDate, weekLocal, weekEnd);

            return eventDate >= weekLocal && eventDate <= weekEnd;
        }
        if (view === ViewType.MONTH) {
            return event.date.slice(3) === date?.slice(3);
        }
    });

    // console.log(filteredEvents);
    const OnDtateChange = (date: Date) => {
        const requiredDate = moment(date).format("DD/MM/YYYY");
        setDate(requiredDate);
        // console.log(date);
    };

    // useEffect(() => {
    //     console.log(date?.slice(3));
    // }, [date]);

    return (
        <>
            <Container className={classes.root}>
                {/* toggler week/day */}
                <Center>
                    <Radio.Group
                        label="View"
                        name="view"
                        value={view}
                        onChange={setView}
                        color="blue"
                    >
                        <Group mt="xs">
                            <Radio label="Day" value={ViewType.DAY} />
                            <Radio label="Week" value={ViewType.WEEK} />
                            <Radio label="Month" value={ViewType.MONTH} />
                        </Group>
                    </Radio.Group>

                    {/*date picker  */}
                    {view === "week" && (
              <DatePicker
                weekendDays={[0, 6]}
                type="range"
                            placeholder="Pick date "
                            onChange={OnDtateChange}
                        />
                    )}
                    {view === "day" && (
                        <DatePicker
                            value={date}
                            onChange={OnDtateChange}
                            placeholder="Pick date"
                        />
                    )}
                    {view === "month" && (
                        <MonthPicker
                            value={date}
                            onChange={OnDtateChange}
                            placeholder="Pick month"
                        />
                    )}
                </Center>
                {/* events */}
                <Divider />
                <Group className={classes.list}>
                    {/* {events?.map((event: EventBody) => { */}
                    {filteredEvents?.map((event: EventBody) => {
                        return (
                            <EventCard
                                key={event.id}
                                id={event.id}
                                name={event.name}
                                desc={event.desc}
                                // date={moment(event.date).format("DD/MM/YYYY")}
                                date={event.date}
                            />
                        );
                    })}
                </Group>
            </Container>
        </>
    );
}

export default App;
