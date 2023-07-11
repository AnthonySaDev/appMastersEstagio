import { StarBorder } from "@mui/icons-material";
import { Rating, Stack } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { addFavorite } from "../../utils/AddFavorite";
import { checkFavorite } from "../../utils/CheckFavorite";
import { deleteFavorite } from "../../utils/DeleteFavorite";

const labels = {
  0.0: "Has no avaliation",
  1.0: "Bad",
  2.0: "More or Less",
  3.0: "Cool",
  4.0: "Very Good",
  5.0: "Best Game",
};

export default function HalfRating({
  isGameFavorited,
  setIsGameFavorited,
  value,
  setValue,
  gameId,
  user,
  setVisible,
  readOnly,
  disabled
}) {
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
        setFill(false);
        setValue(0);
        setTextButton("Save Changes");
      }
    } else {
      await addFavorite(gameId, user, setVisible, setIsGameFavorited, value);
      setTextButton("Remove Favorite");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const buttonVariants = {
    filled: { scale: 1.3, color: "#ff00" },
    unfilled: { scale: 1, color: "#fff" },
  };

  const textButtonVariants = {
    filled: { opacity: 1 },
    unfilled: { opacity: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col items-center justify-center w-full mx-auto"
    >
      <div className="flex items-center justify-center gap-1">
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
          emptyIcon={<StarBorder style={{ color: "#ccc" }} />}
          readOnly={readOnly}
        />
        {value !== null && (
          <div>
            <h1 className="font-semibold text-center">
              {labels[hover !== -1 ? hover : value]}
            </h1>
          </div>
        )}
      </Stack>
      <motion.button
        className="flex items-center bg-transparent text-white font-bold py-5 px-3 rounded text-base"
        onClick={() => {
            setFill(!fill) 
           }}
        variants={buttonVariants}
        animate={fill ? "filled" : "unfilled"}
        transition={{ duration: 1.5 }}
        disabled={disabled}
      >
        {fill ? (
          <FaHeart size={34} color="red" />
        ) : (
          <FaRegHeart size={34} color="white" />
        )}
      </motion.button>
      </div>
      <motion.button
        onClick={handleFavoriteClick}
        disabled={!fill}
        className={`flex items-center font-bold text-sm py-2 px-2 rounded mt-4 ${
          fill ? "bg-blue-500" : "bg-transparent"
        } text-white`}
        variants={textButtonVariants}
        animate={fill ? "filled" : "unfilled"}
        transition={{ duration: 1.5 }}
      >
        {isGameFavorited || fill ? textButton : ""}
      </motion.button>
    </motion.div>
  );
}
