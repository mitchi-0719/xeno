import type { FC } from "react";
import type { CardType } from "../../types/Card";
import { motion } from "motion/react";

export const Card: FC<CardType> = ({ cardId, cardNumber }) => {
  const cardImage = `/cards/${cardNumber}.png`;
  const dummy_img = `/dummyCards/${cardNumber}.png`;

  return (
    <div>
      <motion.img
        src={cardImage}
        alt="sample_img"
        width="100%"
        height="auto"
        onError={(e) => {
          e.currentTarget.src = dummy_img;
        }}
      />
    </div>
  );
};
