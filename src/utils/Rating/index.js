import { StarBorder } from "@mui/icons-material";
import { Rating, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite } from "../AddFavorite";
import { checkFavorite } from "../CheckFavorite";
import { deleteFavorite } from "../DeleteFavorite";

const labels = {
    0.0: 'Has no avaliation',
    1.0: "Bad",
    2.0: "More or Less",
    3.0: "Cool",
    4.0: "Very Good",
    5.0: "Best Game",

}
export default function HalfRating({ isGameFavorited, setIsGameFavorited, value, setValue, gameId, filteredData, user, setVisible, readOnly }) {
    const [hover, setHover] = useState(-1);
    const [fill, setFill] = useState(false);
    const [textButton, setTextButton] = useState("Save Changes");

    useEffect(() => {
        checkFavorite(gameId, user, setIsGameFavorited, setValue, setFill, setTextButton);
    }, [gameId, user]);

    const handleFavoriteClick = async () => {
        if (isGameFavorited) {
            const removedGame = await deleteFavorite(gameId, user);
            if (removedGame) {
                setIsGameFavorited(false);
                setValue(0);
            }
        } else {
            await addFavorite(gameId, filteredData, user, setVisible, setIsGameFavorited, value);
        }
    };

    return (
        <div className='flex items-center justify-center gap-5 w-full mx-auto'>
            <Stack spacing={1}>
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={1}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    onChangeActive={(event, newHover) => {
                        setHover(newHover);
                    }}
                    emptyIcon={<StarBorder style={{ color: '#ccc' }} />}
                    readOnly={readOnly}
                />
                {value !== null && (
                    <div>
                        <h1 className='font-semibold text-center'>
                            {labels[hover !== -1 ? hover : value]}
                        </h1>
                    </div>
                )}
            </Stack>
            <button
                className={`flex items-center bg-transparent text-white font-bold py-5 px-3 rounded text-base`}
                onClick={() => setFill(!fill)}
            >
                {fill ? <FaHeart size={34} color="red" /> : <FaRegHeart size={34} color="white" />}
            </button>
            <button
                onClick={handleFavoriteClick}
                disabled={!fill}
                className={`flex items-center font-bold py-2 px-4 rounded mt-4 ${fill ? 'bg-blue-500' : 'bg-gray-500'} text-white`}>
                {fill ? textButton : '' }
            </button>
        </div>
    );
}


