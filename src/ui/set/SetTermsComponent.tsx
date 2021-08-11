import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core/styles";
import { SetQuery } from "../../generated/operation";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    cardContainer: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        background: theme.palette.grey[800],
        color: theme.palette.getContrastText(theme.palette.grey[800])
    }
}));

interface Props {
    set: SetQuery["set"] | undefined | null
}

export const SetTermsComponent: React.FC<Props> = ({set}) => {
    const classes = useStyles();

    return (
        <Grid container direction="column">
            <Grid item>
                <Typography variant="h6">Terms in this set</Typography>
            </Grid>
            <Grid item sm={12} md={8}>
                {
                    set && set.terms ? 
                        set?.terms?.map((term) => (
                            <Card className={classes.cardContainer} key={term?.id}>
                                <CardContent>
                                    <Grid container direction="row">
                                        <Grid item sm={5} md={4}>
                                            <Typography variant="body1">{term?.question}</Typography>
                                        </Grid>
                                        <Grid item sm={1}>
                                            <Divider orientation="vertical"/>
                                        </Grid>
                                        <Grid item sm={6} md={7}>
                                            <Typography variant="body1">{term?.answer}</Typography>
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        ))
                    :
                        <CircularProgress/>
                }
            </Grid>
        </Grid>
    )
}