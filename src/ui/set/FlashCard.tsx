import useTheme from "@material-ui/core/styles/useTheme";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactCardFlip from 'react-card-flip';
import { FlashCardSide } from "./FlashCardSide";

interface Props {
    frontContent?: string | undefined | null
    backContent?: string | undefined | null
    placeholder?: boolean
    height?: number | string
}

export const FlashCard: React.FC<Props> = ({frontContent, backContent, placeholder, height}) => {
    const theme = useTheme();

    const [flip, setFlip] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(true);

    useEffect(() => {
        setChange(!change);
    }, [frontContent, backContent]);

    const flipCard = () => {
        setFlip(!flip);
    }

    if (placeholder) {
        return (
            <FlashCardSide content="" style={{opacity: 0, height}}/>
        );

    } else {
        return (
            <ReactCardFlip isFlipped={flip} flipDirection="vertical">
                <FlashCardSide style={{background: theme.palette.primary.main, height}} content={frontContent} onClick={() => { flipCard() }} />

                <FlashCardSide style={{ background: theme.palette.primary.dark, height}} content={backContent} onClick={() => { flipCard() }} />
            </ReactCardFlip>
        );
    }
}