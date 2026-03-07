import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Balance{
  initial_balance:number,
  date:Date;
}

const UseCard:React.FC<Balance>=({initial_balance,date})=>{
 console.log("Balance received:", initial_balance);
  const formattedDate = new Date(date).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

    return(

      <Card className="mx-auto w-full max-w-xs shadow-md rounded-2xl">
  <CardHeader className="pb-2">
    <CardTitle className="text-sm font-medium text-muted-foreground">
      Initial Balance:
    </CardTitle>
  </CardHeader>

  <CardContent className="pt-0 pb-4">
    <div className="text-center text-4xl font-bold tracking-tight">
      ₹{initial_balance}
    </div>
  </CardContent>

  <CardFooter className="border-t pt-3 text-sm text-muted-foreground flex justify-between">
    <span>Started:</span>
    <span>{formattedDate}</span>
  </CardFooter>
</Card>

    )
}

export default UseCard;