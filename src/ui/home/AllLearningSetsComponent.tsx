import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { SetCard } from "../set/SetCard";
import { useLearningSetsQuery } from "../../generated/operation";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export const AllLearningSetsComponent: React.FC = () => {
    const classes = useStyles();

    const {data: setsData, loading} = useLearningSetsQuery();

    return (
        <Grid container direction="column" className={classes.container}>
            <Grid item>
                <Typography variant="h4" component="h2" className={classes.title}>Learning set</Typography>
            </Grid>

            <Grid item>
                <Grid container direction="row">
                    {loading ? <CircularProgress /> : null}
                    {setsData?.learningSets?.map((set) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={set?.id}>
                            <SetCard set={set} />
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    )
}