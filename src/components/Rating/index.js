import { StarBorder } from '@mui/icons-material';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

const labels = {
    0.5: "Too Bad",
    1.0: "Bad",
    1.5: "Not that Bad",
    2.0: "More or Less",
    2.5: "Could Be Better",
    3.0: "Cool",
    3.5: "Good",
    4.0: "Very Good",
    4.5: "Excellent",
    5.0: "Best Game",

}

export default function HalfRating() {
    const [value, setValue] = useState(3)
    const [hover, setHover] = useState(-1)

    return (
        <Stack spacing={1}>
            <Rating
                name="hover-feedback"
                defaultValue={value}
                precision={0.5}
                onChange={(e, newValue) => {
                    setValue(newValue)
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarBorder style={{ color: '#ccc' }} />}
            />
            {value !== null && (
                <div className='flex items-center justify-center w-fit mx-auto'>
                    <span className='font-semibold text-center  '>
                    {labels[hover !== -1 ? hover : value]}
                    </span>
                </div>
            )}
        </Stack>
    );
}
