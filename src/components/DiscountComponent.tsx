import React from 'react';
import Svg, { Path, Text } from 'react-native-svg';
import Fonts from '../utils/Fonts';

const DiscountComponent = ({ percent }: { percent: any }) => (
  <Svg
    id="Layer_2"
    data-name="Layer 2"
    viewBox="0 0 68.26 68.26"
    width={35.26}
    height={35.26}
  >
    <Path
      d="M25.32,3.24c4.86-4.14,11.95-4.33,17.03-.46l.58.46,1.28,1.09c.93.79,2.05,1.32,3.26,1.53l.6.07,1.67.14c6.39.51,11.55,5.42,12.38,11.77l.07.68.14,1.68c.1,1.22.52,2.38,1.22,3.38l.37.48,1.09,1.28c4.14,4.86,4.33,11.95.46,17.03l-.46.58-1.09,1.28c-.79.93-1.32,2.05-1.53,3.26l-.07.6-.13,1.67c-.51,6.39-5.42,11.55-11.77,12.38l-.68.07-1.67.14c-1.22.1-2.38.52-3.38,1.22l-.48.38-1.28,1.09c-4.86,4.14-11.95,4.34-17.03.46l-.57-.46-1.28-1.09c-.93-.79-2.05-1.32-3.26-1.53l-.6-.07-1.67-.14c-6.39-.51-11.55-5.42-12.38-11.77l-.07-.68-.14-1.68c-.1-1.22-.52-2.38-1.22-3.38l-.38-.48-1.09-1.28c-4.14-4.86-4.33-11.95-.46-17.03l.46-.57,1.09-1.28c.79-.93,1.32-2.05,1.53-3.26l.07-.6.14-1.67c.51-6.39,5.42-11.55,11.77-12.38l.68-.07,1.68-.14c1.22-.1,2.38-.52,3.38-1.22l.48-.38,1.28-1.09Z"
      fill="#facc14"
      fillRule="evenodd"
    />
    <Text
      x="25%"       // Horizontal center of the SVG
      y="50%"       // Vertical center of the SVG
      textAnchor="middle"  // Centers the text horizontally
      alignmentBaseline="middle"  // Centers the text vertically
      fontSize="18"  // Adjust the font size as needed
      fontWeight={600}
      fill="#000"    // Text color
    > 
      - {percent}%
    </Text>
  </Svg>
);

export default DiscountComponent;
