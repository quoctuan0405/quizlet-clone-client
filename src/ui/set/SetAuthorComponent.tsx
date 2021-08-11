import React from 'react';
import Link from 'next/link';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import { SetQuery, useMeQuery } from '../../generated/operation';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardContent from '@material-ui/core/CardContent';

interface Props {
    set: SetQuery["set"] | undefined | null
}

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    authorCard: {
        backgroundColor: "transparent"
    },
    avatar: {
        backgroundColor: theme.palette.primary.main
    }
}));

export const SetAuthorComponent: React.FC<Props> = ({set}) => {
    const classes = useStyles();

    const { data: meData } = useMeQuery();

    return (
        <Grid container direction="column">
            <Grid item sm={12} md={8} className={classes.container}>
                <Card className={classes.authorCard} elevation={1}>
                    {
                        set ?
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe" className={classes.avatar}>
                                        U
                                    </Avatar>
                                }
                                title={`Created by`}
                                subheader={`${set?.author.username}`}
                                action={
                                    meData?.me?.id === set?.author.id ? 
                                        <Link href="/set/edit/[id]" as={`/set/edit/${set?.id}`}>
                                            <IconButton aria-label="edit">
                                                <EditIcon/>
                                            </IconButton>
                                        </Link>
                                    : null
                                }
                            />
                        :
                            <CardContent>
                                <CircularProgress />
                            </CardContent>
                    }
                </Card>
            </Grid>
        </Grid>
    )
}