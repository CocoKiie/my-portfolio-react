import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

function Transition() {
    return (
        <AnimatePresence>
            <motion.div
                className="slide-out"
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                exit={{ scaleY: 0 }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
        </AnimatePresence>
    );
}

export default Transition;
