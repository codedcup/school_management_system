import ActionBar from "../components/ActionBar";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Classes() {
    return (
        <div>
            <ActionBar 
                className='text-right'
                actions={[
                    {
                        label: "text 1",
                        onClick: () => alert("button 1 clicked"),
                        icon: <PlusIcon className="h-5" strokeWidth={3}/>
                    },
                    {
                        label: "text 2",
                        onClick: () => alert("button 2 clicked"),
                    }
                ]} />            
        </div>
    )
}