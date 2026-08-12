import {ArrowUpIcon} from "lucide-react";
import {useEffect, useState} from "react";

export default function GoToTopButton() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, {passive: true});
        return() => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) 
        return null;
    

    return (
        <button onClick={
                () => window.scrollTo({top: 0, behavior: "smooth"})
            }
            aria-label="Go to top"
            title="Go to top"
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-primary hover:bg-secondary text-white shadow-lg flex items-center justify-center transition-colors cursor-pointer">
            <ArrowUpIcon size={18}/>
        </button>
    );
}
