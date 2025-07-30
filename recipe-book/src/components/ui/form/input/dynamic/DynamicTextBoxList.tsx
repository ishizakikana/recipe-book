import IconButton from '@/components/ui/button/iconButton/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Stack } from '@mui/material';
import { useState } from 'react';
import TextBox from '../text/TextBox';

export default function DynamicTextBoxList() {

    // 入力値管理
    const [values, setValues] = useState<[string, string][]>([['', '']]);

    // 行を追加
    const handleAdd = () => {
        setValues([...values, ['', '']]);
    }

    // 行を削除
    const handleRemove = (index: number) => {
        if (values.length === 1) return;        // 最低一行は残す
        setValues(values.filter((_, i) => i !== index));
    }

    // 値の更新
    const handleChange = (rowIndex: number, columnIndex: number, value: string) => {
        const newValues = [...values];
        newValues[rowIndex][columnIndex] = value;
        setValues(newValues);
    }

    return (
        <>
            <Stack>
                {values.map((value, index) => (
                    <Stack key={index} direction='row'>
                        <TextBox
                            value={value[0]}
                            onChange={(e) => handleChange(index, 0, e.target.value)} />
                        <TextBox
                            value={value[1]}
                            onChange={(e) => handleChange(index, 1, e.target.value)} />
                        <IconButton
                            icon={<CloseIcon />}
                            color='ui'
                            onClick={() => handleRemove(index)} />
                    </Stack>
                ))}
                <button onClick={handleAdd}>行を追加</button>
            </Stack>
        </>
    )
}