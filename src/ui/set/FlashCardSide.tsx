import React, { CSSProperties } from 'react';
import Card from "@material-ui/core/Card";
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

interface Props {
    content?: String | undefined | null
    onClick?: () => any
    style?: CSSProperties
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        flashCard: {
            background: theme.palette.secondary.light,
            height: 300,
            cursor: "pointer",
            color: "white"
        },
        flashCardContent: {
            height: "100%",
            padding: theme.spacing(3),
            textAlign: "center"
        }
    })
);

export const FlashCardSide: React.FC<Props> = ({style, content, onClick}) => {
    const classes = useStyles();

    return (
        <Card className={classes.flashCard} onClick={onClick} style={style}>
            <Grid container direction="column" alignItems="center" alignContent="center" className={classes.flashCardContent}>
                <Grid item style={{ margin: "auto" }}>
                    <Typography variant="body1" component="p">
                        {content ? content : <CircularProgress color="secondary"/>}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
    )
}