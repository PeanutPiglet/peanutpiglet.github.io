import { motion } from "motion/react"

export default function Spinner() {
    return (
        <div className="flex items-center justify-center">
            <motion.div style={{
                "width": "50px",
                "height": "50px",
                "borderRadius": "50%",
                "border": "4px solid red",
                "borderTopColor": "blue"
            }}
            animate={{transform: "rotate(360deg)"}}
            transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
            }}
            ></motion.div>
        </div>
    )
}






