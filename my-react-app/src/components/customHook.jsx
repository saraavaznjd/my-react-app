import { useState,useEffect } from "react";
import useDebounce from "./useDebounce";
export default function CustomHook(){
    const [query, setQuery] = useState("")
    const debouncedQuery = useDebounce(query, 1000)

    useEffect(() => {
        
        if(debouncedQuery){
            console.log("📡 ارسال درخواست به سرور با:", debouncedQuery);
        }        
    },[debouncedQuery])

    return(
        <form className="p-4 max-w-md mx-auto my-20 space-y-4 bg-gray-100 rounded-lg">
            <input type="text"
                className="border p-2 w-full"
                value={query}
                placeholder="Search"
                onChange={e => setQuery(e.target.value)} />
        </form>
    )
}