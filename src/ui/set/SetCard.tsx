import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from 'next/link';
import { Set, SetsQueryResult } from "../../generated/operation";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            padding: theme.spacing(5),
        },
        title: {
            fontWeight: "bold",
            color: "white",
            marginBottom: theme.spacing(2)
        },
        card: {
            margin: theme.spacing(1),
            background: theme.palette.secondary.dark,
            color: "white"
        },
        cardTitle: {
            fontWeight: "bold"
        },
        cardContent: {

        },
        cardAuthor: {
            marginTop: theme.spacing(5),
            fontWeight: "bold"
        }
    })
);

interface Props {
    set: NonNullable<SetsQueryResult['data']>["sets"][0]
}

export const SetCard: React.FC<Props> = ({ set }) => {
    const classes = useStyles();

    return (
        <Link href="/set/[id]" as={`/set/${set?.id}`}>
            <Card className={classes.card}>
                <CardActionArea >
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className={classes.cardTitle}>
                            {set?.name}
                        </Typography>
                        <Typography variant="caption" component="p" className={classes.cardContent}>
                            {set?._count.terms} terms
                        </Typography>
                        <Typography variant="body1" component="p" className={classes.cardAuthor}>
                            {set?.author.username}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    )
}