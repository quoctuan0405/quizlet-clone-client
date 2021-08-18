import React, { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import ExplicitIcon from "@material-ui/icons/Explicit";
import { FlashCard } from "./FlashCard";
import IconButton from "@material-ui/core/IconButton";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { SetQuery } from "../../generated/operation";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const duration = 400;

const transitionStyle = {
    transition: `${duration}ms cubic-bezier(0.165, 0.84, 0.44, 1)`,
    top: 0,
    left: 0
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flashCardContainer: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: "100%"
        },
        entering: { ...transitionStyle, boxShadow: "0 0 10px black", transform: "rotateY(90deg)", transformOrigin: "100% 100%" },
        entered: { ...transitionStyle, transform: "rotateY(0deg)", transformOrigin: "100% 100%" },
        exiting: { ...transitionStyle, boxShadow: "0 0 10px black", transform: "rotateY(90deg)", transformOrigin: "100% 100%" },
        exited: { ...transitionStyle, transform: "rotateY(90deg)", transformOrigin: "100% 100%" },
        setControl: {
            position: "relative",
            marginTop: theme.spacing(2),
            width: "100%",
            color: theme.palette.getContrastText(theme.palette.background.default),
        },
        cardNumber: {
            marginLeft: theme.spacing(4),
            marginRight: theme.spacing(4)
        },
        explanationContainer: {
            marginTop: theme.spacing(1)
        }
    })
);

interface Props {
    height?: number | string
    set: SetQuery["set"] | undefined | null
}

type term = NonNullable<NonNullable<SetQuery["set"]>["terms"]>[0];

export const FlashCardCarousel: React.FC<Props> = ({height, set}) => {
    const classes = useStyles();

    const [cards, setCards] = useState<term[]>([]);

    const [index, setIndex] = useState<number>(0);
    
    const [openExplanation, setOpenExplanation] = useState<boolean>(false);
    
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

    useEffect(() => {
        if (set && set.terms && set.terms[0]) {
            setCards([set.terms[0]]);
        }
    }, [set?.terms]);

    const nextCard = () => {
        if (!set || !set.terms || set.terms.length === 0) {return;}

        if (index === set.terms.length - 1) {return;}

        setCards([...cards, set.terms[index + 1]]);

        setIndex(index + 1);
    }

    const prevCard = () => {
        if (!set || !set.terms || set.terms.length === 0) { return; }

        if (index > 1) {
            cards.pop();
            setCards(cards);
            setIndex(index - 1);
            
        } else if (index === 0 || index === 1) {
            setCards([set.terms[0]]);
            setIndex(0);
        }
    }

    return (
        <Grid container direction="column">
            <Grid item>
                <TransitionGroup style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                        <FlashCard
                            frontContent=""
                            backContent=""
                            placeholder
                            height={height}
                        />
                    </div>
                    {cards ? 
                        cards.map((card) => (
                            <CSSTransition
                                key={card?.id}
                                classNames={{
                                    enter: classes.entering,
                                    enterActive: classes.entering,
                                    enterDone: classes.entered,
                                    exit: classes.exiting,
                                    exitDone: classes.exited
                                }}
                                timeout={duration}
                            >
                                <div className={classes.flashCardContainer}>
                                    <FlashCard
                                        frontContent={card?.question}
                                        backContent={card?.answer}
                                        height={height}
                                    />
                                </div>
                            </CSSTransition>
                        )) :
                        <CSSTransition
                            classNames={{
                                enter: classes.entering,
                                enterActive: classes.entering,
                                enterDone: classes.entered,
                                exit: classes.exiting,
                                exitDone: classes.exited
                            }}
                            timeout={duration}
                        >
                            <div className={classes.flashCardContainer}>
                                <FlashCard />
                            </div>
                        </CSSTransition>
                    }
                </TransitionGroup>
            </Grid>

            <Grid item>
                <Grid container direction="row" alignItems="center" alignContent="center" className={classes.setControl}>
                    <Grid item style={{marginLeft: "auto"}}>
                        <IconButton color="inherit" onClick={prevCard}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>
                    <Grid item className={classes.cardNumber}>
                        <Typography variant="body2" component="p">{index + 1}/{set?.terms && set.terms.length}</Typography>
                    </Grid>
                    <Grid item style={{marginRight: "auto"}}>
                        <IconButton color="inherit" onClick={nextCard}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Grid>
                    <Grid item style={{position: "absolute", right: 0}}>
                        {matchesXs ? 
                            <IconButton
                                onClick={() => { setOpenExplanation(!openExplanation) }}
                            >
                                <ExplicitIcon/>
                            </IconButton>
                        :
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<ExplicitIcon />}
                                onClick={() => { setOpenExplanation(!openExplanation) }}
                            >
                                Explanation
                            </Button>
                        }
                    </Grid>
                </Grid>
                <Grid item className={classes.explanationContainer}>
                    <Collapse in={openExplanation}>
                        <Card>
                            <CardHeader
                                title="Explanation"
                            />
                            <CardContent>
                                <Typography variant="body1">{cards && cards[index]?.explanation ? cards[index]?.explanation : "No explanation"}</Typography>
                            </CardContent>
                        </Card>
                    </Collapse>
                </Grid>
            </Grid>
        </Grid>
    )
}