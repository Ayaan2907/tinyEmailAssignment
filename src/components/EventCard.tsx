import { EventBody } from '../utils/types';
import { createStyles, Card } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    eventCard: {
        backgroundColor: theme.colors.dark[7],
        color: theme.colors.dark[0],
        padding: theme.spacing.md,
        borderRadius: theme.radius.sm,
        marginBottom: theme.spacing.md,

    },
}));
const EventCard = (props: EventBody) => {
    const { classes } = useStyles();
    


    return (
        <Card className={classes.eventCard}>
            <h3>{props.name}</h3>
            <p>{props.desc}</p>
            <p>{props.date}</p>
        </Card>
    );
}


export default EventCard;





