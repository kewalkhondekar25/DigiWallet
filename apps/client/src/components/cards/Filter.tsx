import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const Filter = () => {

  const filterTxn = [
    {
      name: "Status",
      options: ["Success", "Failed", "Inprogress"]
    },
    {
      name: "Date",
      options: ["Last Week", "Last Month", "Last 3 Month"]
    }
  ];

  return (
    <div className="flex gap-3">
      {
        filterTxn.map((item, i) => {
          return (
            <Select key={i} onValueChange={(e) => console.log(e)}>
              <SelectTrigger className="">
                <SelectValue placeholder={`${item.name}`} />
              </SelectTrigger>
              <SelectContent>
                {
                  item.options.map((items, i) => {
                    return(
                      <SelectItem key={i} value={`${items}`}>{items}</SelectItem>
                    )
                  })
                }
              </SelectContent>
            </Select>
          )
        })
      }
    </div>
  )
}

export default Filter