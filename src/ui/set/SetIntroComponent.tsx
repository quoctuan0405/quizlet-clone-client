import React from "react";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import AndroidIcon from "@material-ui/icons/Android";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import { FlashCardCarousel } from "./FlashCardCarousel";
import Link from 'next/link';
import { SetQuery } from "../../generated/operation";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        studyContainer: {
            [theme.breakpoints.down("sm")]: {
                marginRight: "auto"
            },
            [theme.breakpoints.down("xs")]: {
                width: "100%"
            }
        },
        study: {
            fontWeight: "bold",
            marginBottom: theme.spacing(1),
        },
        setModeCardContainer: {
            width: "100%",
            [theme.breakpoints.down("sm")]: {
                width: "30%"
            },
            [theme.breakpoints.down("xs")]: {
                width: "49%"
            }
        },
        setModeCard: {
            background: theme.palette.secondary.dark,
            color: "white",
            marginBottom: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                marginBottom: 0,
                marginLeft: theme.spacing(1)
            },
            [theme.breakpoints.down("xs")]: {
                marginBottom: theme.spacing(1),
                marginLeft: 0
            }
        },
        setModeSection: {
            paddingRight: theme.spacing(4),
            [theme.breakpoints.down("sm")]: {
                paddingRight: 0
            }
        },
        setModeIcon: {
            marginRight: theme.spacing(1)
        },
        setModeDescription: {
            fontWeight: "bold"
        },
        flashCardContent: {
            height: "100%",
            padding: theme.spacing(3),
            textAlign: "center"
        },
        setControl: {
            marginTop: theme.spacing(2),
            width: "100%"
        },
        cardNumber: {
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4)
        }
    })
);

interface Props {
    set: SetQuery["set"] | undefined | null
}

export const SetIntroComponent: React.FC<Props> = ({set}) => {
    const classes = useStyles();

    const theme = useTheme();
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

    return (
        <Grid container direction={matchesSm ? "column" : "row"}>
            <Grid item md={3} lg={2} className={classes.setModeSection}>
                <Grid container direction={matchesSm ? "row" : "column"} alignContent={matchesSm ? "space-between" : "flex-start"} alignItems={matchesSm ? "center" : "flex-start"}>
                    <Grid item className={classes.studyContainer}>
                        <Typography variant="body1" component="p" className={classes.study}>Study</Typography>
                    </Grid>
                    <Grid item className={classes.setModeCardContainer}>
                        <Link href="/study/flashcard/[id]" as={`/study/flashcard/${set?.id}`}>
                            <Card className={classes.setModeCard}>
                                <CardActionArea>
                                    <CardContent>
                                        <Grid container direction="row" alignItems="center" alignContent="center">
                                            <Grid item className={classes.setModeIcon}>
                                                <ViewDayIcon/>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" component="p" className={classes.setModeDescription}>Flashcards</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                    <Grid item className={classes.setModeCardContainer} style={{marginLeft: matchesXs ? "auto" : undefined}}>
                        <Link href="/study/learn/[id]" as={`/study/learn/${set?.id}`}>
                            <Card className={classes.setModeCard}>
                                <CardActionArea>
                                    <CardContent>
                                        <Grid container direction="row" alignItems="center" alignContent="center">
                                            <Grid item className={classes.setModeIcon}>
                                                <AndroidIcon />
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="body2" component="p" className={classes.setModeDescription}>Learn</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Link>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item sm={12} md={7} lg={5}>
                <FlashCardCarousel set={set}/>
            </Grid>
        </Grid>
    )
}