import { priceFormatter } from '@/utils/priceFormatter';
import React from 'react'

import { NumberFormatBase, NumericFormatProps } from "react-number-format";

export default function NumberFormatInput(props: NumericFormatProps) {
    const format = (numStr: string) => {
        if (numStr === "") return "";

        return priceFormatter.format(Number(numStr));
    };

    return <NumberFormatBase {...props} format={format} />;
}