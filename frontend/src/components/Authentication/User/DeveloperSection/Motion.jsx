import { Box, Flex, forwardRef } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

// MotionBox component using Framer Motion
export const MotionBox = motion(
  forwardRef((props, ref) => {
    // Filter out Chakra UI props that are valid motion props
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Box ref={ref} {...chakraProps} />;
  })
);

// MotionFlex component using Framer Motion
export const MotionFlex = motion(
  forwardRef((props, ref) => {
    // Filter out Chakra UI props that are valid motion props
    const chakraProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => !isValidMotionProp(key))
    );
    return <Flex ref={ref} {...chakraProps} />;
  })
);
