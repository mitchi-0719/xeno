import type { FC } from "react";

type FieldProps = {
  hand: number[];
  trash: number[];
};

type Props = {
  myFiled: FieldProps;
  opponentField: FieldProps;
  handleUse: (cardId: number) => void;
};

export const Field: FC<Props> = ({ myFiled, opponentField, handleUse }) => {
  return <></>;
};
