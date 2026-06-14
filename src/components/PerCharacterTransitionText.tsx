import { motion } from 'motion/react';


export interface PerCharacterTransitionTextProps {
  text: string,
  initial: (index: number, char: string) => {opacity: number, [key:string] : any}
}

export default function PerCharacterTransitionText({text, initial} : PerCharacterTransitionTextProps){
    return (
        <>{text.split('').map((char, index) => {
            <motion.span
                key={`${char}-${index}`}
                className='inline-block will-change-transform'
                
            >
            </motion.span>
        })}
        </>
    )
}


