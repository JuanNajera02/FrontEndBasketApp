import { TournamentType } from "./interface";

export const getContestTypeName = (type: TournamentType): string => {

   if(type === TournamentType.SingleElimination) return "Single Elimination";
   if(type === TournamentType.DoubleElimination) return "Double Elimination";

   return "No Match";

 };
