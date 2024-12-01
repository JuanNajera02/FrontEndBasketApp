import { ContestType } from "./interface";
export class Test{

  getContestTypeName = (type: ContestType): string => {

   if(type === ContestType.SingleElimination) return "Single Elimination";
   if(type === ContestType.DoubleElimination) return "Double Elimination";

   return "No Match";

 };
}
