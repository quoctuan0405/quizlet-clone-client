import React from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Fade from "@material-ui/core/Fade"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import certificateIcon from "../../../assets/SVG/certificate-quality-award-education-medal-svgrepo-com.svg";

const useStyles = makeStyles(theme => ({
    motivationTitle: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3)
    },
    certificateIcon: {
        display: "block",
        width: "25%",
        margin: "auto"
    },
    nextButton: {
        display: "block",
        marginTop: theme.spacing(2),
        marginLeft: "auto",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3)
    },
}));

interface Props {
    resetLearning: () => any
}

export const LearningCompleteCard: React.FC<Props> = ({resetLearning}) => {
    const classes = useStyles();

    return (
        <Fade in={true}>
            <Card>
                <CardContent>
                    <Typography variant="h5" className={classes.motivationTitle} align="center">Congratulation! You've complete!</Typography>

                    <img src={certificateIcon} alt="Certificate" className={classes.certificateIcon}/>

                    <Button variant="contained" color="primary" className={classes.nextButton} onClick={resetLearning}>Reset learning</Button>
                </CardContent>
            </Card>
        </Fade>
    );
}